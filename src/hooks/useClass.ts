import { queryOptions } from "@tanstack/react-query";
import { getClassArmDetails, getClassStats } from "../api/class";

export const getClassArmDetailsQuery = (
  classArmId: string,
  page: number = 1,
  limit: number = 1,
  search: string = "",
  filters: Record<string, string> = {}
) => {
  return queryOptions({
    queryKey: ["classArmById", classArmId, page, limit, search, filters],
    queryFn: () =>
      getClassArmDetails(classArmId, { page, limit, search, ...filters }),
  });
};

export const getClassArmStatsQuery = (
  classArmId: string,
  filters: Record<string, string> = {}
) => {
  return queryOptions({
    queryKey: ["classArmById", classArmId, filters],
    queryFn: () => getClassStats(classArmId, { ...filters }),
  });
};
