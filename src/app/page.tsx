import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutSection from '@/components/AboutSection';
import ResumeSection from '@/components/ResumeSection';
import PortfolioSection from '@/components/PortfolioSection';
import { getProjects } from '@/lib/portfolio';

export default async function Home() {
  const projects = await getProjects();
  return (
    <div className="index-page">
      <Header />
      <main className="main">
        <AboutSection />
        <ResumeSection />
        <PortfolioSection projects={projects} />
      </main>
      <Footer />
    </div>
  );
}
