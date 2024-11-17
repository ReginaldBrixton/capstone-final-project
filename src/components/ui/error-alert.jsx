import { motion, AnimatePresence } from "framer-motion"
import { Alert, AlertDescription, AlertTitle } from "./alert"
import { XCircle } from "lucide-react"
import { Button } from "./button"

export function ErrorAlert({ message, onDismiss }) {
  if (!message) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        className="fixed top-4 right-4 z-50 max-w-md"
      >
        <Alert variant="destructive" className="relative shadow-lg">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {formatErrorMessage(message)}
          </AlertDescription>
          {onDismiss && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-6 w-6 rounded-full opacity-70 ring-offset-background transition-opacity hover:opacity-100"
              onClick={onDismiss}
            >
              <XCircle className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          )}
        </Alert>
      </motion.div>
    </AnimatePresence>
  );
}

function formatErrorMessage(error) {
  if (!error) return "";
  
  // Handle Firebase errors
  if (typeof error === "object" && error.code) {
    switch (error.code) {
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
        return error.message || "An unexpected error occurred. Please try again.";
    }
  }

  // Handle string error messages
  return error.toString();
}