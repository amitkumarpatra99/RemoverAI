import "./globals.css";
import Navbar from "@/components/Navbar"; // 1. Import the Navbar

export const metadata = {
  title: "AI Background Remover",
  description: "Remove backgrounds instantly using AI technology. Fast, free, and secure image processing directly in your browser.",
  applicationName: "Remover.AI",
  authors: [{ name: "Remover.AI Team" }],
  generator: "Next.js",
  keywords: ["background remover", "AI", "image editing", "transparent background", "free tool"],
  referrer: "origin-when-cross-origin",
  creator: "Remover.AI",
  publisher: "Remover.AI",
  openGraph: {
    title: "AI Background Remover",
    description: "Remove backgrounds instantly using AI technology.",
    url: "https://remover.ai",
    siteName: "Remover.AI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Background Remover",
    description: "Remove backgrounds instantly using AI technology.",
    creator: "@remover_ai",
  },
  icons: {
    icon: "/favicon.ico",
  },
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