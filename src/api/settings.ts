import type { SchoolTerm } from "../types";
import api from "./api";

export const getSchoolTerms = async (): Promise<SchoolTerm[]> => {
  const response = await api.get("/admin/terms");
  console.log(response.data.data.terms, "dfgy");
  return response.data.data.terms;
};

export const getSchoolActiveTerms = async (): Promise<SchoolTerm[]> => {
  const response = await api.get("/admin/terms/active");
  console.log(response.data.data.terms[0]);

  return response.data.data.terms[0];
};

export const setActiveSchoolTerm = async (termId: number) => {
  const response = await api.put(`/admin/terms/${termId}/activate`);
  console.log(response.data);

  return response.data.data;
};

export const getSchoolSessions = async (): Promise<SchoolTerm[]> => {
  const response = await api.get("/admin/sessions");
  console.log(response.data.data.sessions, "dfgy");
  return response.data.data.sessions;
};

export const getActiveSchoolSessions = async (): Promise<any[]> => {
  const response = await api.get("/admin/sessions/active");
  console.log(response.data.data.activeSession);
  return response.data.data.activeSession;
};

export const createSchoolSession = async (data: any) => {
  const response = await api.post("/admin/session", data);
  console.log(response.data);
  return response.data.data;
};

export const updateSchoolSession = async (sessionId: number) => {
  const response = await api.put(`/admin/sessions/${sessionId}`);
  console.log(response.data);
  return response.data.data;
};

export const createSchoolSubjects = async (payload: any) => {
  const response = await api.post("/admin/subjects", payload);
  console.log(response.data.data);
  return response.data;
};

export const getSchoolSubjects = async (options: any) => {
  const { page = 1, limit = 10, search = "", ...filters } = options || {};
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
  const response = await api.get(`/admin/subjects?${queryString}`);
  console.log(response.data.data);
  return response.data.data.subjects;
};

export const deleteSchoolSubjects = async (subjectId: string) => {
  const response = await api.delete(`/admin/subjects/${subjectId}`);
  console.log(response.data);
  return response.data;
};
