import type { ResumeSettings } from '@/lib/settings';

type Props = { settings: ResumeSettings };

export default function ResumeSection({ settings }: Props) {
  const {
    sectionTitle,
    summaryName,
    summaryDescription,
    summaryContactInfo,
    education,
    experience,
  } = settings;

  return (
    <section id="resume" className="resume section">
      <div className="container section-title" data-aos="fade-up">
        <h2>{sectionTitle || 'Resume'}</h2>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
            <h3 className="resume-title">Sumary</h3>

            {(summaryName || summaryDescription || summaryContactInfo.length > 0) ? (
              <div className="resume-item pb-0">
                {summaryName ? <h4>{summaryName}</h4> : null}
                {summaryDescription ? (
                  <p><em>{summaryDescription}</em></p>
                ) : null}
                {summaryContactInfo.length > 0 ? (
                  <ul>
                    {summaryContactInfo.map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ) : null}

            {education.length > 0 ? (
              <>
                <h3 className="resume-title">Education</h3>
                {education.map((item, i) => (
                  <div key={i} className="resume-item">
                    <h4>{item.title}</h4>
                    {item.year ? <h5>{item.year}</h5> : null}
                    {item.institution ? <p><em>{item.institution}</em></p> : null}
                    {item.description ? <p>{item.description}</p> : null}
                  </div>
                ))}
              </>
            ) : null}
          </div>

          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="200">
            {experience.length > 0 ? (
              <>
                <h3 className="resume-title">Professional Experience</h3>
                {experience.map((item, i) => (
                  <div key={i} className="resume-item">
                    <h4>{item.title}</h4>
                    {item.dates ? <h5>{item.dates}</h5> : null}
                    {item.company ? <p><em>{item.company}</em></p> : null}
                    {item.bullets.length > 0 ? (
                      <ul>
                        {item.bullets.map((bullet, j) => (
                          <li key={j}>{bullet}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
