import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
}
  from 'recharts';
import { ICar } from '../../types/ICar';

interface CarGraphProps {
  data:ICar[];
}

const CarGraph = ({ data }:CarGraphProps) => {
  const [graphData, setGraphData] = useState([]);

  const countChartParams = () => {
    let count1 = 0;
    let count2 = 0;
    let count3 = 0;
    let count4 = 0;
    let count5 = 0;
    let liked1 = 0;
    let liked2 = 0;
    let liked3 = 0;
    let liked4 = 0;
    let liked5 = 0;

    for (let i = 0; i < data.length; i++) {
      if (data[i].price < 2000) {
        count1++;
        if (data[i].liked) liked1++;
      }
      if (data[i].price < 4000 && data[i].price > 2000) {
        count2++;
        if (data[i].liked) liked2++;
      }
      if (data[i].price < 6000 && data[i].price > 4000) {
        count3++;
        if (data[i].liked) liked3++;
      }
      if (data[i].price < 8000 && data[i].price > 6000) {
        count4++;
        if (data[i].liked) liked4++;
      }
      if (data[i].price > 8000) {
        count5++;
        if (data[i].liked) liked5++;
      }
    }
    setGraphData([
      { name: '0-2000$', 'количество машин': count1, 'количество понравившихся машин': liked1 },
      { name: '2000$-4000$', 'количество машин': count2, 'количество понравившихся машин': liked2 },
      { name: '4000$-6000$', 'количество машин': count3, 'количество понравившихся машин': liked3 },
      { name: '6000$-8000$', 'количество машин': count4, 'количество понравившихся машин': liked4 },
      { name: '8000$-10000$', 'количество машин': count5, 'количество понравившихся машин': liked5 },
    ]);
  };

  useEffect(() => {
    countChartParams();
  }, [data]);

  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <BarChart
          data={graphData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="количество машин" fill="#546e7a" />
          <Bar dataKey="количество понравившихся машин" fill="#b71c1c" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CarGraph;
