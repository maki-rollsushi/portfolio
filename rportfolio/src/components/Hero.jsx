import markPhoto from "../assets/mark.jpg";
import "../styles/hero.css";

const SKILLS = [
  "React",
  "React Native",
  "JavaScript",
  "Python",
  "Figma",
  "C/C++",
  "HTML/CSS",
  "Java",
];

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-left">
        <div className="hero-label">Portfolio — 2025</div>
        <div className="hero-badge">✦ DOST-SEI Merit Scholar</div>
        <h1 className="hero-name">
          Mark
          <br />
          Lime
          <br />
          Dela Cruz
        </h1>
        <div className="hero-sub">
          BSCS · Bicol University · 3rd Year
          <br />
          <a href="mailto:mark.limedelacruz07@gmail.com">
            mark.limedelacruz07@gmail.com
          </a>
        </div>
        <div className="hero-cta-row">
          <a href="#projects" className="hero-cta">
            View Work ↓
          </a>
          <a
            href="https://github.com/maki-rollsushi"
            target="_blank"
            rel="noreferrer"
            className="hero-cta ghost"
          >
            GitHub ↗
          </a>
        </div>
      </div>

      <div className="hero-right">
        <div className="hero-photo-wrap">
          <img
            src={markPhoto}
            alt="Mark Lime Dela Cruz"
            className="hero-photo"
          />
        </div>
        <p className="hero-bio">
          CS student building things at the intersection of software and ideas.
          I code with React, design in Figma, and play piano when I need to
          think.
        </p>
        <div className="hero-skills">
          {SKILLS.map((skill, i) => (
            <span
              key={skill}
              className="hero-skill"
              style={{ animationDelay: `${0.4 + i * 0.05}s` }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
