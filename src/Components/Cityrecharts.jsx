import React, { useState, useEffect } from 'react';
import './CityRecharts.style.css';
import { ToolTipStyle } from './Rechart.Style';
import { useParams, useHistory } from 'react-router-dom';
import {
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Area,
  Line,
} from 'recharts';

function Cityrecharts() {
  const history = useHistory();
  const backBtn = () => history.goBack();

  const { cityId } = useParams();
  const [recharts, setRecharts] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [hasError, setError] = useState(false);

  const API_KEY = process.env.REACT_APP_API_KEY;

  const getRecharts = () => {
    setLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${API_KEY}&units=metric`,
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        setRecharts(data);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
      });
  };

  useEffect(getRecharts, []);

  if (isLoading) return <p>Loading ...</p>;
  if (hasError) return <p>Something went Wrong</p>;

  return (
    <div className="pageContainer">
      <div className="WeatherDetails">
        <ResponsiveContainer width="100%">
          <ComposedChart data={recharts.list} fontSize={14}>
            <defs>
              <linearGradient id="temp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1B1464" />
                <stop offset="100%" stopColor="#9980FA22" />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="dt_txt" tickLine={false} scale="point" />
            <YAxis
              yAxisId="Temperature"
              unit="℃"
              orientation="left"
              width={35}
              axisLine={false}
              tickLine={false}
              domain={['auto', 'auto']}
            />
            <YAxis
              yAxisId="Max-Min"
              unit="℃"
              orientation="right"
              width={35}
              axisLine={false}
              tickLine={false}
              domain={['auto', 'auto']}
            />
            <Tooltip contentStyle={ToolTipStyle} cursor={false} />
            <Area
              yAxisId="Temperature"
              type="monotone"
              dataKey="main.temp"
              name="Temperature"
              stroke="#0652DD"
              fill="url(#temp)"
              unit="℃"
            />
            <Line
              yAxisId="Max-Min"
              dataKey="main.temp_max"
              name="Max-Temperature"
              type="basis"
              stroke="#EA2027"
            />
            <Line
              yAxisId="Max-Min"
              dataKey="main.temp_min"
              name="Min-Temperature"
              type="basis"
              stroke="#F79F1F"
            />
            <Legend color="white" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <button className="backBtn" onClick={backBtn}>
        Back
      </button>
    </div>
  );
}

export default Cityrecharts;
