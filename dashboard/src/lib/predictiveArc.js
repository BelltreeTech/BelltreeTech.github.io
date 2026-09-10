// Adapted from Three UI Predictive Arc, copyright (c) 2026 MengTo, MIT.
// Source revision: 68802d5428071ada5c20db8094b1649e6bb770ed.
// See public/third-party-licenses.txt. Sparse blue palette and elapsed-time motion.
export function createPredictiveArcRenderer(canvas) {
  const context = canvas.getContext('2d');
  if (!context) return null;
  let width = 1, height = 1, time = 0;
  function resize(w, h) {
    width = Math.max(1, w); height = Math.max(1, h);
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }
  function render(delta = 0) {
    time += Math.min(delta, 100) * 0.00035;
    context.clearRect(0, 0, width, height);
    for (let x = 0; x < width; x += 14) {
      const normX = (x - width / 2) / (width * 0.75);
      const curveY = height * 0.35 + normX * normX * height * 0.7;
      for (let y = 0; y < height; y += 14) {
        const distance = Math.abs(y - curveY);
        const thickness = (140 + (1 - Math.abs(normX)) * 80) * 0.25;
        if (distance >= thickness) continue;
        let intensity = 1 - distance / thickness;
        intensity *= 0.7 + Math.sin(x * 0.015 + time) * Math.cos(y * 0.02 + time) * 0.3;
        intensity *= Math.max(0, 1 - Math.pow(Math.abs(normX), 2.5));
        context.fillStyle = `rgba(22,116,201,${intensity * 0.3})`;
        context.fillRect(x, y, 1.6 * intensity, 1.6 * intensity);
      }
    }
  }
  return { resize, render };
}
