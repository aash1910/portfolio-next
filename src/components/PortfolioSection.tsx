import { portfolioProjects } from '@/data/portfolio';

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="portfolio section light-background">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Portfolio</h2>
        <p>Welcome to my portfolio, where I showcase a collection of projects that highlight my expertise, creativity, and dedication to delivering high-quality software solutions. Each project reflects my technical skills, problem-solving abilities, and commitment to meeting client and business objectives. Explore my work to see the depth and breadth of my experience in action.</p>
      </div>

      <div className="container">
        <div className="isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">
          <ul className="portfolio-filters isotope-filters" data-aos="fade-up" data-aos-delay="100">
            <li data-filter="*" className="filter-active">All</li>
            <li data-filter=".filter-app">App</li>
            <li data-filter=".filter-product">Software</li>
            <li data-filter=".filter-website">Website</li>
          </ul>

          <div className="row gy-4 isotope-container" data-aos="fade-up" data-aos-delay="200">
            {portfolioProjects.map((project) => (
              <div key={project.id} className={`col-lg-4 col-md-6 portfolio-item isotope-item ${project.filter}`}>
                <div className="portfolio-content h-100">
                  <img src={project.thumbnail} className="img-fluid" alt={project.title} />
                  <div className="portfolio-info">
                    <h4>{project.title}</h4>
                    <p>{project.shortDescription}</p>
                    <a href={project.thumbnail} title={project.title} data-gallery="portfolio-gallery-app" className="glightbox preview-link">
                      <i className="bi bi-zoom-in"></i>
                    </a>
                    <a href={`/portfolio/${project.id}/`} title="More Details" className="details-link">
                      <i className="bi bi-link-45deg"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
