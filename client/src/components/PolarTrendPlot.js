import React, { useState, useEffect } from 'react';
import { Polar } from 'react-chartjs-2';
import 'chartjs-plugin-colorschemes';

const PolarTrendPlot = ({ sensorData, selectedDate }) => {
  const [polarData, setPolarData] = useState({});

  useEffect(() => {
    if (sensorData && selectedDate) {
      const data = sensorData.filter(data => data.date === selectedDate);
      const labels = data.map(d => `Sensor ${d.position}`);
      const temperatures = data.map(d => d.temperature);

      setPolarData({
        labels,
        datasets: [{
          data: temperatures,
          label: 'Temperature',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      });
    }
  }, [sensorData, selectedDate]);

  const options = {
    scale: {
      ticks: {
        beginAtZero: true,
        backdropColor: 'transparent'
      }
    },
    legend: {
      position: 'bottom'
    },
    plugins: {
      colorschemes: {
        scheme: 'brewer.Paired12'
      }
    }
  };

  return (
    <div className="polar-trend-plot">
      <h3>Polar Trend Plot</h3>
      <Polar data={polarData} options={options} />
    </div>
  );
};

export default PolarTrendPlot;