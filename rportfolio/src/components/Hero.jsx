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
        <div className="hero-identity">
          <div className="hero-photo-wrap">
            <img
              src={markPhoto}
              alt="Mark Lime Dela Cruz"
              className="hero-photo"
            />
          </div>
          <h1 className="hero-name">Mark L. Dela Cruz</h1>
        </div>
        <div className="hero-badge">✦ DOST-SEI Merit Scholar</div>
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
            href="/DELACRUZMark_Resume.pdf"
            download
            className="hero-cta ghost"
          >
            Resume ↓
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
        <p className="hero-bio">
          Highly motivated 3rd-Year Computer Science student and DOST-SEI Merit
          Scholar with a strong foundation in software development and front-end
          engineering. Proven ability to design and implement user-centric
          interfaces using React, React Native, Python and JavaScript. Seeking
          an internship position to leverage technical skills, UI/UX experience,
          and leadership abilities in building innovative software solutions.
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
