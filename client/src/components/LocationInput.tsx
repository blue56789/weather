import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Location } from "../types";

export default function LocationInput({
  setLocation,
}: {
  setLocation: React.Dispatch<React.SetStateAction<Location | undefined>>;
}) {
  const [input, setInput] = useState("");

  const { isFetching, data, refetch } = useQuery({
    queryKey: ["location"],
    queryFn: async () => {
      if (!input) return [];
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/coords?q=${input}`
      );
      const json = await response.json();
      return json;
    },
    retry: false,
  });

  useEffect(() => {
    const id = setTimeout(() => {
      if (input) refetch();
    }, 500);
    return () => clearTimeout(id);
  }, [input, refetch]);

  return (
    <div className="relative">
      <input
        type="text"
        className="border border-txtPrimary rounded-full bg-bgPrimary w-full px-4 py-2 accent-txtPrimary"
        placeholder="Enter location"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div
        className={`${
          !input && "hidden"
        } absolute left-0 -bottom-4 translate-y-full w-full h-36 border border-txtPrimary rounded-lg bg-bgPrimary flex flex-col overflow-scroll`}
      >
        {isFetching && <div className="p-2">Loading...</div>}
        {!isFetching &&
          data &&
          data.map((e: Location, i: number) => (
            <button
              key={i}
              className="w-full rounded-none border-0 border-b btn"
              onClick={() => {
                setLocation({ ...e });
                setInput("");
              }}
            >
              {e.name}, {e.state && `${e.state},`} {e.country}
            </button>
          ))}
      </div>
    </div>
  );
}
