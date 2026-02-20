import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden bg-bg-dark text-text-primary">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent opacity-50 animate-pulse"></div>
        </div>

        <nav className="absolute top-0 w-full p-6 flex justify-between items-center z-10">
          <div className="text-2xl font-bold text-primary flex items-center gap-2">
            <span className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">O</span>
            OrganicFarm Pro
          </div>
          <div className="flex gap-8 items-center font-medium">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#stats" className="hover:text-primary transition-colors">Impact</a>
            <Link href="/login" className="btn-primary">Get Started</Link>
          </div>
        </nav>

        <div className="relative z-10 text-center max-w-4xl px-4">
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
            Nurture with <span className="text-primary">Nature.</span><br />
            Monitor with <span className="text-secondary">Intelligence.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            The next generation of organic farming. Real-time IoT monitoring, AI disease detection, and satellite health analytics in one premium dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login" className="px-8 py-4 bg-primary text-white rounded-xl text-lg font-bold hover:bg-primary-dark transition-all transform hover:scale-105 shadow-xl">
              Launch Dashboard
            </Link>
            <button className="px-8 py-4 bg-transparent border-2 border-gray-700 text-white rounded-xl text-lg font-bold hover:bg-gray-800 transition-all">
              Watch Demo
            </button>
          </div>
        </div>
      </header>

      {/* Feature Section */}
      <section id="features" className="py-24 bg-bg-light text-text-dark">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4">Smart Farming, Simplified</h2>
            <p className="text-xl text-gray-600">Integrated tools for the modern organic farmer.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <Link href="/dashboard/sensors" className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all block group">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v10" /><path d="m16 8-4 4-4-4" /><path d="M3 7V5a2 2 0 0 1 2-2h2" /><path d="M17 3h2a2 2 0 0 1 2 2v2" /><path d="M21 17v2a2 2 0 0 1-2 2h-2" /><path d="M7 21H5a2 2 0 0 1-2-2v-2" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Simulated IoT</h3>
              <p className="text-gray-600">Monitor moisture, NPK, and humidity with virtualized precision.</p>
            </Link>

            <Link href="/dashboard/diagnosis" className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all block group">
              <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary mb-6 group-hover:bg-secondary group-hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 2a9 9 0 1 0 9 9 9 9 0 0 0-9-9Z" /><path d="m21 21-4.3-4.3" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-3">AI Diagnosis</h3>
              <p className="text-gray-600">TensorFlow.js leaf scanning for rust and blight detection.</p>
            </Link>

            <Link href="/dashboard/ndvi" className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all block group">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9a3 3 0 0 1 0 6" /><path d="M22 9a3 3 0 0 0 0 6" /><path d="M12 22a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3" /><path d="M12 2a3 3 0 0 1 3 3h3a3 3 0 0 1 3-3" /><path d="M12 6v12" /><path d="M6 12h12" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-3">NDVI Mapping</h3>
              <p className="text-gray-600">Satellite view of crop health with GEE heatmap overlays.</p>
            </Link>

            <Link href="/dashboard/weather" className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all block group">
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-6 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" /><path d="M12 12v9" /><path d="m8 17 4 4 4-4" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Weather Alerts</h3>
              <p className="text-gray-600">48-hr forecasts with triggers for heavy rainfall protection.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-24 bg-bg-dark text-white overflow-hidden relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl -ml-48 -mb-48"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-4 gap-12 text-center">
            <div className="space-y-2">
              <div className="text-5xl font-black text-primary">500+</div>
              <div className="text-gray-400 font-medium uppercase tracking-widest text-sm">Farmers Empowered</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-black text-secondary">10k+</div>
              <div className="text-gray-400 font-medium uppercase tracking-widest text-sm">Acres Monitored</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-black text-blue-400">98%</div>
              <div className="text-gray-400 font-medium uppercase tracking-widest text-sm">AI Accuracy</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-black text-orange-400">24/7</div>
              <div className="text-gray-400 font-medium uppercase tracking-widest text-sm">Live Monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bg-dark text-gray-500 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xl font-bold text-primary">OrganicFarm Pro</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
          <div>© 2026 OrganicFarm Pro Pilot. Zero-Cost Architecture.</div>
        </div>
      </footer>
    </div>
  );
}
