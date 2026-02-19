'use client';

import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-bg-dark text-text-primary overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 border-r border-gray-800 flex flex-col hide-scrollbar">
                <div className="p-6 border-b border-gray-800 flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-bold">O</div>
                    <span className="font-bold text-lg">OrganicFarm</span>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <Link href="/dashboard" className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 text-primary border border-primary/20">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                        Overview
                    </Link>
                    <Link href="/dashboard/sensors" className="sidebar-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-1.9" /><path d="M16 11V5a2 2 0 0 0-2-2 2 2 0 0 0-2 2v6" /><path d="M12 15c-1.1 0-2-.9-2-2h4c0 1.1-.9 2-2 2Z" /><path d="M21 21s-1.1-2.1-1.4-2.4a8 8 0 1 0-15.2 0C4.1 18.9 3 21 3 21h18Z" /></svg>
                        Sensors
                    </Link>
                    <Link href="/dashboard/diagnosis" className="sidebar-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9a3 3 0 0 1 0 6" /><path d="M22 9a3 3 0 0 0 0 6" /><path d="M12 22a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3" /><path d="M12 2a3 3 0 0 1 3 3h3a3 3 0 0 1 3-3" /><path d="M12 6v12" /><path d="M6 12h12" /></svg>
                        AI Diagnosis
                    </Link>
                    <Link href="/dashboard/ndvi" className="sidebar-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /></svg>
                        NDVI Heatmap
                    </Link>
                    <Link href="/dashboard/weather" className="sidebar-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" /><path d="M12 12v9" /><path d="m8 17 4 4 4-4" /></svg>
                        Weather
                    </Link>
                    <Link href="/dashboard/farmers" className="sidebar-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                        Farmers
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <div className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg">
                        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary">T</div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold truncate">Tiger Farmer</p>
                            <p className="text-xs text-gray-500 truncate">Premium Member</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Top Header */}
                <header className="h-16 border-b border-gray-800 flex items-center justify-between px-8 bg-bg-dark/50 backdrop-blur-sm z-10">
                    <h1 className="text-xl font-bold">Pilot Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <button className="relative w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700">
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
                        </button>
                        <div className="h-8 w-px bg-gray-800 mx-2"></div>
                        <div className="flex items-center gap-2 text-sm">
                            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                            IoT Stream: Active
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-8">
                    {children}
                </div>
            </main>

            <style jsx global>{`
        .sidebar-link {
          @apply flex items-center gap-3 p-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </div>
    );
}
