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
import { handler } from "@/app/lib/trucks";

const Chart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Llamamos directamente a la función handler
        const req = null; // Simulamos los objetos req y res
        const res = {
          status: () => ({
            json: (data) => data, // Extraemos los datos del mock res.json
          }),
        };

        const data = await handler(req, res);

        const formattedData = data.map((item) => ({
          month: new Date(0, item.month - 1).toLocaleString("default", {
            month: "short",
          }), // Formato del mes
          trucks: item.trucks,
          users: item.users,
        }));

        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchData();
  }, []);

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
