import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative flex flex-col items-center gap-3 footer p-6 mt-4 bg-slate-800 text-white w-full">
            {/* Footer section with page navigation, social links, and copyright */}
            <p>
                <a className="hover:text-orange-500 transition-colors" href="#home">Home</a> |
                <a className="hover:text-orange-500 transition-colors" href="#skills">Skills</a> |
                <a className="hover:text-orange-500 transition-colors" href="#portfolio">Portfolio</a> |
                <a className="hover:text-orange-500 transition-colors" href="#contact">Contact</a>
            </p>

            <div className="flex flex-row gap-4">
                <a href="https://github.com/Olayinka-Olaniran" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-orange-500 transition-colors">
                    <Image src="/assets/icons/github.svg" alt="GitHub" className="w-5 h-5 invert" width={20} height={20} />
                </a>
                <a href="https://www.linkedin.com/in/olayinka-olaniran-a2ba063a2" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-orange-500 transition-colors">
                    <Image src="/assets/icons/linkedin.svg" alt="LinkedIn" className="w-5 h-5 invert" width={20} height={20} />
                </a>
                <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-orange-500 transition-colors">
                    <Image src="/assets/icons/twitter.svg" alt="Twitter" className="w-5 h-5 invert" width={20} height={20} />
                </a>
            </div>

            <p className="text-sm text-slate-300">&copy; 2026 Olayinka Olaniran. All rights reserved.</p>

        </footer>
  );
}
