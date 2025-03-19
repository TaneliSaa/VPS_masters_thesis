"use client";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./globals.css";
import { useRouter } from "next/navigation";

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
  //States
  const { user, setUser } = useAuth();
  const router = useRouter();

  //Logout handler which sets user to null and clears token and redirect user to the login page
  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    setUser(null);
    router.push("/pages/login")
  };

  return (
    <div>

      {/* Navbar */}
      <nav className="p-4 bg-blue-500 text-white shadow-md flex justify-between items-center">
        <div className="text-lg font-semibold">
          {user ? <p>Welcome, {user.username}!</p> : <p>Not logged in</p>}
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 text-xl font-bold">
          Virtual Patient Simulation
        </div>

        {/*Logout button which is visible if user is logged in */}
        {user && (
          <button
            onClick={handleLogout}
            className="bg-white text-blue-500 px-3 py-1 rounded-md"
          >
            Logout
          </button>
        )}
      </nav>
      <main className="max-w-4xl mx-auto p-6">{children}</main>
    </div>
  );
}
