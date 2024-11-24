import * as React from "react"

/**
 * @typedef {Object} Toast
 * @property {string} id - Unique identifier for the toast
 * @property {string} [title] - Toast title
 * @property {string} [description] - Toast description
 * @property {boolean} open - Whether the toast is visible
 * @property {("default" | "success" | "error" | "warning")} [variant] - Toast variant
 * @property {(open: boolean) => void} onOpenChange - Callback when toast visibility changes
 */

/** @type {number} Maximum number of toasts to show at once */
const TOAST_LIMIT = 3
/** @type {number} Delay before removing toast from DOM after dismiss (in ms) */
const TOAST_REMOVE_DELAY = 5000

/** @type {Object.<string, string>} Action types for toast state management */
const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
}

let count = 0

/** @returns {string} Unique ID for a toast */
function genId() {
  count = (count + 1) % Number.MAX_VALUE
  return `toast-${count}`
}

/** @type {Map<string, NodeJS.Timeout>} */
const toastTimeouts = new Map()

/**
 * Adds a toast to the removal queue
 * @param {string} toastId - ID of toast to remove
 */
const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    clearTimeout(toastTimeouts.get(toastId))
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: actionTypes.REMOVE_TOAST,
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

/**
 * @typedef {Object} ToastState
 * @property {Toast[]} toasts
 */

/**
 * @typedef {Object} Action
 * @property {string} type
 * @property {Toast} [toast]
 * @property {string} [toastId]
 */

/**
 * Reducer for toast state management
 * @param {ToastState} state - Current state
 * @param {Action} action - Action to perform
 * @returns {ToastState} New state
 */
export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case actionTypes.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast?.id ? { ...t, ...action.toast } : t
        ),
      }

    case actionTypes.DISMISS_TOAST: {
      const { toastId } = action
      if (!toastId) return state

      addToRemoveQueue(toastId)
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId ? { ...t, open: false } : t
        ),
      }
    }

    case actionTypes.REMOVE_TOAST:
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }

    default:
      return state
  }
}

/** @type {((state: ToastState) => void)[]} */
const listeners = []

/** @type {ToastState} */
let memoryState = { toasts: [] }

/**
 * Dispatch an action to update toast state
 * @param {Action} action - Action to dispatch
 */
function dispatch(action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

/**
 * Create a new toast
 * @param {Omit<Toast, "id" | "open" | "onOpenChange">} props - Toast properties
 * @returns {{ id: string, dismiss: () => void, update: (props: Partial<Toast>) => void }}
 */
function toast(props) {
  const id = genId()

  const update = (updatedProps) =>
    dispatch({
      type: actionTypes.UPDATE_TOAST,
      toast: { ...updatedProps, id },
    })

  const dismiss = () => dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id })

  dispatch({
    type: actionTypes.ADD_TOAST,
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
        props.onOpenChange?.(open)
      },
    },
  })

  return {
    id,
    dismiss,
    update,
  }
}

/**
 * Hook for managing toasts
 * @returns {{ toasts: Toast[], toast: typeof toast, dismiss: (toastId?: string) => void }}
 */
function useToast() {
  const [state, setState] = React.useState(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [])

  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: actionTypes.DISMISS_TOAST, toastId }),
  }
}

export { useToast, toast }
