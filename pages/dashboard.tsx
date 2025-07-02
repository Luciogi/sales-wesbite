import { useState } from "react";
import dynamic from "next/dynamic";
import { promises as fs } from "fs";
import { TabItem, Tabs, Card } from "flowbite-react";

const ApexCharts = dynamic(() => import("react-apexcharts"), {
  ssr: false, // Ensure ApexCharts is not imported during SSR
});

export default function Dashboard({ years, traffic }) {
  const [trafficPerYear, setTrafficPerYear] = useState({
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

  const [state, setState] = useState({
    series: traffic,
    options: {
      labels: years,
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
  const data = await fs.readFile(process.cwd() + "/data.json", "utf8");
  const json = Object.values(JSON.parse(data));

  // Collect unique years
  let years = new Set();
  Object.values(json).map((e) => {
    years.add(e.Year);
  });

  // Collect total traffic by year
  let traffic_per_year = {};
  years.forEach((year) => {
    traffic_per_year[year] = json
      .filter((row) => row.Year === year)
      .reduce((res, value) => {
        return res + value.Traffic;
      }, 0);
  });

  years = Array.from(years); // Convert to Array
  const traffic = Object.values(traffic_per_year);

  console.log(years);
  console.log(traffic);
  return { props: { years, traffic } };
}
