import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-bg-dark text-text-primary overflow-hidden relative font-sans">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px] -z-10"></div>
            <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[100px] -z-10"></div>

            {/* Sidebar */}
            <aside className="w-64 glass-green border-r border-white/10 flex flex-col hide-scrollbar z-20">
                <div className="p-8 flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg rotate-12">O</div>
                    <span className="font-black text-xl tracking-tighter">OrganicFarm</span>
                </div>

                <nav className="flex-1 px-4 space-y-2 overflow-y-auto mt-4">
                    <Link href="/dashboard" className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/10 text-primary border border-white/10 font-bold transition-all hover:bg-white/15">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                        Overview
                    </Link>
                    <Link href="/dashboard/sensors" className="sidebar-link group">
                        <div className="p-1 rounded-lg group-hover:bg-primary/20 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-1.9" /><path d="M16 11V5a2 2 0 0 0-2-2 2 2 0 0 0-2 2v6" /><path d="M12 15c-1.1 0-2-.9-2-2h4c0 1.1-.9 2-2 2Z" /><path d="M21 21s-1.1-2.1-1.4-2.4a8 8 0 1 0-15.2 0C4.1 18.9 3 21 3 21h18Z" /></svg>
                        </div>
                        Sensors
                    </Link>
                    <Link href="/dashboard/diagnosis" className="sidebar-link group">
                        <div className="p-1 rounded-lg group-hover:bg-secondary/20 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9a3 3 0 0 1 0 6" /><path d="M22 9a3 3 0 0 0 0 6" /><path d="M12 22a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3" /><path d="M12 2a3 3 0 0 1 3 3h3a3 3 0 0 1 3-3" /><path d="M12 6v12" /><path d="M6 12h12" /></svg>
                        </div>
                        AI Diagnosis
                    </Link>
                    <Link href="/dashboard/ndvi" className="sidebar-link group">
                        <div className="p-1 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /></svg>
                        </div>
                        NDVI Heatmap
                    </Link>
                    <Link href="/dashboard/weather" className="sidebar-link group">
                        <div className="p-1 rounded-lg group-hover:bg-orange-500/20 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" /><path d="M12 12v9" /><path d="m8 17 4 4 4-4" /></svg>
                        </div>
                        Weather
                    </Link>
                    <Link href="/dashboard/farmers" className="sidebar-link group">
                        <div className="p-1 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                        </div>
                        Farmers
                    </Link>
                </nav>

                <div className="p-6">
                    <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold shadow-inner">T</div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-black truncate">Tiger Farmer</p>
                            <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Premium Tier</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden bg-transparent">
                {/* Top Header */}
                <header className="h-20 border-b border-white/10 flex items-center justify-between px-10 bg-black/20 backdrop-blur-md z-10">
                    <h1 className="text-2xl font-black tracking-tight">Intelligence <span className="text-primary">Hub</span></h1>
                    <div className="flex items-center gap-6">
                        <button className="relative w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all hover:scale-105 active:scale-95 shadow-lg group">
                            <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#0a0d0c] group-hover:animate-ping"></span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
                        </button>
                        <div className="h-10 w-px bg-white/10"></div>
                        <div className="flex items-center gap-3 text-sm font-bold bg-primary/10 px-4 py-2.5 rounded-full border border-primary/20 text-primary">
                            <span className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(13,124,102,0.6)]"></span>
                            IoT Streaming
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-10 hide-scrollbar">
                    {children}
                </div>
            </main>
        </div>
    );
}
