import Image from "next/image";

export default function SkillsGraph() {
  return (
    <section className="card bg-slate-100 p-4 md:p-8 rounded-md" id="skills">
               {/* Skills Section */}
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 pb-2 border-b-2 border-orange-500 inline-block">My Skills</h2>
                <p className="text-slate-600 mt-2 mb-6 max-w-2xl">The languages and tools I&apos;ve practiced, and the core techniques behind each project below.</p>

                {/* Languages & tools practiced */}
                <div className="tech-stack flex flex-col items-center gap-3 mb-8">
                    <p className="font-semibold text-slate-700 text-sm uppercase tracking-wide">Languages &amp; Tools I Work With</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Image src="./assets/icons/html5.svg" alt="HTML5" title="HTML5" className="w-10 h-10 md:w-12 md:h-12 rounded-lg shadow-sm" width={48} height={48}/>
                        <Image src="./assets/icons/css3.svg" alt="CSS3" title="CSS3" className="w-10 h-10 md:w-12 md:h-12 rounded-lg shadow-sm" width={48} height={48}/>
                        <Image src="./assets/icons/javascript.svg" alt="JavaScript" title="JavaScript" className="w-10 h-10 md:w-12 md:h-12 rounded-lg shadow-sm" width={48} height={48}/>
                        <Image src="./assets/icons/tailwind.svg" alt="Tailwind CSS" title="Tailwind CSS" className="w-10 h-10 md:w-12 md:h-12 rounded-lg shadow-sm" width={48} height={48}/>
                        <Image src="./assets/icons/react.svg" alt="React" title="React" className="w-10 h-10 md:w-12 md:h-12 rounded-lg shadow-sm" width={48} height={48}/>
                        <Image src="./assets/icons/typescript.svg" alt="TypeScript" title="TypeScript" className="w-10 h-10 md:w-12 md:h-12 rounded-lg shadow-sm" width={48} height={48}/>
                    </div>
                </div>

                <p className="text-center text-sm sm:text-base text-slate-600 max-w-xl mx-auto mt-6 mb-7 leading-relaxed">
                    Here&apos;s how those tools come together in practice —
                    <span className="text-orange-500 font-medium"><span className="desktop-only">hover or </span>click on a skill</span> to see which projects use it.
                </p>

                <div className="graph-area grid grid-cols-[30%_40%_30%] md:grid-cols-[15%_70%_15%] w-full">

                    {/* 9 verified techniques */}
                    <div className="skill-nodes flex flex-col gap-2">
                        <div className="skill-node relative bg-white border border-slate-300 rounded-md shadow-md p-2 md:p-3" data-skill-id="form-validation" data-index="0">
                            <button type="button" className="skill-toggle w-full text-left font-bold text-xs md:text-sm text-slate-900" aria-expanded="false" aria-controls="desc-form-validation">Form/Data Validation</button>
                            <div id="desc-form-validation" className="skill-description hidden md:absolute md:left-full md:top-0 md:ml-3 md:w-56 md:z-20 mt-2 md:mt-0 bg-white border border-slate-200 rounded-md p-3 text-xs md:text-sm text-slate-600 shadow-lg">Client-side validation of form inputs before submission.</div>
                        </div>
                        <div className="skill-node relative bg-white border border-slate-300 rounded-md shadow-md p-2 md:p-3" data-skill-id="localstorage" data-index="1">
                            <button type="button" className="skill-toggle w-full text-left font-bold text-xs md:text-sm text-slate-900" aria-expanded="false" aria-controls="desc-localstorage">localStorage Persistence</button>
                            <div id="desc-localstorage" className="skill-description hidden md:absolute md:left-full md:top-0 md:ml-3 md:w-56 md:z-20 mt-2 md:mt-0 bg-white border border-slate-200 rounded-md p-3 text-xs md:text-sm text-slate-600 shadow-lg">Saving and retrieving user data in the browser.</div>
                        </div>
                        <div className="skill-node relative bg-white border border-slate-300 rounded-md shadow-md p-2 md:p-3" data-skill-id="custom-parser" data-index="2">
                            <button type="button" className="skill-toggle w-full text-left font-bold text-xs md:text-sm text-slate-900" aria-expanded="false" aria-controls="desc-custom-parser">Custom Expression Parser</button>
                            <div id="desc-custom-parser" className="skill-description hidden md:absolute md:left-full md:top-0 md:ml-3 md:w-56 md:z-20 mt-2 md:mt-0 bg-white border border-slate-200 rounded-md p-3 text-xs md:text-sm text-slate-600 shadow-lg">Parsing and evaluating string expressions with operator precedence.</div>
                        </div>
                        <div className="skill-node relative bg-white border border-slate-300 rounded-md shadow-md p-2 md:p-3" data-skill-id="fetch-api" data-index="3">
                            <button type="button" className="skill-toggle w-full text-left font-bold text-xs md:text-sm text-slate-900" aria-expanded="false" aria-controls="desc-fetch-api">API / Fetch</button>
                            <div id="desc-fetch-api" className="skill-description hidden md:absolute md:left-full md:top-0 md:ml-3 md:w-56 md:z-20 mt-2 md:mt-0 bg-white border border-slate-200 rounded-md p-3 text-xs md:text-sm text-slate-600 shadow-lg">Making HTTP requests and handling responses asynchronously.</div>
                        </div>
                        <div className="skill-node relative bg-white border border-slate-300 rounded-md shadow-md p-2 md:p-3" data-skill-id="modal-dialogs" data-index="4">
                            <button type="button" className="skill-toggle w-full text-left font-bold text-xs md:text-sm text-slate-900" aria-expanded="false" aria-controls="desc-modal-dialogs">Modal Dialogs</button>
                            <div id="desc-modal-dialogs" className="skill-description hidden md:absolute md:left-full md:top-0 md:ml-3 md:w-56 md:z-20 mt-2 md:mt-0 bg-white border border-slate-200 rounded-md p-3 text-xs md:text-sm text-slate-600 shadow-lg">Native and custom modal/dialog components for focused interactions.</div>
                        </div>
                        <div className="skill-node relative bg-white border border-slate-300 rounded-md shadow-md p-2 md:p-3" data-skill-id="array-methods" data-index="5">
                            <button type="button" className="skill-toggle w-full text-left font-bold text-xs md:text-sm text-slate-900" aria-expanded="false" aria-controls="desc-array-methods">Array Methods (map/filter)</button>
                            <div id="desc-array-methods" className="skill-description hidden md:absolute md:left-full md:top-0 md:ml-3 md:w-56 md:z-20 mt-2 md:mt-0 bg-white border border-slate-200 rounded-md p-3 text-xs md:text-sm text-slate-600 shadow-lg">Functional array operations for transforming collections.</div>
                        </div>
                        <div className="skill-node relative bg-white border border-slate-300 rounded-md shadow-md p-2 md:p-3" data-skill-id="dom-manipulation" data-index="6">
                            <button type="button" className="skill-toggle w-full text-left font-bold text-xs md:text-sm text-slate-900" aria-expanded="false" aria-controls="desc-dom-manipulation">DOM Manipulation</button>
                            <div id="desc-dom-manipulation" className="skill-description hidden md:absolute md:left-full md:top-0 md:ml-3 md:w-56 md:z-20 mt-2 md:mt-0 bg-white border border-slate-200 rounded-md p-3 text-xs md:text-sm text-slate-600 shadow-lg">Selecting, creating, and modifying HTML elements dynamically.</div>
                        </div>
                        <div className="skill-node relative bg-white border border-slate-300 rounded-md shadow-md p-2 md:p-3" data-skill-id="async-await" data-index="7">
                            <button type="button" className="skill-toggle w-full text-left font-bold text-xs md:text-sm text-slate-900" aria-expanded="false" aria-controls="desc-async-await">Async/Await</button>
                            <div id="desc-async-await" className="skill-description hidden md:absolute md:left-full md:top-0 md:ml-3 md:w-56 md:z-20 mt-2 md:mt-0 bg-white border border-slate-200 rounded-md p-3 text-xs md:text-sm text-slate-600 shadow-lg">Writing asynchronous code that reads like synchronous logic.</div>
                        </div>
                        <div className="skill-node relative bg-white border border-slate-300 rounded-md shadow-md p-2 md:p-3" data-skill-id="event-delegation" data-index="8">
                            <button type="button" className="skill-toggle w-full text-left font-bold text-xs md:text-sm text-slate-900" aria-expanded="false" aria-controls="desc-event-delegation">Event Delegation</button>
                            <div id="desc-event-delegation" className="skill-description hidden md:absolute md:left-full md:top-0 md:ml-3 md:w-56 md:z-20 mt-2 md:mt-0 bg-white border border-slate-200 rounded-md p-3 text-xs md:text-sm text-slate-600 shadow-lg">Efficient event handling via bubbling and delegation to parent elements.</div>
                        </div>
                    </div>

                    <div className="connections h-full flex justify-center items-center overflow-visible">
                        <svg id="graph-svg" className=" w-full h-full overflow-visible">
                        </svg>
                    </div>

                    {/* Matches project ids in projectsMetadata.js; links resolve to id="portfolio-{id}" on the rendered portfolio cards */}
                    <div className="projects flex flex-col justify-between h-full">
                        <div id="project-03" className="flex flex-row justify-between items-center project-node text-xs md:text-sm font-bold bg-white border border-slate-300 rounded-md shadow-md p-2 md:p-3">
                            <h3>Utility Calculator + BMI</h3>
                            <a href="#portfolio-03" className="flex flex-end justify-center items-center border-slate-900 border-2 rounded-md hover:text-orange-500 hover:scale-110 active:scale-90 w-8 h-8 m-0 my-auto transition-colors">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M5 12h14"/>
                                    <path d="M12 5l7 7-7 7"/>
                                </svg>
                            </a>
                        </div>
                        <div id="project-04" className="flex flex-row justify-between items-center project-node text-xs md:text-sm font-bold bg-white border border-slate-300 rounded-md shadow-md p-2 md:p-3">
                            <h3>Student Record System</h3>
                            <a href="#portfolio-04" className="flex flex-end justify-center items-center border-slate-900 border-2 rounded-md hover:text-orange-500 hover:scale-110 active:scale-90 w-8 h-8 m-0 my-auto transition-colors">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M5 12h14"/>
                                    <path d="M12 5l7 7-7 7"/>
                                </svg>
                            </a>
                        </div>
                        <div id="project-06" className="flex flex-row justify-between items-center project-node text-xs md:text-sm font-bold bg-white border border-slate-300 rounded-md shadow-md p-2 md:p-3">
                            <h3>Theme Switcher</h3>
                            <a href="#portfolio-06" className="flex flex-end justify-center items-center border-slate-900 border-2 rounded-md hover:text-orange-500 hover:scale-110 active:scale-90 w-8 h-8 m-0 my-auto transition-colors">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M5 12h14"/>
                                    <path d="M12 5l7 7-7 7"/>
                                </svg>
                            </a>
                        </div>
                        <div id="project-07" className="flex flex-row justify-between items-center project-node text-xs md:text-sm font-bold bg-white border border-slate-300 rounded-md shadow-md p-2 md:p-3">
                            <h3>Quiz App</h3>
                            <a href="#portfolio-07" className="flex flex-end justify-center items-center border-slate-900 border-2 rounded-md hover:text-orange-500 hover:scale-110 active:scale-90 w-8 h-8 m-0 my-auto transition-colors">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M5 12h14"/>
                                    <path d="M12 5l7 7-7 7"/>
                                </svg>
                            </a>
                        </div>
                        <div id="project-08" className="flex flex-row justify-between items-center project-node text-xs md:text-sm font-bold bg-white border border-slate-300 rounded-md shadow-md p-2 md:p-3">
                            <h3>Weather App</h3>
                            <a href="#portfolio-08" className="flex justify-center items-center border-slate-900 border-2 rounded-md hover:text-orange-500 hover:scale-110 active:scale-90 w-8 h-8 m-0 my-auto transition-colors">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M5 12h14"/>
                                    <path d="M12 5l7 7-7 7"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
  );
}