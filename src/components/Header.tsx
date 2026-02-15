import type { HeaderSettings } from '@/lib/settings';

const SOCIAL_ICON_CLASS: Record<string, string> = {
  github: 'bi-github',
  facebook: 'bi-facebook',
  linkedin: 'bi-linkedin',
  twitter: 'bi-twitter-x',
  instagram: 'bi-instagram',
  youtube: 'bi-youtube',
  link: 'bi-link-45deg',
};

const NAV_ICON_CLASS: Record<string, string> = {
  person: 'bi-person',
  'file-earmark-text': 'bi-file-earmark-text',
  images: 'bi-images',
  briefcase: 'bi-briefcase',
  envelope: 'bi-envelope',
  house: 'bi-house',
};

type Props = { settings: HeaderSettings };

export default function Header({ settings }: Props) {
  const { siteName, profileImage, socialLinks, navLinks } = settings;

  return (
    <header id="header" className="header dark-background d-flex flex-column">
      <i className="header-toggle d-xl-none bi bi-list"></i>

      <div className="profile-img">
        <img src={profileImage || '/assets/img/profile1.jpg'} alt="" className="img-fluid rounded-circle" />
      </div>

      <a href="/" className="logo d-flex align-items-center justify-content-center">
        <h1 className="sitename">{siteName || 'Ashraful Islam'}</h1>
      </a>

      <div className="social-links text-center">
        {socialLinks.map((link, i) => (
          <a
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={link.icon || 'link'}
            aria-label={link.icon}
          >
            <i className={`bi ${SOCIAL_ICON_CLASS[link.icon] ?? 'bi-link-45deg'}`} aria-hidden />
          </a>
        ))}
      </div>

      <nav id="navmenu" className="navmenu">
        <ul>
          {navLinks.map((link, i) => (
            <li key={i}>
              <a href={link.href}>
                {link.icon ? (
                  <i className={`bi ${NAV_ICON_CLASS[link.icon] ?? ''} navicon`} aria-hidden />
                ) : null}
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
