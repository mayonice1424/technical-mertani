import React, { useEffect } from "react";
import { useState } from "react";
import CircularProgress from "../circularProgress/circularProgress";
import moment from "moment";
import "moment/locale/id";
import { Switch } from "../ui/switch";
const ValueActuator = ({ id, name, color, updateAt }) => {
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

  const getDataLog = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await ApiServices.get(
        `/actuator-logs?page=1&limit=1&search&actuatorId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDataValue(response?.data?.data);
      console.log("INI DATA VALUE", response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleActuatorLog = async () => {
    try {
      const lifeCycle = dataValue[0]?.statusLifeCycle === 1 ? 0 : 1; // Ternary for status change
      const token = localStorage.getItem("token");

      const response = await ApiServices.post(
        `/actuator-logs`, // API endpoint
        {
          statusLifeCycle: lifeCycle,
          actuatorId: id,
        },
        {
          headers: {
            // Authorization headers
            Authorization: `Bearer ${token}`,
          },
        }
      );

      getDataLog(); // Call to get updated data after successful API call
    } catch (error) {
      console.log(error);
    } finally {
      // Any cleanup or additional actions can be handled here if needed
    }
  };

  useEffect(() => {
    getDataLog();
  }, []);

  return (
    <>
      <div className="py-2 flex justify-center flex-col gap-y-2 items-center">
        <div>
          <p
            className={`text-md text-[${
              color == null ? "#BEBEBE" : color
            }]  font-semibold`}
          >
            {name}
          </p>
        </div>
        <div>
          <img
            src={
              dataValue[0]?.statusLifeCycle == 1
                ? "./assets/images/On.png"
                : "./assets/images/Off.png"
            }
            width={100}
          />
        </div>
        <div>
          <p className="text-xs font-normal">
            Diperbarui : {moment(updateAt).utcOffset(14).format("llll")}
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
        <Switch
          checked={dataValue[0]?.statusLifeCycle == 1}
          onCheckedChange={(checked) => {
            handleActuatorLog(); // Call your function when state changes
          }}
        />
      </div>
    </>
  );
};
export default ValueActuator;
