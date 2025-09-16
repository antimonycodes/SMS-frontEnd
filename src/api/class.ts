import type { ClassArm, ClassLevel, CreateClassArm } from "../types";
import api from "./api";

export const getClassLevels = async (): Promise<ClassLevel[]> => {
  const response = await api.get("/admin/classes");
  console.log(response.data.data.classLevel);
  return response.data.data.classLevel as ClassLevel[];
};

export const createClassArm = async (payload: {
  classLevelId: string;
  armName: string;
}): Promise<CreateClassArm> => {
  const res = await api.post("/admin/classes/arms", payload);
  return res.data;
};

export const getClassArms = async () => {
  const response = await api.get("/admin/classes/arms");
  console.log(response.data.data.classArms);
  return response.data.data.classArms as ClassArm[];
};

export const getClassArmDetails = async (
  classArmId: string,
  options?: {
    page?: number;
    limit?: number;
    search?: string;
    [key: string]: any;
  }
) => {
  const { page = 1, limit = 1, search = "", ...filters } = options || {};
  const queryParams = new URLSearchParams();

  queryParams.append("page", page.toString());
  queryParams.append("limit", limit.toString());

  if (search) {
    queryParams.append("search", search.toString());
  }

  // Add filter parameters
  Object.entries(filters).forEach(([key, value]) => {
    if (value && value !== "") {
      queryParams.append(key, value.toString());
    }
  });

  const queryString = queryParams.toString();
  const response = await api.get(
    `/classarm/students/${classArmId}?${queryString}`
  );

  console.log(response.data);
  return response.data;
};

export const getClassStats = async (
  classArmId: string,
  options?: {
    page?: number;
    limit?: number;
    search?: string;
    [key: string]: any;
  }
) => {
  const { ...filters } = options || {};
  const queryParams = new URLSearchParams();

  // Add filter parameters
  Object.entries(filters).forEach(([key, value]) => {
    if (value && value !== "") {
      queryParams.append(key, value.toString());
    }
  });

  const queryString = queryParams.toString();
  const response = await api.get(
    `/classarm/stats/${classArmId}?${queryString}`
  );

  console.log(response.data);
  return response?.data?.data?.classStats;
};
