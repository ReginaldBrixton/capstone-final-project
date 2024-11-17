import { motion } from "framer-motion"

export function PasswordRequirements({ password }) {
  const requirements = [
    { check: password.length >= 8, text: "8+ characters", icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h2M12 15h5" />
      </svg>
    )},
    { check: /[A-Z]/.test(password), text: "Uppercase", icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )},
    { check: /[0-9]/.test(password), text: "Number", icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    )},
    { check: /[^A-Za-z0-9]/.test(password), text: "Special", icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
      </svg>
    )}
  ]

  return (
    <motion.div
      className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-2"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.05
          }
        }
      }}
    >
      <div className="grid grid-cols-2 gap-1.5">
        {requirements.map((requirement, index) => (
          <RequirementItem key={index} {...requirement} />
        ))}
      </div>
    </motion.div>
  )
}

function RequirementItem({ check, text, icon }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 5 },
        visible: { opacity: 1, y: 0 }
      }}
      className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium ${
        check 
          ? 'text-green-600 dark:text-green-400' 
          : 'text-gray-500 dark:text-gray-400'
      }`}
    >
      <motion.div
        animate={check ? "checked" : "unchecked"}
        variants={{
          checked: { scale: 1.1 },
          unchecked: { scale: 1 }
        }}
        transition={{ duration: 0.2 }}
        className="flex-shrink-0"
      >
        {check ? (
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ) : icon}
      </motion.div>
      <span>{text}</span>
    </motion.div>
  )
}