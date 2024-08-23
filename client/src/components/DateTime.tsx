import { useEffect, useMemo, useState } from "react";
import { Location } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

export default function DateTime({
  location,
  timezone,
}: {
  location: Location;
  timezone: number;
}) {
  const [date, setDate] = useState<Date>(new Date());
  const { dateFormat, timeFormat } = useMemo(() => {
    const hh = Math.floor(timezone / 3600)
      .toString()
      .padStart(2, "0");
    const mm = Math.floor((timezone / 60) % 60)
      .toString()
      .padStart(2, "0");

    const df = new Intl.DateTimeFormat(undefined, {
      timeZone: `${timezone < 0 ? "-" : "+"}${hh}${mm}`,
      dateStyle: "full",
    });
    const tf = new Intl.DateTimeFormat(undefined, {
      timeZone: `${timezone < 0 ? "-" : "+"}${hh}${mm}`,
      timeStyle: "medium",
    });
    return { dateFormat: df, timeFormat: tf };
  }, [timezone]);
  useEffect(() => {
    setInterval(() => {
      setDate(new Date());
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col items-center gap-2">
      <div>
        <FontAwesomeIcon icon={faLocationDot} /> {location.name},{" "}
        {location.state && `${location.state},`} {location.country}
      </div>
      <div>{dateFormat.format(date)}</div>
      <div className="text-xl">{timeFormat.format(date)}</div>
    </div>
  );
}
