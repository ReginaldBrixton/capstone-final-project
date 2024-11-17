import React from 'react'
import PropTypes from 'prop-types'

export function FormDivider({ text }) {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-2 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900">{text}</span>
      </div>
    </div>
  )
}

FormDivider.propTypes = {
  text: PropTypes.string.isRequired
}