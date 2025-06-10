import React, { createContext, useState, useContext } from "react";

const SensorContext = createContext();

export const useSensorContext = () => {
  return useContext(SensorContext);
};

export const SensorProvider = ({ children }) => {
  const [sensorData, setSensorData] = useState([]);

  const addSensorData = (data) => {
    setSensorData((prevData) => {
      return [...prevData, data];
    });
  };

  return (
    <SensorContext.Provider value={{ sensorData, addSensorData }}>
      {children}
    </SensorContext.Provider>
  );
};
