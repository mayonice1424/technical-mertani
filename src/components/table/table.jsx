import React, { useState } from "react";
import { FaSearch } from "react-icons/fa"; // Importing the search icon from react-icons
import DataTable from "react-data-table-component";
import { useSensorContext } from "../../context/SensorContext";
import moment from "moment";

const SensorDataTable = () => {
  const { sensorData } = useSensorContext();
  const [searchTerm, setSearchTerm] = useState(""); // State to store search input

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter sensor data based on search term
  const filteredData = sensorData.filter((sensor) => {
    const sensorNames = {
      1: "Wind Direction",
      2: "Water Level",
      3: "Rainfall",
    };
    const sensorName = sensorNames[sensor.sensorId] || "Unknown Sensor";
    return sensorName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const columns = [
    {
      name: "Sensor Name",
      selector: (row) => row.sensorId,
      sortable: true,
      cell: (row) => {
        const sensorNames = {
          1: "Wind Direction",
          2: "Water Level",
          3: "Rainfall",
        };
        return sensorNames[row.sensorId] || "Unknown Sensor";
      },
    },
    {
      name: "Value",
      selector: (row) => row.value,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Last Updated",
      selector: (row) => moment(row.createdAt).utcOffset(14).format("llll"),
      sortable: true,
    },
  ];

  return (
    <div>
      <div className="flex justify-end mb-4">
        <div className="relative w-50 m-5  ">
          {" "}
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search by Sensor Name..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        responsive
      />
    </div>
  );
};

export default SensorDataTable;
