import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Summary from '../components/Summary';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import Education from '../components/Education';
import Footer from '../components/Footer';

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    // Handle section navigation via query (e.g., /?section=projects)
    const params = new URLSearchParams(location.search);
    const section = params.get('section');
    const id = section || (location.hash ? location.hash.replace('#', '') : '');
    if (!id) {
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      setTimeout(() => {
        const offset = 80;
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({ top: elementPosition, behavior: 'smooth' });
      }, 100);
    }
  }, [location]);

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Summary />
      <Projects />
      <Experience />
      <Skills />
      <Education />
      <Footer />
    </div>
  );
}
