import "../styles/navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <span className="navbar-logo">MLDC</span>
      <div className="navbar-links">
        <a href="#projects">Work</a>
        <a href="#community">Community</a>
        <a
          href="mailto:mark.limedelacruz07@gmail.com"
          className="navbar-contact"
        >
          Contact
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
    </nav>
  );
}
