import { useState, useEffect, useRef } from "react";

export default function TypeWriter({ text, speed = 40, delay = 500, className = "" }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const idx = useRef(0);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (idx.current >= text.length) {
      setDone(true);
      return;
    }
    const timer = setTimeout(() => {
      setDisplayed((prev) => prev + text[idx.current]);
      idx.current += 1;
    }, speed);
    return () => clearTimeout(timer);
  }, [started, displayed, text, speed]);

  return (
    <span className={className}>
      {displayed}
      <span
        className={`inline-block w-[2px] h-[1em] ml-0.5 align-text-bottom ${
          done ? "animate-pulse" : "animate-[blink_0.7s_steps(1)_infinite]"
        }`}
        style={{
          background: "linear-gradient(to bottom, #00e5ff, #00ffaa)",
        }}
      />
    </span>
  );
}
