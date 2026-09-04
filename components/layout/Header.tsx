import Image from "next/image";


export default function Header() {  
    return (
        <header className="sticky top-0 left-0 bg-linear-to-r from-slate-900 to-slate-700 flex flex-row flex-wrap justify-around items-center text-white mb-3 h-auto w-full border-bottom z-50 shadow-lg">

            <div className="flex flex-row justify-center text-2xl font-bold w-1/2 text-center items-center p-2">
                <div className="relative w-8.5 h-8.5 rounded-full overflow-hidden shadow-2xl group">
                    <Image src="/assets/icons/Logo.png" alt="Mountain Graphic" className="w-full h-full object-cover scale-110 contrast-110 brightness-95" width={34} height={34} />
                    <div className="absolute inset-0 bg-indigo-900/20 mix-blend-color pointer-events-none"></div>
                    <div className="absolute inset-0 bg-linear-to-t from-blue-950/40 via-transparent to-pink-400/10 mix-blend-overlay pointer-events-none"></div>
                </div>
                <h1 className="w-8/10 text-start pl-2">Olayinka</h1>
            </div>

            {/* Mobile-only controls slot — same w-1/2 the hamburger alone used to occupy */}
            <div className="flex md:hidden items-center justify-end gap-2 p-2 w-1/2">
                <button type="button" className="palette-trigger flex items-center gap-1 text-xs text-slate-300 border border-slate-600 rounded px-2 py-1.5 hover:border-orange-500 hover:text-orange-400 transition" aria-label="Open command palette" aria-haspopup="dialog" aria-controls="command-palette" aria-expanded="false">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"/>
                    </svg>
                </button>
                {/* Hamburger commented out per supervisor: non-standard implementation,
                     unnecessary now that nav links wrap onto their own line below.
                     Left in place in case this needs to come back later. */}
                {/*
                <button id="menu-toggle" className="p-1" aria-label="Toggle navigation menu" aria-controls="menu" aria-expanded="false">
                    <svg className="w-10 h-10 rounded-sm bg-linearto-r from-gray-700 to-gray-500 active:bg-linear-to-r active:from-gray-900 active:to-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
                */}
            </div>

            <nav id="menu" className="flex w-full flex-row items-center md:w-1/2 h-full">
                <a className="font-bold text-center p-3 flex-1 hover:text-orange-600 transition-colors" href="#home">Home</a>
                <a className="font-bold text-center p-3 flex-1 hover:text-orange-600 transition-colors" href="#skills">Skills</a>
                <a className="font-bold text-center p-3 flex-1 hover:text-orange-600 transition-colors" href="#portfolio">Portfolio</a>
                <a className="font-bold text-center p-3 flex-1 hover:text-orange-600 transition-colors" href="#contact">Contact</a>
                <button type="button" className="palette-trigger hidden md:flex items-center gap-1.5 text-xs text-slate-300 border border-slate-600 rounded px-2 py-1.5 mr-2 hover:border-orange-500 hover:text-orange-400 transition" aria-label="Open command palette" aria-haspopup="dialog" aria-controls="command-palette" aria-expanded="false">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"/>
                    </svg>
                    <span>⌘K</span>
                </button>
            </nav>

        </header>
    );
}
