import { useRef, useState, useEffect } from "react";
import "../styles/community.css";

const ROLES = [
  {
    org: "Google Developer Groups",
    role: "Core Team Member",
    period: "2024 — Present",
    desc: "Organize developer events, workshops, and study jams for the local tech community. Help onboard and mentor new members.",
  },
  {
    org: "GDSC Bicol University",
    role: "Lead Facilitator",
    period: "2023 — 2024",
    desc: "Led study sessions on web development and mobile fundamentals. Facilitated hands-on workshops reaching 400+ students.",
  },
  {
    org: "University CS Society",
    role: "Technical Officer",
    period: "2023 — Present",
    desc: "Coordinate technical competitions and coding bootcamps. Mentored 60+ volunteers on event and project management.",
  },
];

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
            <div className="community-left">
              <span className="community-period">{item.period}</span>
            </div>
            <div className="community-divider" />
            <div className="community-right">
              <div className="community-org">{item.org}</div>
              <div className="community-role">{item.role}</div>
              <p className="community-desc">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
