import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DateTime from "./DateTime";
import {
  faBarsStaggered,
  faCloud,
  faCloudBolt,
  faCloudMoon,
  faCloudMoonRain,
  faCloudRain,
  faCloudSun,
  faCloudSunRain,
  faMoon,
  faSnowflake,
  faSun,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { kelvinToOther } from "../utils";
import { Location, Unit } from "../types";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const icons = new Map<string, IconDefinition>([
  ["01d", faSun],
  ["01n", faMoon],
  ["02d", faCloudSun],
  ["02n", faCloudMoon],
  ["03d", faCloud],
  ["03n", faCloud],
  ["04d", faCloud],
  ["04n", faCloud],
  ["09d", faCloudRain],
  ["09n", faCloudRain],
  ["10d", faCloudSunRain],
  ["10n", faCloudMoonRain],
  ["11d", faCloudBolt],
  ["11n", faCloudBolt],
  ["13d", faSnowflake],
  ["13n", faSnowflake],
  ["50d", faBarsStaggered],
  ["50n", faBarsStaggered],
]);

export default function Weather({
  location,
  unit,
}: {
  location: Location;
  unit: Unit;
}) {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["weather"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/weather?lat=${
          location.lat
        }&lon=${location.lon}`
      );
      const json = await response.json();
      return json;
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    refetch();
  }, [location, refetch]);

  if (isFetching)
    return (
      <div className="flex gap-2 items-center">
        <div className="loader p-2"></div>
        Getting Weather
      </div>
    );

  return (
    <div className="p-8 flex flex-col gap-8">
      <DateTime location={location} timezone={data.timezone} />
      <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
        <div className="flex flex-col gap-8 items-center">
          <div className="capitalize flex flex-col gap-2 items-center">
            <FontAwesomeIcon
              className=" size-32"
              icon={icons.get(data.weather[0].icon) || faSun}
            />
            {data.weather[0].description}
          </div>
          <div className="text-6xl">
            {Math.round(kelvinToOther(data.main.temp, unit))}°
          </div>
        </div>
        <div className="flex flex-col gap-8 items-center">
          <div className="flex gap-4">
            <div className="flex flex-col gap-2 items-center w-36">
              <div>Feels Like</div>
              <div className="text-3xl">
                {Math.round(kelvinToOther(data.main.feels_like, unit))}°
              </div>
            </div>
            <div className="flex flex-col gap-2 items-center w-36">
              <div>Humidity</div>
              <div className="text-3xl">{data.main.humidity}%</div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col gap-2 items-center w-36">
              <div>Wind</div>
              <div className="text-3xl">
                {(data.wind.speed * 3.6).toFixed(1)} km/h
              </div>
            </div>
            <div className="flex flex-col gap-2 items-center w-36">
              <div>Visibility</div>
              <div className="text-3xl">
                {(data.visibility / 1000).toFixed(1)} km
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
