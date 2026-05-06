import { useRef, useState, useEffect } from "react";
import "../styles/community.css";
import devcon from "../assets/devcon.jpg";
import access from "../assets/access.jpg";

// ─── Add your community roles here ───────────────────────────────────────────
// `photo` can be a local import, relative asset path, or URL.
// Leave as null to show a placeholder initial instead.
const ROLES = [
  {
    org: "DEVCON Legazpi",
    role: "Vice President for Trainings",
    period: "2026 — Present",
    desc: "Trained and mentored 60+ DEVCON Legazpi volunteers to build technical and operational capabilities. Coordinated and facilitated community-focused tech events, ranging from interactive workshops to large-scale webinars.",
    photo: devcon,
  },
  {
    org: "BU Academic Consortium of Computer Science Students",
    role: "Year Representative",
    period: "2025 — 2026",
    desc: "Oversaw academic and organizational activities for 400+ Computer Science students Led information dissemination efforts across digital and on-campus channels. Initiated and coordinated upskilling programs, workshops, webinars, and tech talks. Established partnerships with external organizations, including KadaKareer, Globe Telecom and DEVCON Legazpi.",
    photo: access,
  },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function Community() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="community-section" id="community" ref={ref}>
      <div className="section-header">
        <span className="section-num">02</span>
        <span className="section-title">
          <span className="accent-line" />
          Community
        </span>
      </div>

      <div className={`community-list ${inView ? "in-view" : ""}`}>
        {ROLES.map((item, i) => (
          <div
            className="community-item"
            key={item.org}
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <div className="community-photo-wrap">
              {item.photo ? (
                <img
                  src={item.photo}
                  alt={item.org}
                  className="community-photo"
                />
              ) : (
                <span className="community-photo-initial">
                  {item.org.charAt(0)}
                </span>
              )}
            </div>

            <div className="community-body">
              <div className="community-meta-row">
                <span className="community-role">{item.role}</span>
                <span className="community-period">{item.period}</span>
              </div>
              <div className="community-org">{item.org}</div>
              <p className="community-desc">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
