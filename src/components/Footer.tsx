'use client';

import { useEffect } from 'react';

export default function Footer() {
  useEffect(() => {
    // Load all vendor scripts
    const scripts = [
      '/assets/vendor/bootstrap/js/bootstrap.bundle.min.js',
      '/assets/vendor/php-email-form/validate.js',
      '/assets/vendor/aos/aos.js',
      '/assets/vendor/typed.js/typed.umd.js',
      '/assets/vendor/purecounter/purecounter_vanilla.js',
      '/assets/vendor/waypoints/noframework.waypoints.js',
      '/assets/vendor/glightbox/js/glightbox.min.js',
      '/assets/vendor/imagesloaded/imagesloaded.pkgd.min.js',
      '/assets/vendor/isotope-layout/isotope.pkgd.min.js',
      '/assets/vendor/swiper/swiper-bundle.min.js',
      '/assets/js/main.js',
    ];

    const loadedScripts: HTMLScriptElement[] = [];

    scripts.forEach((src) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = false;
      document.body.appendChild(script);
      loadedScripts.push(script);
    });

    return () => {
      loadedScripts.forEach((script) => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, []);

  return (
    <>
      <footer id="footer" className="footer position-relative light-background">
        <div className="container">
          <div className="copyright text-center">
            <p>© <span>Copyright</span> <strong className="px-1 sitename">Portfolio</strong> <span>All Rights Reserved</span></p>
          </div>
        </div>
      </footer>

      {/* Scroll Top */}
      <a href="#" id="scroll-top" className="scroll-top d-flex align-items-center justify-content-center">
        <i className="bi bi-arrow-up-short"></i>
      </a>

      {/* Preloader */}
      <div id="preloader"></div>
    </>
  );
}
