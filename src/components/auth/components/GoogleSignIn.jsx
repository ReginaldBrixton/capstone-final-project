import { Button } from "../../form/button";

export const GoogleSignIn = ({ onGoogleLogin, isLoading }) => {
  return (
    <Button
      type="button"
      onClick={onGoogleLogin}
      disabled={isLoading}
      className="w-full flex items-center justify-center gap-3 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
    >
      <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
        {/* Google SVG paths */}
      </svg>
      <span>Continue with Google</span>
    </Button>
  );
}; 