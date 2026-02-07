export default function AboutSection() {
  return (
    <section id="about" className="about section">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>About</h2>
        <p>With 14 years of experience as a full-stack web application developer, I specialize in PHP, MySQL, PostgreSQL, Web APIs, and modern frameworks like Laravel, Vue.js, React, and Next.js. My expertise extends to JavaScript, React Native, Swift, WordPress, ExpressionEngine, and implementing MVC design patterns. Proficient in object-oriented programming, Linux CLI commands, and version control with GIT, I bring a comprehensive approach to building scalable and efficient web solutions.</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4 justify-content-center">
          <div className="col-lg-4">
            <img src="/assets/img/profile2.jpg" className="img-fluid" alt="" />
          </div>
          <div className="col-lg-8 content">
            <h2>Full Stack Web Developer</h2>
            <p className="fst-italic py-3">
              I thrive in fast-paced, results-driven environments, consistently delivering projects within tight deadlines. While I am capable of working independently, I genuinely enjoy collaborating as part of a team. I have also mentored junior developers, helping them accelerate their growth and achieve their potential. Known for being a quick learner, approachable, and focused on achieving results, I bring a positive and driven attitude to every project.
            </p>
            <div className="row">
              <div className="col-lg-6">
                <ul>
                  <li><i className="bi bi-chevron-right"></i> <strong>Birthday:</strong> <span>19 Oct 1988</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Website:</strong> <span>https://equation.wmd-hosting.com/</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Phone:</strong> <span>+880171 250 1289</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>City:</strong> <span>Dhaka, Bangladesh</span></li>
                </ul>
              </div>
              <div className="col-lg-6">
                <ul>
                  <li><i className="bi bi-chevron-right"></i> <strong>Age:</strong> <span>36</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Degree:</strong> <span>Bachelor in CSE</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Email:</strong> <span>ashraful1910@gmail.com</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Status:</strong> <span>Available</span></li>
                </ul>
              </div>
            </div>
            <p className="py-3">
              I specialize in web and mobile application development, data migration, and business intelligence, using technologies like Laravel, React, MySQL, and REST APIs. With expertise in performance optimization, API integration, advanced PHP, and process modeling, I've contributed to scalable public-facing applications and enterprise solutions, ensuring efficiency and seamless functionality throughout projects.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
