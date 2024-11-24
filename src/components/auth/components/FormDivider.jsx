export function FormDivider({ text }) {
  return (
    <div className="form-divider relative my-6">
      <div className="form-divider-line absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
      </div>
      <div className="form-divider-text relative flex justify-center text-sm">
        <span className="form-divider-label px-2 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900">{text}</span>
      </div>
    </div>
  )
}

FormDivider.propTypes = {
  text: String
}