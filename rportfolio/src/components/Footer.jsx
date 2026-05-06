import "../styles/footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-left">
        <span className="footer-logo">MLDC</span>
        <span className="footer-copy">© {year} Mark Lime Dela Cruz</span>
      </div>
      <div className="footer-right">
        <a href="mailto:mark.limedelacruz07@gmail.com" className="footer-link">
          Email ↗
        </a>
        <a
          href="https://github.com/maki-rollsushi"
          target="_blank"
          rel="noreferrer"
          className="footer-link"
        >
          GitHub ↗
        </a>
      </div>
    </footer>
  );
}
