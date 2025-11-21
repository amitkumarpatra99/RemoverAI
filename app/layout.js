import "./globals.css";
import Navbar from "@/components/Navbar"; // 1. Import the Navbar

export const metadata = {
  title: "AI Background Remover",
  description: "Remove backgrounds instantly using AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#0f172a] text-white">
        {/* 2. Add Navbar here, above {children} */}
        <Navbar />
        
        {/* 3. Add some padding-top so content doesn't hide behind the fixed navbar */}
        <div className="pt-16">
          {children}
        </div>
      </body>
    </html>
  );
}