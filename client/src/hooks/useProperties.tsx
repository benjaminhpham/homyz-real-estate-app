import { useQuery } from "@tanstack/react-query";
import { getAllProperties } from "../utils/api";

export default function useProperties() {
  const { data, isError, isLoading, refetch } = useQuery(
    ["allProperties"],
    getAllProperties,
    { refetchOnWindowFocus: false }
  );

  return {
    data,
    isError,
    isLoading,
    refetch,
  };
}
