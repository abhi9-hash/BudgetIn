import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { parse } from "date-fns";

const DateIntegerPlot = ({ data }) => {
  console.log(data);
  const formattedData = Object.keys(data)?.map((dateStr) => {
    const parsedDate = parse(dateStr, "dd-MM-yyyy", new Date());
    return {
      date: parsedDate?.toISOString().split("T")[0],
      value: data[dateStr],
    };
  });

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        width={500}
        height={300}
        data={formattedData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DateIntegerPlot;
