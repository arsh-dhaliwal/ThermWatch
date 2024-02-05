import React, { useState, useEffect } from 'react';
import { fetchSensorData } from '../hooks/useSensorData';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-streaming';

const RealTimePlot = ({ assetId }) => {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchSensorData(assetId).then(data => {
        setSensorData(data);
      });
    }, 1000); // Fetch data every second

    return () => clearInterval(interval);
  }, [assetId]);

  const data = {
    datasets: [
      {
        label: 'Temperature',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1,
        lineTension: 0.5,
        data: sensorData.map(sd => ({ x: sd.timestamp, y: sd.temperature })),
      },
    ],
  };

  const options = {
    scales: {
      xAxes: [
        {
          type: 'realtime',
          realtime: {
            delay: 2000,
            refresh: 1000,
            onRefresh: function(chart) {
              chart.data.datasets.forEach(dataset => {
                dataset.data.push({
                  x: Date.now(),
                  y: Math.random() * 100, // Replace with actual sensor data
                });
              });
            },
          },
        },
      ],
      yAxes: [
        {
          type: 'linear',
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Temperature (°C)', // or 'Temperature (°F)' based on user preference
          },
        },
      ],
    },
    plugins: {
      streaming: {
        frameRate: 30, // Smoothness of the animation
      },
    },
  };

  return (
    <div className="realTimePlotContainer">
      <h2>Real-Time Temperature Plot</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default RealTimePlot;