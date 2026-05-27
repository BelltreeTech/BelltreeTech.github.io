import { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { radarData } from "../data/portfolioData";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

export default function RadarChart() {
  const chartRef = useRef(null);

  const data = {
    labels: radarData.labels,
    datasets: [
      {
        label: "Skill Level",
        data: radarData.values,
        backgroundColor: "rgba(0, 229, 255, 0.12)",
        borderColor: "rgba(0, 229, 255, 0.7)",
        borderWidth: 2,
        pointBackgroundColor: "#00e5ff",
        pointBorderColor: "#00e5ff",
        pointHoverBackgroundColor: "#00ffaa",
        pointHoverBorderColor: "#00ffaa",
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
          display: false,
        },
        grid: {
          color: "rgba(255, 255, 255, 0.06)",
          circular: true,
        },
        angleLines: {
          color: "rgba(255, 255, 255, 0.06)",
        },
        pointLabels: {
          color: "#8888a0",
          font: {
            family: "'JetBrains Mono Variable', monospace",
            size: 11,
            weight: "500",
          },
        },
      },
    },
    plugins: {
      tooltip: {
        backgroundColor: "rgba(6, 6, 8, 0.9)",
        titleColor: "#00e5ff",
        bodyColor: "#e8e8ef",
        borderColor: "rgba(0, 229, 255, 0.2)",
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        titleFont: {
          family: "'JetBrains Mono Variable', monospace",
          size: 12,
        },
        bodyFont: {
          family: "'Inter Variable', sans-serif",
          size: 13,
        },
        callbacks: {
          label: (ctx) => `  ${ctx.raw}%`,
        },
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Radar ref={chartRef} data={data} options={options} />
    </div>
  );
}
