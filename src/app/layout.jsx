import { Toaster } from "../components/ui/toaster";
import "./globals.css";

export const metadata = {
  title: "Capstone Project Management",
  description: "A platform for managing capstone projects and collaborations",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
