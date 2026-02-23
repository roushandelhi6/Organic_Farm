import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col h-screen bg-bg-dark text-white overflow-hidden relative font-sans">
            {/* Top Navigation Bar */}
            <header className="flex items-center justify-between border-b border-primary/20 px-8 py-4 bg-bg-dark/80 backdrop-blur-md z-50">
                <div className="flex items-center gap-12">
                    <Link href="/dashboard" className="flex items-center gap-3">
                        <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-charcoal-green shadow-[0_0_15px_#39ff14]">
                            <span className="font-bold text-xl">O</span>
                        </div>
                        <h2 className="text-xl font-bold tracking-tight">Organic <span className="text-primary italic">Farm</span></h2>
                    </Link>
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/dashboard" className="text-primary font-bold text-sm flex items-center gap-2">
                            Dashboard
                        </Link>
                        <Link href="/dashboard/sensors" className="text-slate-400 hover:text-primary transition-colors font-bold text-sm flex items-center gap-2">
                            Sensors
                        </Link>
                        <Link href="/dashboard/diagnosis" className="text-slate-400 hover:text-primary transition-colors font-bold text-sm flex items-center gap-2">
                            AI Diagnosis
                        </Link>
                        <Link href="/dashboard/ndvi" className="text-slate-400 hover:text-primary transition-colors font-bold text-sm flex items-center gap-2">
                            NDVI Mapping
                        </Link>
                        <Link href="/dashboard/weather" className="text-slate-400 hover:text-primary transition-colors font-bold text-sm flex items-center gap-2">
                            Weather
                        </Link>
                    </nav>
                </div>
                <div className="flex items-center gap-6">
                    <div className="relative hidden lg:block">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        <input className="bg-primary/5 border border-primary/20 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-primary focus:border-primary w-64 text-slate-100 outline-none" placeholder="Search data..." type="text" />
                    </div>
                    <div className="flex items-center gap-3 pl-6 border-l border-primary/10">
                        <div className="text-right hidden sm:block">
                            <p className="text-[10px] font-black text-slate-100 uppercase tracking-widest leading-none">Tiger Farmer</p>
                            <p className="text-[10px] text-primary font-bold">Status: Online</p>
                        </div>
                        <div className="size-10 rounded-full border-2 border-primary/30 p-0.5 overflow-hidden">
                            <div className="w-full h-full rounded-full bg-primary/20 flex items-center justify-center text-primary font-black">T</div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 relative flex overflow-hidden">
                {children}
            </main>
        </div>
    );
}
