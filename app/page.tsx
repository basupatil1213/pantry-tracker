import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-4 sm:p-8 md:p-16 lg:p-24 bg-gray-900 text-white">
      <header className="w-full max-w-5xl text-center mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Welcome to Your Smart Pantry</h1>
        <p className="text-lg sm:text-xl text-gray-300">Organize, track, and optimize your kitchen inventory</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
        <FeatureCard
          title="Inventory Management"
          description="Keep track of all your pantry items with ease"
          icon="📦"
        />
        <FeatureCard
          title="Upcoming Features: Expiration Alerts"
          description="Get notified before your food goes bad"
          icon="🚨"
        />
        <FeatureCard
          title="Upcoming Features: Shopping Lists"
          description="Automatically generate lists based on your inventory"
          icon="🛒"
        />
      </div>
    </main>
  );
}

type FeatureCardProps = {
  title: string;
  description: string;
  icon: string;
};

function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="bg-gray-800 border-2 border-gray-700 rounded-lg shadow-md p-6 flex flex-col items-center text-center">
      <span className="text-4xl mb-4">{icon}</span>
      <h2 className="text-xl font-semibold mb-2 text-white">{title}</h2>
      <p className="text-sm text-gray-300">{description}</p>
    </div>
  );
}