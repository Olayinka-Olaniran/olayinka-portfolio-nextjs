

export default function Hero() {
  return (
            <section className="card bg-slate-50 p-6 md:p-10 rounded-md text-center flex flex-col items-center gap-4 w-full" id="home">
                {/* Home / Hero Section */}
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1 pb-2 border-b-2 border-orange-500 inline-block">Hi, I'm Olayinka Olaniran</h2>
                <p className="text-lg text-slate-700 max-w-2xl">Frontend developer building accessible, data-driven interfaces with vanilla JavaScript — no frameworks(for now), just fundamentals done well.</p>
                <p className="text-slate-600 max-w-2xl">Five featured projects spanning form validation, custom parsing, live API data, persistent state, and interactive UI — each built from scratch to sharpen core JavaScript before layering on tools like Tailwind, React, and TypeScript.</p>

                <div className="flex flex-wrap justify-center gap-4 mt-2">
                    <a href="#portfolio" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-5 rounded transition-colors">View Portfolio</a>
                    <a href="#contact" className="border-2 border-slate-900 hover:border-orange-500 hover:text-orange-500 text-slate-900 font-bold py-2 px-5 rounded transition-colors">Get In Touch</a>
                </div>

                <div className="flex flex-wrap justify-center gap-8 mt-4">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-orange-500">5</p>
                        <p className="text-sm text-slate-600">Featured Projects</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-orange-500">9</p>
                        <p className="text-sm text-slate-600">Skills Mapped</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-orange-500">JS </p>
                        <p className="text-sm text-slate-600">Vanilla JS Foundation</p>
                    </div>
                </div>
            </section>
  );
}