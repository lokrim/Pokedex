
import PokeGrid from "@/components/pokegrid";

export default function Home() {
  return (
    <div className="font-sans min-h-screen p-8 pb-20 sm:p-20 flex items-center justify-center">
      <main className="w-full max-w-3xl">
        <PokeGrid />
      </main>
    </div>
  );
}
