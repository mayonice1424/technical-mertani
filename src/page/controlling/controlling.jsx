/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./Controlling.css";
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
import ValueActuator from "@/components/valueActuator/valueActuator";

const Controlling = () => {
  const { setIsLoading } = useLoading();

  const [dataGreenhouse, setDataGreenhouse] = useState([]);
  const [dataControl, setDataControl] = useState([]);

  const [dataLocation, setDataLocation] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedCluster, setSelectedCluster] = useState(null);

  const getLocation = async () => {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const token = localStorage.getItem("token");
      const response = await ApiServices.get("/locations?page=0&limit=0", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDataLocation(response.data.data);
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
  const getControl = async () => {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const token = localStorage.getItem("token");
      const response = await ApiServices.get(
        `/actuator?pages&limit&greenhouseId=${
          selectedCluster?.id == null || selectedCluster?.id == undefined
            ? 0
            : selectedCluster.id
        }&search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDataControl(response.data.data);
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
    getControl();
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
    console.log(value);
    setSearch(value);
  };

  return (
    <div className="w-full h-full bg-[background-color:var(--color-secondary)] overflow-y-auto">
      <div className="w-full h-full flex-col px-10 flex justify-start items-start">
        <div className="w-full h-full mb-5 overflow-y-auto bg-white">
          <div className="w-full p-5 gap-y-2 flex md:flex-row flex-col  justify-between">
            <div className="md:w-1/2 w-full flex md:flex-row flex-col gap-x-2">
              <Select onValueChange={handleLocationChange}>
                <SelectTrigger className={"md:w-[200px] w-full"}>
                  <SelectValue placeholder="Select Location" />
                </SelectTrigger>
                <SelectContent>
                  {dataLocation.map((item) => {
                    return (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <Select
                value={selectedCluster}
                onValueChange={handleClusterChange}
              >
                <SelectTrigger className={"md:w-[200px] w-full"}>
                  <SelectValue placeholder="Select Cluster" />
                </SelectTrigger>
                <SelectContent>
                  {dataGreenhouse.length === 0 ? (
                    <SelectItem value={null} disabled>
                      Select Cluster
                    </SelectItem>
                  ) : (
                    <>
                      <SelectItem value={null} disabled>
                        Select Cluster
                      </SelectItem>
                      {dataGreenhouse.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>

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
              {/* Check if selectedCluster is null, undefined, or if dataThings is empty */}
              {selectedCluster == null ||
              selectedCluster == undefined ||
              dataControl?.length === 0 ? (
                <div className="w-full flex justify-center">No Data</div> // If true, show "No Data"
              ) : (
                // If data exists and conditions are met, render the data
                dataControl?.map((item) => (
                  <>
                    <div
                      key={item?.id} // Ensure each child has a unique key for list rendering
                      className="bg-white px-5 flex flex-col justify-center gap-y-1 items-center rounded-sm py-1 shadow-gray-300 shadow"
                    >
                      <ValueActuator
                        name={item?.name}
                        id={item?.id}
                        color={item?.color}
                      />
                    </div>
                  </>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controlling;
