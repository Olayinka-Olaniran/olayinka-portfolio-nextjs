import Image from "next/image";

export default function Home() {
  return (
            <section className="card bg-slate-100 p-4 md:p-8 rounded-md" id="contact">
                {/*Contact Section */}
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 pb-2 border-b-2 border-orange-500 table mx-auto">Contact Me</h2>

                <div className="flex flex-col md:flex-row items-stretch justify-center max-w-4xl mx-auto">

                    <div className="flex flex-1 md:max-w-sm flex-col justify-between bg-linear-to-br from-slate-900 to-slate-800 rounded-t-lg md:rounded-l-lg md:rounded-tr-none border border-slate-300 shadow-inner p-6 relative overflow-hidden">

                        {/* decorative blobs */}
                        <div className="absolute -right-10 -top-10 w-40 h-40 bg-orange-500/20 rounded-full blur-2xl"></div>
                        <div className="absolute -left-10 bottom-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl"></div>

                        {/* subtle dot grid pattern */}
                        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "16px 16px" }}></div>

                        {/* top: intro */}
                        <div className="relative z-10">
                            <h3 className="text-white font-bold text-lg mb-2">Let&rsquo;s build something great</h3>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                Whether it&rsquo;s a project, an opportunity, or just a question — I usually reply within a day.
                            </p>
                        </div>

                        {/* middle: stat block (fills the dead space) */}
                        <div className="relative z-10 grid grid-cols-3 gap-2 border-y border-white/10 py-5 my-6">
                            <div className="text-center">
                                <p className="text-orange-500 font-bold text-xl">5+</p>
                                <p className="text-slate-400 text-[11px] leading-tight mt-1">Built<br/>Projects</p>
                            </div>
                            <div className="text-center">
                                <p className="text-orange-500 font-bold text-xl">9+</p>
                                <p className="text-slate-400 text-[11px] leading-tight mt-1">Core<br/>Techniques</p>
                            </div>
                            <div className="text-center">
                                <p className="text-orange-500 font-bold text-xl">&lt;24h</p>
                                <p className="text-slate-400 text-[11px] leading-tight mt-1">Avg. Reply<br/>Time</p>
                            </div>
                        </div>

                        {/* bottom: contact links */}
                        <div className="relative z-10 flex flex-col gap-3">
                            <div className="flex items-center gap-2 text-sm text-slate-200">
                                <Image src="./assets/icons/mail.svg" width={20} height={20} className="w-5 h-5 invert" alt="Email" />
                                <a href="mailto:oolaniran853@gmail.com" className="hover:text-orange-400 transition-colors" aria-label="Email oolaniran853@gmail.com">
                                    oolaniran853@gmail.com
                                </a>
                                <button id="copy-email-btn" type="button" aria-label="Copy email address" className="hover:cursor-pointer">
                                    <Image src="./assets/icons/copy.svg" width={20} height={20} title="Copy Email" className="w-5 h-5 hover:transform hover:scale-110 hover:cursor-pointer transition-all duration-100 active:translate-y-0.5 invert" alt="Copy Email" />
                                </button>
                            </div>
                            <a href="https://github.com/Olayinka-Olaniran" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="flex items-center gap-2 text-sm text-slate-200 hover:text-orange-500 transition-colors">
                                <Image src="./assets/icons/github.svg" width={20} height={20} alt="GitHub" className="w-5 h-5 invert" />
                                GitHub
                            </a>
                            <a href="https://www.linkedin.com/in/olayinka-olaniran-a2ba063a2" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex items-center gap-2 text-sm text-slate-200 hover:text-orange-500 transition-colors">
                                <Image src="./assets/icons/linkedin.svg" width={20} height={20} alt="LinkedIn" className="w-5 h-5 invert" />
                                LinkedIn
                            </a>
                        </div>
                    </div>

                    {/* Form */}
                    <form className="flex-1 w-full max-w-md mx-auto md:mx-0 flex flex-col gap-4 bg-white border border-slate-300 rounded-b-lg md:rounded-r-lg md:rounded-l-none shadow-xl p-6" id="contact-form" name="contact" method="post" data-netlify="true" data-netlify-honeypot="bot-field">
                        <input type="hidden" name="form-name" value="contact" />
                        <p className="hidden">
                            <label>Don&rsquo;t fill this out if you&rsquo;re human: <input name="bot-field" /></label>
                        </p>

                        <label htmlFor="name" className="text-sm font-medium text-slate-700">Name:</label>
                        <input className="border-slate-700 border-2 bg-slate-50 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-500" type="text" id="name" name="name" required/>

                        <label htmlFor="email" className="text-sm font-medium text-slate-700">Email:</label>
                        <input className="border-slate-700 border-2 bg-slate-50 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-500" type="email" id="email" name="email" required/>

                        <label htmlFor="message" className="text-sm font-medium text-slate-700">Message:</label>
                        <textarea className="border-slate-700 border-2 bg-slate-50 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-500" id="message" name="message" rows={4} required></textarea>

                        <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition-colors disabled:opacity-60 disabled:cursor-not-allowed">Send</button>

                        <p id="form-status" role="status" aria-live="polite" className="text-sm min-h-5"></p>
                    </form>

                </div>
            </section>      
  );
}