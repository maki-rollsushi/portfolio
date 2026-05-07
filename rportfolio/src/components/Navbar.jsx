import { useState, useEffect } from "react";
import "../styles/navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu on window resize (e.g., rotating device)
  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  const close = () => setMenuOpen(false);

  return (
    <>
      <nav className="navbar">
        <span className="navbar-logo">MLDC</span>

        {/* ── Desktop links ───────────────────────────── */}
        <div className="navbar-links">
          <a href="#projects">Work</a>
          <a href="#community">Community</a>
          <a href="#certifications">Certs</a>
          <a
            href="mailto:mark.limedelacruz07@gmail.com"
            className="navbar-contact"
          >
            Contact
          </a>
          <a
            href="https://drive.google.com/file/d/19UnuD7FqhlLFFNvE5AmR-iTz8_X9TYeJ/view?usp=sharing"
            download
            className="navbar-resume"
          >
            Resume ↓
          </a>
          <a
            href="https://github.com/maki-rollsushi"
            target="_blank"
            rel="noreferrer"
            className="navbar-gh"
          >
            ↗ GitHub
          </a>
        </div>

        {/* ── Hamburger (mobile only) ─────────────────── */}
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((p) => !p)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* ── Mobile menu panel ───────────────────────────── */}
      <div
        className={`mobile-menu ${menuOpen ? "open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <a href="#projects" onClick={close}>
          Work
        </a>
        <a href="#community" onClick={close}>
          Community
        </a>
        <a href="#certifications" onClick={close}>
          Certs
        </a>
        <a href="mailto:mark.limedelacruz07@gmail.com" onClick={close}>
          Contact
        </a>
        <a
          href="/DELACRUZMark_Resume.pdf"
          download
          onClick={close}
          className="mobile-resume"
        >
          Resume ↓
        </a>
        <a
          href="https://github.com/maki-rollsushi"
          target="_blank"
          rel="noreferrer"
          onClick={close}
          className="mobile-gh"
        >
          ↗ GitHub
        </a>
      </div>
    </>
  );
}
