import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TacticalHero from '../components/TacticalHero';
import Summary from '../components/Summary';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import Education from '../components/Education';
import Footer from '../components/Footer';

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get('section');
    const id = section || (location.hash ? location.hash.replace('#', '') : '');
    if (!id) return;
    const el = document.getElementById(id);
    if (el) {
      setTimeout(() => {
        window.scrollTo({ top: el.offsetTop - 12, behavior: 'smooth' });
      }, 100);
    }
  }, [location]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 12, behavior: 'smooth' });
  };

  return (
    <>
      <TacticalHero onNav={scrollTo} />
      <Summary />
      <Projects />
      <Experience />
      <Skills />
      <Education />
      <Footer />
    </>
  );
}
