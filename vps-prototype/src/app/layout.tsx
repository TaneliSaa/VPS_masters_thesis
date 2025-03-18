"use client";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className="bg-gray-100 text-gray-900 min-h-screen flex flex-col">
          <LayoutContent>{children}</LayoutContent>
        </body>
      </html>
    </AuthProvider>
  );
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  return (
    <div>
      <nav className="p-4 bg-blue-500 text-white shadow-md flex justify-between items-center">
        <div className="text-lg font-semibold">
          {user ? <p>Welcome, {user.username}!</p> : <p>Not logged in</p>}
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 text-xl font-bold">
            Virtual Patient Simulation
        </div>

        <div>
          <button className="bg-white text-blue-500 px-3 py-1 rounded-md">
            Logout
          </button>
        </div>
        
      </nav>
      <main className="max-w-4xl mx-auto p-6">{children}</main>
    </div>
  );
}
