import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutSection from '@/components/AboutSection';
import ResumeSection from '@/components/ResumeSection';
import PortfolioSection from '@/components/PortfolioSection';

export default function Home() {
  return (
    <div className="index-page">
      <Header />
      <main className="main">
        <AboutSection />
        <ResumeSection />
        <PortfolioSection />
      </main>
      <Footer />
    </div>
  );
}
