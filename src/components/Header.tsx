export default function Header() {
  return (
    <header id="header" className="header dark-background d-flex flex-column">
      <i className="header-toggle d-xl-none bi bi-list"></i>

      <div className="profile-img">
        <img src="/assets/img/profile1.jpg" alt="" className="img-fluid rounded-circle" />
      </div>

      <a href="/" className="logo d-flex align-items-center justify-content-center">
        <h1 className="sitename">Ashraful Islam</h1>
      </a>

      <div className="social-links text-center">
        <a href="https://github.com/ash1910" className="twitter"><i className="bi bi-github"></i></a>
        <a href="https://www.facebook.com/Masum7" className="facebook"><i className="bi bi-facebook"></i></a>
        <a href="https://www.linkedin.com/in/ashraful-masum-56942425/" className="linkedin"><i className="bi bi-linkedin"></i></a>
      </div>

      <nav id="navmenu" className="navmenu">
        <ul>
          <li><a href="/#about"><i className="bi bi-person navicon"></i> About</a></li>
          <li><a href="/#resume"><i className="bi bi-file-earmark-text navicon"></i> Resume</a></li>
          <li><a href="/#portfolio"><i className="bi bi-images navicon"></i> Portfolio</a></li>
        </ul>
      </nav>
    </header>
  );
}
