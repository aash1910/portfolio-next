export default function ResumeSection() {
  return (
    <section id="resume" className="resume section">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Resume</h2>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
            <h3 className="resume-title">Sumary</h3>

            <div className="resume-item pb-0">
              <h4>MD Ashraful Islam Masum</h4>
              <p><em>Innovative and results-driven Full Stack Developer with 14+ years of experience designing, developing, and optimizing user-focused web and mobile applications, from initial concept to scalable and high-performance solutions. Skilled in modern frameworks, advanced PHP, API integrations, and process modeling, with a proven track record of meeting strict deadlines and delivering excellence.</em></p>
              <ul>
                <li>43/5/A, West Matikata, Dhaka Cantonment, Dhaka</li>
                <li>+880171 250 1289</li>
                <li>ashraful1910@gmail.com</li>
              </ul>
            </div>

            <h3 className="resume-title">Education</h3>
            <div className="resume-item">
              <h4>Bachelor in Computer Science and Engineering</h4>
              <h5>Passed in 2010</h5>
              <p><em>Rajshahi University of Engineering & Technology(RUET)</em></p>
              <p>CGPA: 3.5 (4.0 Scale)</p>
            </div>

            <div className="resume-item">
              <h4>Higher Secondary Certificate</h4>
              <h5>Passed in 2005</h5>
              <p><em>B A F Shaheen College, Tejgaon, Dhaka</em></p>
              <p>CGPA: 4.90 (5.0 Scale)</p>
            </div>

            <div className="resume-item">
              <h4>Secondary School Certificate</h4>
              <h5>Passed in 2003</h5>
              <p><em>Shaheed Ramiz Uddin High School, Dhaka</em></p>
              <p>CGPA: 4.88 (5.0 Scale)</p>
            </div>
          </div>

          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="200">
            <h3 className="resume-title">Professional Experience</h3>
            <div className="resume-item">
              <h4>Senior Full Stack Software Engineer</h4>
              <h5>2025 - Present</h5>
              <p><em>Ternaryweb, Bangladesh </em></p>
              <ul>
                <li>Lead full-stack development of web and mobile applications using Laravel, React, Vue.js, and React Native, architecting scalable RESTful APIs and database schemas.</li>
                <li>Implement third-party integrations including payment gateways (Stripe, Bkash, SSLCommerz), authentication systems (OAuth2, JWT, Passport), and external APIs.</li>
                <li>Optimize system performance through code refactoring, database query optimization, and caching strategies, improving response times by up to 40%.</li>
                <li>Mentor junior developers, conduct code reviews, and establish coding standards. Deploy to AWS, Firebase, and VPS environments.</li>
              </ul>
            </div>

            <div className="resume-item">
              <h4>Senior Software Engineer</h4>
              <h5>2014 - 2024</h5>
              <p><em>WMD d.o.o, Croatia </em></p>
              <ul>
                <li>At WMD, I developed scalable web applications and APIs using Laravel, React.js, and Next.js, ensuring performance, reliability, and seamless database integration.</li>
                <li>Collaborated with cross-functional teams to deliver high-quality products and mentored junior developers through code reviews, fostering skill enhancement and adherence to software engineering best practices.</li>
                <li>Streamlined workflows, improved coding standards, and implemented emerging technologies to enhance project scalability, efficiency, and innovation, contributing to high-impact software solutions and reliable system performance.</li>
              </ul>
            </div>

            <div className="resume-item">
              <h4>Software Engineer</h4>
              <h5>2010 - 2014</h5>
              <p><em>BG Interactive LLC, Bangladesh</em></p>
              <ul>
                <li>As a Junior Software Engineer, I gained foundational experience in coding, debugging, and understanding software development lifecycle processes.</li>
                <li>Collaborated with senior developers, assisted in small tasks, and contributed to projects by writing and testing code under supervision.</li>
                <li>Enhanced technical skills by learning new programming languages, frameworks, and best practices while actively seeking opportunities for growth and improvement.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
