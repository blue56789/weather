import { useCallback, useState } from "react";
import { Location } from "../types";

export default function useLocation() {
  const [location, setLocation] = useState<Location>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<GeolocationPositionError>();
  const getLocation = useCallback(() => {
    setLoading(true);
    setError(undefined);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/loc?lat=${
            position.coords.latitude
          }&lon=${position.coords.longitude}`
        );
        const json = await response.json();
        if (response.ok)
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            name: json[0].name,
            state: json[0].state,
            country: json[0].country,
          });
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        setError(error);
        console.log(error);
      },
      {
        timeout: 5000,
        enableHighAccuracy: true,
        maximumAge: 10000,
      }
    );
  }, []);
  return { location, isLoading, getLocation, setLocation, error };
}
