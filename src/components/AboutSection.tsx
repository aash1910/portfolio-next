import type { AboutSettings } from '@/lib/settings';

type Props = { settings: AboutSettings };

export default function AboutSection({ settings }: Props) {
  const {
    sectionTitle,
    introParagraph,
    profileImage,
    fullName,
    bioParagraph,
    infoItems,
    bottomParagraph,
  } = settings;

  // Split info items into two columns for layout
  const midpoint = Math.ceil(infoItems.length / 2);
  const leftItems = infoItems.slice(0, midpoint);
  const rightItems = infoItems.slice(midpoint);

  return (
    <section id="about" className="about section">
      <div className="container section-title" data-aos="fade-up">
        <h2>{sectionTitle || 'About'}</h2>
        {introParagraph ? <p>{introParagraph}</p> : null}
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4 justify-content-center">
          <div className="col-lg-4">
            <img
              src={profileImage || '/assets/img/profile2.jpg'}
              className="img-fluid"
              alt=""
            />
          </div>
          <div className="col-lg-8 content">
            {fullName ? <h2>{fullName}</h2> : null}
            {bioParagraph ? (
              <p className="fst-italic py-3">{bioParagraph}</p>
            ) : null}
            {(leftItems.length > 0 || rightItems.length > 0) ? (
              <div className="row">
                <div className="col-lg-6">
                  <ul>
                    {leftItems.map((item, i) => (
                      <li key={i}>
                        <i className="bi bi-chevron-right"></i>{' '}
                        <strong>{item.label}:</strong> <span>{item.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-lg-6">
                  <ul>
                    {rightItems.map((item, i) => (
                      <li key={i}>
                        <i className="bi bi-chevron-right"></i>{' '}
                        <strong>{item.label}:</strong> <span>{item.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}
            {bottomParagraph ? <p className="py-3">{bottomParagraph}</p> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
