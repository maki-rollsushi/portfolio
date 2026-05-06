import { useState, useEffect, useRef } from "react";
import "../styles/projects.css";
import agriTayo from "../assets/agri.png";
import ella from "../assets/ella.png";

const MY_USERNAME = "maki-rollsushi";

const INCLUDE = [
  {
    manual: true,
    name: "ELLA: English Literacy Learning App",
    description:
      "React Native mobile application designed to help young learners develop English reading and literacy skills. It features real-time speech recognition, gamified rewards, a digital library of books, and a classroom management system for teachers.",
    language: "JavaScript & Python",
    topics: ["react", "STT"],
    homepage: "https://github.com/Aexreii/ELLA-App/releases",
    url: "https://github.com/Aexreii/ELLA-App",
    photo: ella,
  },
  {
    manual: true,
    name: "agriTayo!",
    description:
      "AgriTayo is a farmer-to-buyer pre-order platform that connects farmers directly with consumers, restaurants, and institutions before the planting season begins. Buyers place advance orders and pay upfront, allowing farmers to fund their production without relying on loans. Using a simple SMS-based system, the platform remains accessible even to farmers without smartphones. By securing pre-agreed prices and guaranteed buyers, AgriTayo reduces financial risk for farmers while ensuring buyers receive fresh produce at fair and stable prices.",
    topics: ["react", "SMS Integration"],
    language: "JavaScript",
    url: "https://github.com/maki-rollsushi/agriTayo",
    photo: agriTayo,
  },
];

async function fetchRepo(owner, name) {
  const res = await fetch(`https://api.github.com/repos/${owner}/${name}`);
  if (!res.ok)
    throw new Error(`GitHub API error ${res.status} for ${owner}/${name}`);
  return res.json();
}

// Normalize a raw GitHub API repo object to the shape we render
function fromGitHub(apiRepo, photo) {
  return {
    id: String(apiRepo.id),
    name: apiRepo.name,
    description: apiRepo.description || "",
    language: apiRepo.language || null,
    topics: apiRepo.topics || [],
    stars: apiRepo.stargazers_count,
    forks: apiRepo.forks_count,
    updatedAt: apiRepo.updated_at,
    url: apiRepo.html_url,
    homepage: apiRepo.homepage || null,
    photo,
  };
}

function fromManual(entry) {
  return {
    id: entry.name,
    name: entry.name,
    description: entry.description || "",
    language: entry.language || null,
    topics: entry.topics || [],
    stars: 1,
    forks: 1,
    updatedAt: null,
    url: entry.url || null,
    homepage: entry.homepage || null,
    photo: entry.photo,
  };
}

const SHOW_INITIAL = 4;

export default function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [showAll, setShowAll] = useState(false);

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

  useEffect(() => {
    async function load() {
      const results = [];
      const errs = [];

      for (const entry of INCLUDE) {
        if (entry.manual) {
          results.push(fromManual(entry));
          continue;
        }
        const owner = entry.owner ?? MY_USERNAME;
        try {
          const data = await fetchRepo(owner, entry.name);
          results.push(fromGitHub(data, entry.photo));
        } catch (e) {
          errs.push(`${owner}/${entry.name}: ${e.message}`);
        }
      }

      setRepos(results);
      setErrors(errs);
      setLoading(false);
    }

    load();
  }, []);

  const visible = showAll ? repos : repos.slice(0, SHOW_INITIAL);

  return (
    <section className="projects-section" id="projects" ref={ref}>
      <div className="section-header">
        <span className="section-num">01</span>
        <span className="section-title">
          <span className="accent-line" />
          Projects
        </span>
      </div>

      <div className={`projects-grid ${inView ? "in-view" : ""}`}>
        {loading &&
          [...Array(Math.min(INCLUDE.length, SHOW_INITIAL))].map((_, i) => (
            <div
              className="project-card skeleton"
              key={i}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="sk-thumb" />
              <div className="sk-line short" />
              <div className="sk-line" />
              <div className="sk-line long" />
            </div>
          ))}

        {errors.length > 0 && !loading && (
          <div className="project-card error-card">
            <span>Some repos could not load: {errors.join(" · ")}</span>
          </div>
        )}

        {!loading &&
          visible.map((repo, i) => (
            <div
              className="project-card"
              key={repo.id}
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              <div className="project-card-top">
                <span className="project-lang">{repo.language || "—"}</span>
                <span className="project-tag">
                  {repo.stars === null ? "Public" : "Public"}
                </span>
              </div>

              <div className="project-name-row">
                {repo.photo && (
                  <img
                    src={repo.photo}
                    alt={repo.name}
                    className="project-logo"
                  />
                )}
                <h3 className="project-name">{repo.name}</h3>
              </div>
              <p className="project-desc">
                {repo.description || "No description yet."}
              </p>

              {repo.topics.length > 0 && (
                <div className="project-topics">
                  {repo.topics.slice(0, 3).map((t) => (
                    <span key={t} className="project-topic">
                      {t}
                    </span>
                  ))}
                </div>
              )}

              {repo.stars !== null && (
                <div className="project-meta">
                  <span>★ {repo.stars}</span>
                  <span>⑂ {repo.forks}</span>
                  {repo.updatedAt && (
                    <span>
                      {new Date(repo.updatedAt).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  )}
                </div>
              )}

              <div className="project-links">
                {repo.url && (
                  <a href={repo.url} target="_blank" rel="noreferrer">
                    ↗ GitHub
                  </a>
                )}
                {repo.homepage && (
                  <a href={repo.homepage} target="_blank" rel="noreferrer">
                    ↗ Live
                  </a>
                )}
              </div>
            </div>
          ))}
      </div>

      {!loading && repos.length > SHOW_INITIAL && (
        <button className="load-more-btn" onClick={() => setShowAll((p) => !p)}>
          {showAll
            ? "↑ Show less"
            : `↓ ${repos.length - SHOW_INITIAL} more repositories`}
        </button>
      )}
    </section>
  );
}
