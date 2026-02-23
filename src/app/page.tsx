import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background Video Layer */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute min-w-full min-h-full object-cover top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <source src="/background_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Hero Section */}
      <header className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-text-primary">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
        <div className="moving-pattern -z-10"></div>

        <nav className="fixed top-8 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl glass-card rounded-[2rem] px-8 py-4 flex justify-between items-center z-50 transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-charcoal-green shadow-[0_0_15px_#39ff14]">
              <span className="font-black text-xl">O</span>
            </div>
            <span className="text-xl font-black tracking-tighter text-white">Organic <span className="text-primary italic">Farm</span></span>
          </div>
          <div className="hidden md:flex gap-10 items-center font-bold text-white/80">
            <a href="#" className="hover:text-primary transition-all">Our Tech</a>
            <a href="#" className="hover:text-primary transition-all">Sustainability</a>
            <a href="#" className="hover:text-primary transition-all">About</a>
            <Link href="/login" className="px-8 py-2.5 bg-primary text-charcoal-green rounded-xl hover:brightness-110 transition-all shadow-[0_0_15px_rgba(57,255,20,0.3)] font-black text-sm">
              Login/Signup
            </Link>
          </div>
        </nav>

        <div className="relative z-10 text-center max-w-7xl px-6 pt-32">
          <div className="flex flex-col gap-8 mb-16 items-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Next-Gen Agriculture
            </div>
            <h1 className="text-5xl md:text-8xl font-black leading-[1.1] tracking-tight text-white">
              The Intelligence <br />
              <span className="serif-italic text-primary">Behind the Harvest</span>
            </h1>
            <p className="max-w-xl text-lg md:text-xl leading-relaxed text-slate-300 font-medium">
              Revolutionizing organic farming with advanced AI and IoT technology. We bridge the gap between nature's wisdom and silicon precision.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/login" className="rounded-xl bg-primary px-8 py-4 text-base font-bold text-charcoal-green shadow-[0_0_20px_rgba(57,255,20,0.3)] transition-all hover:scale-105 active:scale-95">
                Launch Dashboard
              </Link>
              <button className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md px-8 py-4 text-base font-bold transition-all hover:bg-white/10 text-white">
                View Case Studies
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Bento Grid Feature Section */}
      <section id="features" className="relative px-6 py-24 lg:px-10 border-y border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-20 text-center max-w-3xl mx-auto">
            <h2 className="text-sm font-bold text-primary uppercase tracking-[0.4em] mb-4 text-glow">Core Ecosystem</h2>
            <h3 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-8">
              Nature <span className="serif-italic text-white/80">meets</span> Technology
            </h3>
            <p className="text-xl text-slate-400 font-light leading-relaxed">
              Our proprietary ecosystem ensures every plant gets exactly what it needs, reducing waste and maximizing nutritional value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[300px]">
            <div className="md:col-span-4 md:row-span-2 glass-card group flex flex-col p-10 rounded-3xl relative overflow-hidden">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-primary/30 mb-10 group-hover:border-primary transition-all duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 2v10" /><path d="m16 8-4 4-4-4" /><path d="M3 7V5a2 2 0 0 1 2-2h2" /><path d="M17 3h2a2 2 0 0 1 2 2v2" /><path d="M21 17v2a2 2 0 0 1-2 2h-2" /><path d="M7 21H5a2 2 0 0 1-2-2v-2" /></svg>
              </div>
              <h4 className="text-3xl font-bold text-white mb-6">IoT <span className="serif-italic text-secondary">Soil Sensors</span></h4>
              <p className="text-slate-400 text-lg leading-relaxed mb-auto">
                Real-time nutrient tracking and moisture levels delivered instantly. Sensors monitor NPK levels every 60 seconds.
              </p>
              <div className="mt-10 rounded-2xl bg-white/5 p-6 border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Moisture</span>
                  <span className="text-xs font-bold text-primary">OPTIMAL</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/5">
                  <div className="h-full w-[88%] rounded-full bg-primary shadow-[0_0_10px_#39ff14]"></div>
                </div>
              </div>
            </div>

            <div className="md:col-span-8 md:row-span-1 glass-card group flex overflow-hidden rounded-3xl">
              <div className="flex-1 p-10 flex flex-col justify-center">
                <div className="flex items-center gap-5 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-secondary/30">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary"><path d="M11 2a9 9 0 1 0 9 9 9 9 0 0 0-9-9Z" /><path d="m21 21-4.3-4.3" /></svg>
                  </div>
                  <h4 className="text-3xl font-bold text-white">AI <span className="serif-italic text-white/80">Growth Engine</span></h4>
                </div>
                <p className="text-slate-400 text-lg max-w-lg leading-relaxed">
                  Computer vision and machine learning models predict harvest cycles with 98% accuracy, identifying plant stress before it's visible.
                </p>
              </div>
            </div>

            <div className="md:col-span-4 md:row-span-1 glass-card group flex flex-col justify-center p-10 rounded-3xl border-primary/40 bg-primary/5">
              <div className="flex items-center gap-5 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary shadow-[0_0_15px_rgba(57,255,20,0.5)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-charcoal-green"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /></svg>
                </div>
                <span className="text-2xl font-bold text-white">NDVI <span className="serif-italic">Mapping</span></span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Satellite view of crop health with GEE heatmap overlays and real-time scanning.
              </p>
            </div>

            <div className="md:col-span-4 md:row-span-1 glass-card group flex flex-col justify-center p-10 rounded-3xl">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 border border-primary/30 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" /><path d="M12 12v9" /><path d="m8 17 4 4 4-4" /></svg>
              </div>
              <h4 className="text-2xl font-bold text-white mb-3">Weather <span className="serif-italic text-secondary">Alerts</span></h4>
              <p className="text-slate-400 leading-relaxed">
                Precision water delivery that reduces waste by 40% using hyper-local forecasting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-24 bg-charcoal-green text-white overflow-hidden relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-4 gap-12 text-center">
            <div className="space-y-4">
              <div className="text-6xl font-black text-primary text-glow">500+</div>
              <div className="text-slate-500 font-bold uppercase tracking-widest text-xs">Farmers Empowered</div>
            </div>
            <div className="space-y-4">
              <div className="text-6xl font-black text-secondary">10k+</div>
              <div className="text-slate-500 font-bold uppercase tracking-widest text-xs">Acres Monitored</div>
            </div>
            <div className="space-y-4">
              <div className="text-6xl font-black text-blue-400">98%</div>
              <div className="text-slate-500 font-bold uppercase tracking-widest text-xs">AI Accuracy</div>
            </div>
            <div className="space-y-4">
              <div className="text-6xl font-black text-primary">24/7</div>
              <div className="text-slate-500 font-bold uppercase tracking-widest text-xs">Live Monitoring</div>
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
