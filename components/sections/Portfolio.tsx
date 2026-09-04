import Image from "next/image";

export default function Portfolio() {
  return (
         
            <section className="card bg-slate-50 p-4 md:p-8 rounded-md" id="portfolio">\
                {/* Portfolio Section */}
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 pb-2 border-b-2 border-orange-500 inline-block">My Portfolio</h2>

                {/* Project cards render here via JS from projectsMetadata.js. Give each card id="portfolio-{project.id}" (e.g. id="portfolio-03") so the skill-graph links above resolve. */}
                <div id="projects-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                </div>

            </section>   
  );
}