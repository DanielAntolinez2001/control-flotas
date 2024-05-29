"use client";

import React, { useEffect, useState } from "react";
import styles from "./chart.module.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import handler from "@/app/lib/trucks";

const Chart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/path-to-your-api-endpoint"); // Correct API path
        const data = await response.json();
        setChartData(data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once after initial render

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Monthly Creations</h2>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="trucks" fill="#8884d8" name="Trucks Created" />
          <Bar dataKey="users" fill="#82ca9d" name="Users Created" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
