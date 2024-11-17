import { motion, AnimatePresence } from "framer-motion"
import { Alert, AlertDescription, AlertTitle } from "./alert"
import { XCircle, CheckCircle2, XIcon } from "lucide-react"
import { Button } from "./button"

export function NotificationAlert({ message, type = "error", onDismiss }) {
  if (!message) return null;

  const icons = {
    error: XCircle,
    success: CheckCircle2
  };

  const titles = {
    error: "Error",
    success: "Success"
  };

  const Icon = icons[type];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        className="fixed top-4 right-4 z-50 max-w-md"
      >
        <Alert 
          variant={type === "error" ? "destructive" : "default"} 
          className={`relative shadow-lg ${
            type === "success" 
              ? "border-green-500/50 text-green-700 dark:text-green-400 [&>svg]:text-green-500" 
              : ""
          }`}
        >
          <Icon className="h-4 w-4" />
          <AlertTitle>{titles[type]}</AlertTitle>
          <AlertDescription>
            {formatMessage(message)}
          </AlertDescription>
          {onDismiss && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-6 w-6 rounded-full opacity-70 ring-offset-background transition-opacity hover:opacity-100"
              onClick={onDismiss}
            >
              <XIcon className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          )}
        </Alert>
      </motion.div>
    </AnimatePresence>
  );
}

function formatMessage(message) {
  if (!message) return "";
  
  // Handle Firebase errors
  if (typeof message === "object" && message.code) {
    switch (message.code) {
      case "auth/invalid-credential":
        return "Invalid email or password. Please try again.";
      case "auth/user-not-found":
        return "No account found with this email address.";
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      case "auth/email-already-in-use":
        return "This email is already registered. Please try logging in instead.";
      case "auth/weak-password":
        return "Password should be at least 6 characters long.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      default:
        return message.message || "An unexpected error occurred. Please try again.";
    }
  }

  // Handle string messages
  return message.toString();
}
