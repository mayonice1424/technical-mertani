/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./Feeder.css";
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
import SensorDataTable from "@/components/table/table";

const Feeder = () => {
  const { setIsLoading } = useLoading();

  const [dataGreenhouse, setDataGreenhouse] = useState([]);
  const [dataThings, setDataThings] = useState([]);

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
  const getThings = async () => {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const token = localStorage.getItem("token");
      const response = await ApiServices.get(
        `/things?pages&limit&greenhouseId=${
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
      setDataThings(response.data.data);
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
    console.log(value);
    setSearch(value);
  };

  return (
    <div className="w-full h-full bg-[background-color:var(--color-secondary)] overflow-y-auto">
      <div className="w-full h-full flex-col px-10 flex justify-start items-start">
        <div className="w-full h-full mb-5 overflow-y-auto bg-white">
          <SensorDataTable />
        </div>
      </div>
    </div>
  );
};

export default Feeder;
