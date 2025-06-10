/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "../feeder/feeder.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FiSearch } from "react-icons/fi";
import { Switch } from "@/components/ui/switch";
import { useLoading } from "../../components/loading/loadingContext";

import ValueSensorFeeder from "@/components/valueFeeder/valueFeeder";

const Dashboard = () => {
  const { setIsLoading } = useLoading();

  const [dataGreenhouse, setDataGreenhouse] = useState([]);
  const [dataThings, setDataThings] = useState([]);

  const [dataSensor, setDataSensor] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedCluster, setSelectedCluster] = useState(null);

  const getLocation = async () => {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = {
        status: "success",
        message: "get greenhouse successful",
        data: [
          {
            id: 1,
            name: "gh1",
            description: null,
            createdAt: "2025-04-15T16:32:52.595Z",
            updatedAt: "2025-04-15T16:32:52.595Z",
            locationId: 1,
          },
        ],
        paging: {
          totalData: 1,
          totalPage: 1,
        },
      };
      setDataSensor(response.data.data);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const getGreenhouse = async () => {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const token = localStorage.getItem("token");
      const response = await ApiServices.get(
        `/greenhouses?page=0&limit=0&locationId=${
          selectedLocation?.id == null || selectedLocation?.id == undefined
            ? 0
            : selectedLocation.id
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDataGreenhouse(response.data.data);
      setSelectedCluster(null);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getThings = async () => {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = {
        status: "success",
        message: "get location successful",
        data: [
          {
            id: 3,
            name: " Sensor Rainfall",
            icon: "",
            color: null,
            createdAt: "2025-04-20T14:26:53.452Z",
            updatedAt: "2025-05-05T01:26:01.085Z",
            type: "1",
            isSeperate: false,
            greenhouseId: 1,
            Actuator: [
              {
                id: 3,
                name: "feeder3",
                createdAt: "2025-04-20T14:27:47.372Z",
                updatedAt: "2025-04-20T14:27:47.372Z",
                icon: "",
                color: "",
                isAutomation: false,
                thingsId: 3,
              },
            ],
            Sensor: [
              {
                id: 3,
                name: "Sensor Rainfall",
                icon: null,
                color: null,
                createdAt: "2025-04-20T14:27:20.992Z",
                updatedAt: "2025-05-03T16:49:12.639Z",
                thingsId: 3,
                typeSensorId: 3,
                calibration: "x",
                typeSensor: {
                  id: 3,
                  name: "mm",
                },
              },
            ],
          },
          {
            id: 3,
            name: "Water Level",
            icon: "",
            color: null,
            createdAt: "2025-04-20T14:21:56.853Z",
            updatedAt: "2025-05-05T01:25:55.706Z",
            type: "1",
            isSeperate: false,
            greenhouseId: 1,
            Actuator: [
              {
                id: 2,
                name: "feeder2",
                createdAt: "2025-04-20T14:27:42.414Z",
                updatedAt: "2025-04-20T14:27:42.414Z",
                icon: "",
                color: "",
                isAutomation: false,
                thingsId: 2,
              },
            ],
            Sensor: [
              {
                id: 2,
                name: "Water Level",
                icon: null,
                color: null,
                createdAt: "2025-04-20T14:22:54.614Z",
                updatedAt: "2025-05-03T16:47:52.500Z",
                thingsId: 2,
                typeSensorId: 3,
                calibration: "x",
                typeSensor: {
                  id: 2,
                  name: "m",
                },
              },
            ],
          },
          {
            id: 1,
            name: "Wind Direction",
            icon: "",
            color: null,
            createdAt: "2025-04-15T16:36:05.066Z",
            updatedAt: "2025-05-05T01:26:00.332Z",
            type: "1",
            isSeperate: false,
            greenhouseId: 1,
            Actuator: [
              {
                id: 1,
                name: "feeder1",
                createdAt: "2025-04-16T01:53:54.718Z",
                updatedAt: "2025-04-16T01:53:54.718Z",
                icon: "",
                color: "",
                isAutomation: false,
                thingsId: 1,
              },
            ],
            Sensor: [
              {
                id: 1,
                name: "Wind Direction",
                icon: null,
                color: null,
                createdAt: "2025-04-15T16:44:36.415Z",
                updatedAt: "2025-04-15T16:45:08.852Z",
                thingsId: 1,
                typeSensorId: 2,
                calibration: "x",
                typeSensor: {
                  id: 2,
                  name: "°",
                },
              },
            ],
          },
        ],
        paging: {
          totalData: 5,
          totalPage: 1,
        },
      };
      setDataThings(response.data);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedLocation) {
      setDataGreenhouse([]);
      getGreenhouse();
    }
  }, [selectedLocation]);

  useEffect(() => {
    getThings();
  }, [selectedCluster, search]);

  useEffect(() => {
    getLocation();
  }, []);

  const handleLocationChange = (value) => {
    const selected = dataLocation.find((item) => item.id === value);
    setSelectedLocation(selected);
  };

  const handleClusterChange = (value) => {
    setSelectedCluster(value);
  };

  const handleSearch = (value) => {
    console.log("Search value:", value);
    setSearch(value);
  };

  return (
    <div className="w-full h-full bg-[background-color:var(--color-secondary)] overflow-y-auto">
      <div className="w-full h-full flex-col px-10 flex justify-start items-start">
        <div className="w-full h-full mb-5 overflow-y-auto bg-white">
          <div className="w-full p-5 gap-y-2 flex md:flex-row flex-col justify-between">
            <div className="md:w-1/2 w-full flex md:flex-row flex-col gap-x-2"></div>

            <div className={"md:w-[200px] w-full"}>
              <div className="relative">
                <Input
                  className={"search pl-10"}
                  placeholder="Search..."
                  onChange={(e) => {
                    handleSearch(e.target.value);
                  }}
                />
                <FiSearch className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div>
          </div>
          <div className="p-5">
            <div className="flex flex-wrap justify-center sm:justify-start md:justify-start flex-row gap-10">
              {dataThings?.length === 0 ? (
                <div className="w-full flex justify-center">No Data</div>
              ) : (
                dataThings
                  ?.filter((item) => {
                    // Filtering data berdasarkan pencarian
                    if (!search) return item?.type === "1"; // Jika search kosong, tampilkan semua data
                    return (
                      item?.name.toLowerCase().includes(search.toLowerCase()) || // Filter berdasarkan nama
                      item?.name.toLowerCase().includes(search.toLowerCase()) // Filter berdasarkan sensor name
                    );
                  })
                  .filter((item) => item?.type == "1")
                  .map((item) => (
                    <div
                      key={item?.id}
                      className="bg-white px-5 flex flex-col justify-center gap-y-1 items-center rounded-sm py-1 shadow-gray-300 shadow"
                    >
                      <div>
                        <p
                          className={`text-md text-[${
                            item?.color == null ? "#BEBEBE" : item?.color
                          }] font-semibold`}
                        >
                          {item?.name}
                        </p>
                      </div>
                      <ValueSensorFeeder
                        id={item?.Sensor[0]?.id}
                        typeSensor={item?.Sensor[0]?.typeSensorId}
                        typeSensorDetail={item?.Sensor[0]?.typeSensor?.name}
                        thingsId={item?.Sensor[0]?.thingsId}
                        updateAt={item?.Sensor[0]?.updatedAt}
                      />
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
