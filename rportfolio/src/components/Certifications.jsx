import { useScrollReveal } from "../hooks/useScrollReveal";
import "../styles/certifications.css";

// ─── Add or edit your certifications here ─────────────────────────────────────
const CERTS = [
  {
    title: "AI in UX for Fintech",
    issuer: "KadaKareer × HomeCredit HacKada",
    date: "December 2025",
  },
  {
    title: "Install and Configure Computer Systems",
    issuer: "TESDA — 50 hours of Training",
    date: "May 2023",
  },
  {
    title: "Setting Up Computer Networks",
    issuer: "TESDA — 30 hours of Training",
    date: "May 2023",
  },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function Certifications() {
  const [ref, visible] = useScrollReveal({ threshold: 0.1 });

  return (
    <section className="certs-section" id="certifications" ref={ref}>
      <div className={`section-header ${visible ? "header-visible" : ""}`}>
        <span className="section-num">03</span>
        <span className="section-title">
          <span className="accent-line" />
          Certifications
        </span>
      </div>

      <div className={`certs-grid ${visible ? "in-view" : ""}`}>
        {CERTS.map((cert, i) => (
          <div
            className="cert-card"
            key={cert.title}
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <span className="cert-icon">✦</span>
            <div className="cert-body">
              <span className="cert-title">{cert.title}</span>
              <span className="cert-issuer">{cert.issuer}</span>
            </div>
            <span className="cert-date">{cert.date}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
