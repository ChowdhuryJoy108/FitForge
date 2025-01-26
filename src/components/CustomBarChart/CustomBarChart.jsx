import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const CustomBarChart = ({ data }) => {
  return (
    <div className="my-8">
      <h2 className="text-xl font-bold text-center mb-4">
        Overview of Admin Dashboard Metrics
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="value"
            fill="#82ca9d"
            shape={(props) => {
              const { x, y, width, height, fill } = props;
              return (
                <path
                  d={`M${x},${y + height} L${x + width},${y + height} L${x + width / 2},${y} Z`}
                  stroke="none"
                  fill={fill}
                />
              );
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
