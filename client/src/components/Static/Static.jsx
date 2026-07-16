import { useEffect, useRef, useState } from "react";
import "./Static.css";

const counterData = [
  { id: 1, value: 291, title: "Best Dishes" },
  { id: 2, value: 710, title: "Awards Won" },
  { id: 3, value: 163, title: "Chefs" },
  { id: 4, value: 212, title: "Daily Customers" },
];

function Static() {
  const sectionRef = useRef(null);
  const [counts, setCounts] = useState(counterData.map(() => 0));
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    counterData.forEach((item, index) => {
      let start = 0;
      const end = item.value;
      const increment = Math.ceil(end / 60);

      const timer = setInterval(() => {
        start += increment;

        if (start >= end) {
          start = end;
          clearInterval(timer);
        }

        setCounts((prev) => {
          const updated = [...prev];
          updated[index] = start;
          return updated;
        });
      }, 25);
    });
  }, [started]);

  return (
    <section id="static_counter" ref={sectionRef}>
      <div className="container">
        <div className="counters">
          {counterData.map((item, index) => (
            <div className="counter" key={item.id}>
              <div className="num">{counts[index]}</div>
              <h2>{item.title}</h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Static;