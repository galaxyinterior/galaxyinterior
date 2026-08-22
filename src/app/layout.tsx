import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { AdminSidebar } from "@/components/layout/AdminSidebar";

export const metadata: Metadata = {
  title: "Admin Panel | Galaxy Interior",
  description: "Internal dashboard for Galaxy Interior",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 font-sans">
        <AuthProvider>
          <AdminSidebar>
            {children}
          </AdminSidebar>
        </AuthProvider>
      </body>
    </html>
  );
}
