/**
 * Metric display badge (number + label).
 * Replaces the metric-badge + metric-value + metric-label pattern.
 *
 * Usage: <MetricBadge icon={Cpu} value="98.5%" label="Accuracy" />
 */
export default function MetricBadge({ icon: Icon, value, label }) {
  return (
    <div className="metric-badge flex-1 min-w-[100px] gap-2 p-3 sm:p-4">
      <div className="flex items-center gap-2">
        {Icon && <Icon size={16} className="text-[var(--color-cyber-blue)]" />}
        <span className="metric-value text-3xl sm:text-4xl font-black">{value}</span>
      </div>
      <span className="metric-label text-xs">{label}</span>
    </div>
  );
}
