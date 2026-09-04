import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import SkillsGraph from "@/components/sections/SkillsGraph";
import Portfolio from "@/components/sections/Portfolio";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";



export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Header />
        <main className="main-container flex flex-col gap-6 px-3 md:px-7 mx-auto">
          <Hero />
          <SkillsGraph />
          <Portfolio />
          <Contact />
        </main>
      <Footer />
    </div>
  );
}
