import type { StudentFormData } from "../types";
import api, { createApiCall } from "./api";

export const createStudent = async (payoad: StudentFormData) => {
  const response = await api.post("/admin/students", payoad);
  return response.data;
};

export const getStudents = createApiCall("/admin/students");
