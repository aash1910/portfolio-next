import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutSection from '@/components/AboutSection';
import ResumeSection from '@/components/ResumeSection';
import PortfolioSection from '@/components/PortfolioSection';
import { getProjects } from '@/lib/portfolio';
import { getSettings } from '@/lib/settings';

export default async function Home() {
  const [projects, settings] = await Promise.all([getProjects(), getSettings()]);
  return (
    <div className="index-page">
      <Header settings={settings.header} />
      <main className="main">
        <AboutSection settings={settings.about} />
        <ResumeSection settings={settings.resume} />
        <PortfolioSection projects={projects} />
      </main>
      <Footer />
    </div>
  );
}
