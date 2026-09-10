import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import rose from '../assets/blue-rose.webp';
import { createPredictiveArcRenderer } from '../lib/predictiveArc';

export default function RoseScene() {
  const canvasRef = useRef(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const canvas = canvasRef.current;
    let renderer;
    try { renderer = createPredictiveArcRenderer(canvas); } catch { return; }
    if (!renderer) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false, frame = 0, last = 0;
    const stop = () => { cancelAnimationFrame(frame); frame = 0; last = 0; canvas.dataset.motion = 'static'; };
    const tick = (now) => {
      if (now - last >= 1000 / 30) {
        renderer.render(last ? now - last : 0);
        last = now;
      }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      stop();
      renderer.render();
      if (!paused && !reduced.matches && visible && !document.hidden) {
        canvas.dataset.motion = 'running';
        frame = requestAnimationFrame(tick);
      }
    };
    const resize = new ResizeObserver(([entry]) => {
      renderer.resize(entry.contentRect.width, entry.contentRect.height);
      renderer.render();
    });
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    resize.observe(canvas);
    intersection.observe(canvas);
    reduced.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    return () => {
      stop(); resize.disconnect(); intersection.disconnect();
      reduced.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
    };
  }, [paused]);
  return (
    <div className="rose-scene">
      <canvas ref={canvasRef} aria-hidden="true" data-motion="static" />
      <img src={rose} width="600" height="600" alt="" className="blue-rose" fetchPriority="high" />
      <button className="motion-toggle" type="button" aria-label={paused ? '粒子の動きを再開' : '粒子の動きを停止'} aria-pressed={paused} onClick={() => setPaused(value => !value)}>
        {paused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}<span>動き{paused ? 'を再開' : 'を停止'}</span>
      </button>
    </div>
  );
}
