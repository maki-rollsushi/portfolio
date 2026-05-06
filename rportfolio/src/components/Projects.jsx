import { useState, useEffect, useRef } from "react";
import "../styles/projects.css";

const GITHUB_USERNAME = "maki-rollsushi";

// Add repo names here to hide them from the grid
const EXCLUDE = [GITHUB_USERNAME, "portfolio"];

export default function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  // GitHub API — no auth needed for public repos (60 req/hr per IP)
  // Each repo has: name, description, language, stargazers_count,
  // forks_count, html_url, homepage, updated_at, topics[], fork
  useEffect(() => {
    fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`,
    )
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub API error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const filtered = data.filter(
          (repo) => !repo.fork && !repo.private && !EXCLUDE.includes(repo.name),
        );
        setRepos(filtered);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const SHOW_INITIAL = 4;
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
          [...Array(4)].map((_, i) => (
            <div
              className="project-card skeleton"
              key={i}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="sk-line short" />
              <div className="sk-line" />
              <div className="sk-line long" />
              <div className="sk-line short" />
            </div>
          ))}

        {error && (
          <div className="project-card error-card">
            <span>Could not load repositories — check your connection.</span>
          </div>
        )}

        {!loading &&
          !error &&
          visible.map((repo, i) => (
            <div
              className="project-card"
              key={repo.id}
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              <div className="project-card-top">
                <span className="project-lang">{repo.language || "—"}</span>
                <span className="project-tag">Public</span>
              </div>
              <h3 className="project-name">{repo.name}</h3>
              <p className="project-desc">
                {repo.description || "No description yet."}
              </p>
              {repo.topics?.length > 0 && (
                <div className="project-topics">
                  {repo.topics.slice(0, 3).map((t) => (
                    <span key={t} className="project-topic">
                      {t}
                    </span>
                  ))}
                </div>
              )}
              <div className="project-meta">
                <span>★ {repo.stargazers_count}</span>
                <span>⑂ {repo.forks_count}</span>
                <span>
                  {new Date(repo.updated_at).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="project-links">
                <a href={repo.html_url} target="_blank" rel="noreferrer">
                  ↗ GitHub
                </a>
                {repo.homepage && (
                  <a href={repo.homepage} target="_blank" rel="noreferrer">
                    ↗ Live
                  </a>
                )}
              </div>
            </div>
          ))}
      </div>

      {!loading && !error && repos.length > SHOW_INITIAL && (
        <button className="load-more-btn" onClick={() => setShowAll((p) => !p)}>
          {showAll
            ? "↑ Show less"
            : `↓ ${repos.length - SHOW_INITIAL} more repositories`}
        </button>
      )}
    </section>
  );
}
