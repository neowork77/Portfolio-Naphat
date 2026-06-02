import HomeWithLoader from "@/components/HomeWithLoader";
import Hero       from '@/components/Hero';
import About      from '@/components/About';
import Skills     from '@/components/Skills';
import Projects   from '@/components/Projects';
import Experience from '@/components/Experience';
import Contact    from '@/components/Contact';
import Header     from '@/components/Header';
import Footer     from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export default function Home() {
  return (
    <HomeWithLoader>
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </HomeWithLoader>
  );
}
