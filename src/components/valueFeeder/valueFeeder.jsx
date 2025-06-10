import React, { useEffect } from "react";
import { useState } from "react";
import CircularProgress from "../circularProgress/circularProgress";
import moment from "moment";
import "moment/locale/id";
import { useSensorContext } from "../../context/SensorContext";
const ValueSensorFeeder = ({
  id,
  typeSensor,
  thingsId,
  updateAt,
  typeSensorDetail,
}) => {
  const { addSensorData } = useSensorContext();
  const idLocale = {
    // Konfigurasi locale untuk bahasa Indonesia
    months:
      "Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember".split(
        "_"
      ),
    monthsShort: "Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nov_Des".split("_"),
    weekdays: "Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu".split("_"),
    weekdaysShort: "Min_Sen_Sel_Rab_Kam_Jum_Sab".split("_"),
    weekdaysMin: "Mg_Sn_Sl_Rb_Km_Jm_Sb".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY [pukul] HH:mm",
      LLLL: "dddd, D MMMM YYYY [pukul] HH:mm",
    },
    calendar: {
      sameDay: "[Hari ini pukul] LT",
      nextDay: "[Besok pukul] LT",
      nextWeek: "dddd [pukul] LT",
      lastDay: "[Kemarin pukul] LT",
      lastWeek: "dddd, [tanggal] [bulan] [tahun] [pukul] LT",
      sameElse: "L",
    },
    relativeTime: {
      future: "dalam %s",
      past: "%s yang lalu",
      s: "beberapa detik",
      ss: "%d detik",
      m: "semenit",
      mm: "%d menit",
      h: "sejam",
      hh: "%d jam",
      d: "sehari",
      dd: "%d hari",
      M: "sebulan",
      MM: "%d bulan",
      y: "setahun",
      yy: "%d tahun",
    },
    meridiemParse: /pagi|siang|sore|malam/,
    meridiemHour: function (hour, meridiem) {
      if (hour === 12) {
        hour = 0;
      }
      if (meridiem === "pagi") {
        return hour;
      } else if (meridiem === "siang") {
        return hour >= 11 ? hour : hour + 12;
      } else if (meridiem === "sore" || meridiem === "malam") {
        return hour + 12;
      }
    },
    // eslint-disable-next-line no-unused-vars
    meridiem: function (hours, minutes, isLower) {
      if (hours < 11) {
        return "pagi";
      } else if (hours < 15) {
        return "siang";
      } else if (hours < 19) {
        return "sore";
      } else {
        return "malam";
      }
    },
    ordinalParse: /\d{1,2}/,
    ordinal: "%d",
    week: {
      dow: 1, // Monday is the first day of the week.
      doy: 7, // The week that contains Jan 1st is the first week of the year.
    },
  };

  moment.updateLocale("id", idLocale);
  const [progress, setProgress] = useState(0);
  const [dataValue, setDataValue] = useState([]);

  const getValue = async () => {
    try {
      const response = {
        status: "success",
        message: "get detail sensor data successful",
        data: {
          sensorId: id,
          value: Math.floor(Math.random() * (50 - 10 + 1)) + 10 || 0, // Random value between 10 and 50
          status: "online",
          createdAt: new Date().toISOString(),
        },
      };
      const sensorData = response?.data;
      addSensorData(sensorData);
      console.log(response?.data, "ini sensor data");
      setDataValue(response?.data);
      setProgress(response?.data?.value);
    } catch (error) {
      console.error("Error getting value:", error);
    }
  };
  useEffect(() => {
    const intervalId = setInterval(async () => {
      await getValue();
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <>
      <div className="py-2 flex justify-center flex-col gap-y-2 items-center">
        {(typeSensor == 1 && <CircularProgress progress={progress} />) ||
          (typeSensor == 2 && (
            <div
              className={`text-6xl text-center flex justify-center items-center ${
                progress >= 30 ? "text-green-500" : "text-red-500"
              } `}
              style={{ height: 120 }}
            >
              {progress == undefined ? 0 : progress}°
            </div>
          )) ||
          (typeSensor == 3 && (
            <div
              className={`text-6xl text-center flex justify-center items-center ${
                progress >= 30 ? "text-green-500" : "text-red-500"
              } `}
              style={{ height: 120 }}
            >
              {progress == undefined ? 0 : `${progress}`}
              <span className="text-2xl">{typeSensorDetail}</span>
            </div>
          ))}
        <div>
          <p className="text-xs font-normal">
            Diperbarui :{" "}
            {moment(dataValue?.createdAt).utcOffset(14).format("llll")}
          </p>
        </div>
        <div>
          <p className={`text-sm font-medium `}>
            Status :
            <span
              className={`text-xs font-semibold  ${
                dataValue?.status == "online"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {dataValue?.status == "online" ? " Online " : " Offline "}{" "}
            </span>
          </p>
        </div>
      </div>
    </>
  );
};
export default ValueSensorFeeder;
