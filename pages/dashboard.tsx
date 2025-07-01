"use client";
import { useState } from "react";
import dynamic from "next/dynamic";

const ApexCharts = dynamic(() => import("react-apexcharts"), {
  ssr: false, // Ensure ApexCharts is not imported during SSR
});

export default function Dashboard() {
  const [state, setState] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  });

  return (
    <>
      <h1 class="text-5xl font-extrabold dark:text-white text-center p-5 m-5">
        Welcome to Dashboard
      </h1>

      <ApexCharts
        options={state.options}
        series={state.series}
        type="area"
        height={350}
        width={700}
      />
    </>
  );
}
