import React, { useState, useEffect } from 'react';
import { fetchSensorData } from '../hooks/useSensorData';
import { ResponsiveLine } from '@nivo/line';

const HistoricTrendPlot = ({ assetId }) => {
  const [historicData, setHistoricData] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHistoricData = async () => {
      try {
        setLoading(true);
        const data = await fetchSensorData(assetId, selectedDate);
        setHistoricData(data);
      } catch (error) {
        console.error('Error fetching historic sensor data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedDate) {
      loadHistoricData();
    }
  }, [assetId, selectedDate]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div className="historic-trend-plot-container">
      <div className="date-selector">
        <label htmlFor="historic-date">Select Date:</label>
        <input
          type="date"
          id="historic-date"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>
      {loading ? (
        <p>Loading historic data...</p>
      ) : (
        <div className="historic-chart">
          <ResponsiveLine
            data={historicData}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: 'bottom',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Time',
              legendOffset: 36,
              legendPosition: 'middle'
            }}
            axisLeft={{
              orient: 'left',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Temperature',
              legendOffset: -40,
              legendPosition: 'middle'
            }}
            colors={{ scheme: 'nivo' }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabel="y"
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemBackground: 'rgba(0, 0, 0, .03)',
                      itemOpacity: 1
                    }
                  }
                ]
              }
            ]}
          />
        </div>
      )}
    </div>
  );
};

export default HistoricTrendPlot;