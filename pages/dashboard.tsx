import { useState } from "react";
import dynamic from "next/dynamic";
import { promises as fs } from "fs";
import { TabItem, Tabs, Card } from "flowbite-react";

const ApexCharts = dynamic(() => import("react-apexcharts"), {
  ssr: false, // Ensure ApexCharts is not imported during SSR
});

export default function Dashboard({
  years,
  traffic,
}: {
  years: number[];
  traffic: number[];
}) {
  const [trafficPerYear] = useState({
    options: {
      chart: {
        id: "traffic-chart",
      },
      xaxis: {
        categories: years,
      },
    },
    series: [
      {
        name: "traffic",
        data: traffic,
      },
    ],
  });

  const [state] = useState({
    series: traffic,
    options: {
      labels: years.map((e: number) => e.toString()),
    },
  });
  return (
    <>
      <h1 className="text-5xl font-extrabold dark:text-white text-center p-5 m-5">
        Welcome to Dashboard
      </h1>
      <Tabs aria-label="Default tabs" variant="fullWidth">
        <TabItem active title="Line Chart">
          <Card href="#" className="max-w">
            <ApexCharts
              options={trafficPerYear.options}
              series={trafficPerYear.series}
              type="line"
              height={350}
              width={"100%"}
            />
          </Card>
        </TabItem>
        <TabItem title="Bar Chart">
          <Card href="#" className="max-w">
            <ApexCharts
              options={trafficPerYear.options}
              series={trafficPerYear.series}
              type="bar"
              height={350}
              width={"100%"}
            />
          </Card>
        </TabItem>
        <TabItem title="Pie Chart">
          <Card href="#" className="max-w">
            <ApexCharts
              options={state.options}
              series={state.series}
              type="pie"
              height={350}
              width={"100%"}
            />
          </Card>
        </TabItem>
      </Tabs>
    </>
  );
}

export async function getServerSideProps() {
  interface Row {
    Year: number;
    Month: string;
    Day: number;
    Weekday: string;
    Traffic: number;
    Orders: number;
    Sales: number;
  }
  const data: string = await fs.readFile(process.cwd() + "/data.json", "utf8");
  const json: Row[] = Object.values(JSON.parse(data));

  // Collect unique years
  const years_set = new Set<number>();
  Object.values(json).forEach((e: Row) => {
    years_set.add(e.Year);
  });

  // Collect total traffic by year
  const traffic_per_year: { [index: number]: number } = {};
  years_set.forEach((year: number) => {
    const total_traffic: number = Number(
      json
        .filter((row: Row) => row.Year === year)
        .reduce((res: number, object: Row) => res + object.Traffic, 0),
    );
    traffic_per_year[year] = total_traffic;
  });

  const years: number[] = Array.from(years_set); // Convert to Array
  const traffic: number[] = Object.values(traffic_per_year);

  console.log(years);
  console.log(traffic);
  return { props: { years, traffic } };
}
