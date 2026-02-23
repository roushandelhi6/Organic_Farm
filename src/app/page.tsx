import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background Video Layer */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <iframe
          className="absolute w-[300%] h-[300%] -top-[100%] -left-[100%] pointer-events-none object-cover"
          src="https://www.youtube.com/embed/nSgq-DunVRA?autoplay=1&mute=1&controls=0&loop=1&playlist=nSgq-DunVRA&showinfo=0&rel=0&iv_load_policy=3"
          allow="autoplay; encrypted-media"
          frameBorder="0"
        ></iframe>
      </div>

      {/* Hero Section */}
      <header className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-text-primary">
        <nav className="fixed top-8 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl glass-green rounded-[2rem] px-8 py-4 flex justify-between items-center z-50 transition-all duration-300">
          <div className="text-2xl font-black text-white flex items-center gap-3 tracking-tighter cursor-pointer hover:scale-105 transition-transform">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg rotate-12">O</div>
            OrganicFarm
          </div>
          <div className="hidden md:flex gap-10 items-center font-bold text-white/80">
            <a href="#" className="hover:text-primary transition-all">About Us</a>
            <a href="#" className="hover:text-primary transition-all">Products</a>
            <a href="#" className="hover:text-primary transition-all">Pricing</a>
            <a href="#" className="hover:text-primary transition-all">Contact</a>
            <Link href="/login" className="px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-all shadow-xl font-black">
              Login/Signup
            </Link>
          </div>
        </nav>

        <div className="relative z-10 text-center max-w-5xl px-6 pt-20">
          <h1 className="text-3xl md:text-4xl font-black mb-8 tracking-tight text-blue-300 drop-shadow-[0_0_15px_rgba(147,197,253,0.5)]">
            Nurture with <span className="opacity-80">Nature.</span><br />
            Monitor with <span className="opacity-80">Intelligence.</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#8B4513] mb-12 max-w-2xl mx-auto leading-relaxed font-bold">
            The next generation of organic farming. Real-time IoT monitoring, AI disease detection, and satellite health analytics in one premium dashboard.
          </p>
          <div className="flex justify-center">
            <Link href="/login" className="btn-primary text-xl px-12 py-5 shadow-2xl">
              Launch Dashboard
            </Link>
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
