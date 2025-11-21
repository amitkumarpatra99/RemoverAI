import BgRemover from "@/components/BgRemover";

export default function Home() {
  return (
    // Modern Dark Gradient Background
    <main className="min-h-screen w-full bg-[#0f172a] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-[#0f172a] to-[#0f172a] flex items-center justify-center py-10 px-4 relative overflow-hidden">
      
      {/* Background Blobs for extra Glass effect */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
      
      <BgRemover />
    </main>
  );
}