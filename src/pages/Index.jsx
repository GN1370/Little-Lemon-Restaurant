import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Specials from '../components/Specials';
import Testimonials from '../components/Testimonials';
import AboutSection from '../components/AboutSection';

const Index = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Specials />
        <Testimonials />
        <AboutSection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
