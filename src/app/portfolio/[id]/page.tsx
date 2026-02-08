import { getProjectById } from '@/lib/portfolio';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="portfolio-details-page">
      <Header />
      <main className="main">
        {/* Page Title */}
        <div className="page-title dark-background">
          <div className="container d-lg-flex justify-content-between align-items-center">
            <h1 className="mb-2 mb-lg-0">Portfolio Details</h1>
            <nav className="breadcrumbs">
              <ol>
                <li><a href="/">Home</a></li>
                <li className="current">Portfolio Details</li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Portfolio Details Section */}
        <section id="portfolio-details" className="portfolio-details section">
          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="row gy-4">
              <div className="col-lg-8">
                <div className="portfolio-details-slider swiper init-swiper">
                  <script
                    type="application/json"
                    className="swiper-config"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify({
                        loop: true,
                        speed: 600,
                        autoplay: {
                          delay: 5000,
                        },
                        slidesPerView: 'auto',
                        pagination: {
                          el: '.swiper-pagination',
                          type: 'bullets',
                          clickable: true,
                        },
                      }),
                    }}
                  />

                  <div className="swiper-wrapper align-items-center">
                    {project.images.map((image, index) => (
                      <div key={index} className="swiper-slide">
                        <img src={image} alt={`${project.title} - ${index + 1}`} />
                      </div>
                    ))}
                  </div>
                  <div className="swiper-pagination"></div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="portfolio-info" data-aos="fade-up" data-aos-delay="200">
                  <h3>Project information</h3>
                  <ul>
                    <li><strong>Category</strong>: {project.category}</li>
                    <li><strong>Project date</strong>: {project.projectDate}</li>
                    {project.demoUrl && (
                      <li>
                        <strong>Project Demo URL</strong>:{' '}
                        <a target="_blank" rel="noopener noreferrer" href={project.demoUrl}>
                          {project.demoUrl}
                        </a>
                        {project.demoCredentials && ` ${project.demoCredentials}`}
                      </li>
                    )}
                    {project.androidAppUrl && (
                      <li>
                        <strong>Android App URL</strong>:{' '}
                        <a target="_blank" rel="noopener noreferrer" href={project.androidAppUrl}>
                          {project.androidAppUrl}
                        </a>
                      </li>
                    )}
                    {project.iosAppUrl && (
                      <li>
                        <strong>IOS App URL</strong>:{' '}
                        <a target="_blank" rel="noopener noreferrer" href={project.iosAppUrl}>
                          {project.iosAppUrl}
                        </a>
                      </li>
                    )}
                    <li><strong>Tech Stack</strong>: {project.techStack}</li>
                  </ul>
                </div>

                <div className="portfolio-description" data-aos="fade-up" data-aos-delay="300">
                  <h5>Overview:</h5>
                  <p>{project.overview}</p>

                  <h5>Key Features:</h5>
                  <ul>
                    {project.keyFeatures.map((feature, index) => (
                      <li key={index} dangerouslySetInnerHTML={{ __html: feature }} />
                    ))}
                  </ul>

                  {project.challenges.length > 0 && (
                    <>
                      <h5>Challenges Addressed:</h5>
                      <ul>
                        {project.challenges.map((challenge, index) => (
                          <li key={index}>{challenge}</li>
                        ))}
                      </ul>
                    </>
                  )}

                  <h5>Technical Achievements:</h5>
                  <ul>
                    {project.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
