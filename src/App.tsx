import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Summary from './components/Summary'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Education from './components/Education'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Summary />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Footer />
    </div>
  )
}

export default App
