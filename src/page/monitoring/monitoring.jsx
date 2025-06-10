import React, { useState, useEffect, useRef } from "react";
import { Line, Bar } from "react-chartjs-2";
import { useLoading } from "../../components/loading/loadingContext";
import { useSensorContext } from "../../context/SensorContext";
import { Input } from "@/components/ui/input"; // Assuming you're using ShadCN UI Input
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Assuming you're using ShadCN UI Select
import moment from "moment";
import SensorDataTable from "@/components/table/table";

// Import necessary components from chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required components in Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Grafik = () => {
  const { setIsLoading } = useLoading();
  const { sensorData } = useSensorContext();

  const [selectedSensor, setSelectedSensor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedGraph, setSelectedGraph] = useState("Line"); // State to hold selected graph type (Line or Bar)

  const chartRef = useRef(null); // Reference to store chart instance

  // Handle sensor selection
  const handleSensorChange = (value) => {
    setSelectedSensor(value);
  };

  // Handle date selection
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  // Handle graph type selection (Line or Bar)
  const handleGraphChange = (value) => {
    setSelectedGraph(value);
  };

  // Filter data based on selected sensor and date
  useEffect(() => {
    if (selectedSensor && selectedDate) {
      console.log("Filtering data for:", selectedSensor, selectedDate);

      // Filter data based on selected sensor and date
      const filtered = sensorData.filter(
        (sensor) =>
          sensor.sensorId === parseInt(selectedSensor) && // Check sensorId
          moment(sensor.createdAt).format("YYYY-MM-DD") === selectedDate // Check if date matches
      );
      console.log("Filtered Data:", filtered); // Log filtered data
      setFilteredData(filtered);
    }
  }, [selectedSensor, selectedDate, sensorData]);

  // Sensor options for ShadCN UI Select
  const sensorOptions = [
    { value: "1", label: "Wind Direction" },
    { value: "2", label: "Water Level" },
    { value: "3", label: "Rainfall" },
  ];

  // Create a mapping for sensor names based on the selected sensor value
  const sensorNames = {
    1: "Wind Direction",
    2: "Water Level",
    3: "Rainfall",
  };

  // Prepare chart data
  const chartData = {
    labels: filteredData.map((data) => moment(data.createdAt).format("HH:mm")), // Extract time for labels
    datasets: [
      {
        label: "Sensor Value",
        data: filteredData.map((data) => data.value), // Extract sensor value for the chart
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  // Chart options with labels for Y-axis and X-axis
  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        // Dynamically set the title with the selected sensor name
        text: `Sensor Data for ${sensorNames[selectedSensor]} on ${selectedDate}`,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time (HH:mm)", // Label for X-axis
        },
      },
      y: {
        title: {
          display: true,
          text: "Sensor Value", // Label for Y-axis
        },
      },
    },
  };

  // Cleanup chart instance on component unmount or re-render
  useEffect(() => {
    // Destroy previous chart instance when the component is re-rendered
    if (chartRef.current) {
      const chartInstance = chartRef.current.chartInstance;
      if (chartInstance) {
        chartInstance.destroy(); // Destroy the old chart
      }
    }
  }, [selectedSensor, selectedDate]);

  return (
    <div className="w-full h-full bg-[background-color:var(--color-secondary)] overflow-y-auto">
      <div className="w-full h-full flex-col px-10 flex justify-start items-start">
        <div className="w-full h-full mb-5 overflow-y-auto px-5 bg-white">
          <h2 className="text-xl font-semibold mb-4">Select Sensor and Date</h2>

          {/* Sensor Selector using ShadCN UI Select */}
          <div className="w-full flex items-center gap-x-4">
            <Select onValueChange={handleSensorChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a Sensor" />
              </SelectTrigger>
              <SelectContent>
                {sensorOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Date Selector using ShadCN UI Input */}
            <Input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="p-2 border w-1/8 rounded-lg my-4"
            />

            {/* Graph Type Selector */}
            <Select onValueChange={handleGraphChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a Graph" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key="1" value="Bar">
                  {"Bar Graph"}
                </SelectItem>
                <SelectItem key="2" value="Line">
                  {"Line Graph"}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Display the selected graph type */}
          <div className="chart-container mb-5">
            <h3 className="text-lg font-semibold mb-2">
              {selectedGraph} Chart
            </h3>
            {filteredData.length > 0 ? (
              selectedGraph === "Line" ? (
                <Line
                  ref={chartRef} // Attach the chart instance to the ref
                  data={chartData}
                  options={chartOptions}
                />
              ) : (
                <Bar
                  ref={chartRef} // Attach the chart instance to the ref
                  data={chartData}
                  options={chartOptions}
                />
              )
            ) : (
              <p>No data available for the selected sensor and date.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grafik;
