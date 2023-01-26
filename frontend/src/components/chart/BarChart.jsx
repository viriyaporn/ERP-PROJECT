import { useState, useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, Legend, } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, Legend);

export default function BarChart({
  title = '',
  showTitle = true,
  legendPosition = 'top',
  labels = [],
  datasets = [],
}) {

  const chartRef = useRef();
  const [chartData, setChartData] = useState({ datasets: [], });
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartOptions({
      responsive: true,
      plugins: {
        legend: {
          position: legendPosition,
        },
        title: {
          display: showTitle,
          text: title,
          font: {
            size: 18,
            family: 'tahoma',
            weight: 'normal',
            style: 'italic',
            color: 'red',
          },
          padding: {
            top: 10,
            bottom: 15
          },
        },
      },
    });
  }, []);

  useEffect(() => {
    setChartData({
      labels,
      datasets,
    });

    chartRef.current.update?.();

  }, [labels, datasets]);

  return (
    <Bar ref={chartRef} options={chartOptions} data={chartData} />
  );
}