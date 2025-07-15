"use client";

import { MoreDotIcon } from "@/icons";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { dashboardCelulas } from "@/services/dashboard";

// Dynamically import the ReactApexChart component
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function FunnelChart() {
  const [series, setSieres] = useState<{name: string, data: number[]}[] | []>([])
  useEffect(() => {
    async function fetchDashboard() {
      try {
        const result = await dashboardCelulas();
        if(result) setSieres(result.data)
      } catch{
        
      }
    }

    fetchDashboard()
  },[])

  // const series = [
  //   {
  //     name: "Abiertos",
  //     data: [44, 55, 41, 67, 22, 43, 55, 41],
  //   },
  //   {
  //     name: "Reabiertos",
  //     data: [13, 23, 20, 8, 13, 27, 13, 23],
  //   },
  //   {
  //     name: "Revision",
  //     data: [11, 17, 15, 15, 21, 14, 18, 20],
  //   },
  //   {
  //     name: "Pendientes",
  //     data: [21, 7, 25, 13, 22, 8, 18, 20],
  //   },
  //   {
  //     name: "Resueltos",
  //     data: [21, 7, 25, 13, 22, 8, 18, 20],
  //   },
  //   {
  //     name: "Cerrados",
  //     data: [21, 7, 25, 13, 22, 8, 18, 20],
  //   },
  // ];
  const options: ApexOptions = {
    colors: ["#1e8449","#52be80","#f1c40f", "#f39c12", "#2471a3", "#b03a2e"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      stacked: true,
      height: 315,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "39%",
        borderRadius: 10,
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit",
      fontSize: "14px",
      fontWeight: 400,
      markers: {
        size: 5,
        shape: "circle",
        strokeWidth: 0,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 0,
      },
    },
    yaxis: {
      title: {
        text: undefined, // Hide the title by setting text to undefined
      },
    },
    grid: {
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      x: {
        show: false,
      },
      y: {
        formatter: (val: number) => val.toString(), // Simplified formatter
      },
    },
  };
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mb-6 flex justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Tickets
          </h3>
        </div>
        <div className="relative h-fit">
          <button onClick={toggleDropdown} className="dropdown-toggle">
            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
          </button>
          <Dropdown
            isOpen={isOpen}
            onClose={closeDropdown}
            className="w-40 p-2"
          >
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              View More
            </DropdownItem>
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              Delete
            </DropdownItem>
          </Dropdown>
        </div>
      </div>
      <div className="overflow-x-auto custom-scrollbar pl-2">
        <ReactApexChart
          className="-ml-5 min-w-[700px] xl:min-w-full"
          options={options}
          series={series}
          type="bar"
          height={315}
        />
      </div>
    </div>
  );
}
