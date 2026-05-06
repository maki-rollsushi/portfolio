import { useState, useEffect, useRef } from "react";
import "../styles/stats.css";

const STATS = [
  { value: 14, label: "Repositories", suffix: "" },
  { value: 98, label: "Contributions", suffix: "" },
  { value: 400, label: "Students Served", suffix: "+" },
  { value: 60, label: "Volunteers Mentored", suffix: "+" },
];

function useCountUp(target, duration = 1400, shouldStart = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [shouldStart, target, duration]);

  return count;
}

function StatItem({ stat, started, index }) {
  const count = useCountUp(stat.value, 1400, started);

  return (
    <div
      className={`stat-item ${started ? "visible" : ""}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className="stat-number">
        {count}
        {stat.suffix}
      </div>
      <div className="stat-label">{stat.label}</div>
    </div>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="stats-bar" ref={ref}>
      {STATS.map((stat, i) => (
        <StatItem key={stat.label} stat={stat} started={started} index={i} />
      ))}
    </div>
  );
}
