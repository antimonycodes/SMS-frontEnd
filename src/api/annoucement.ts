import api from "./api";

export const createAnnouncements = async (payload: any) => {
  const response = await api.post("/announcement", payload);
  return response.data;
};

export const getAnnouncements = async (options: any) => {
  const { page = 1, limit = 10, search = "" } = options || {};
  const queryParams = new URLSearchParams();

  queryParams.append("page", page.toString());
  queryParams.append("limit", limit.toString());
  if (search) queryParams.append("search", search.toString());

  const queryString = queryParams.toString();

  const response = await api.get(`/announcement?${queryString}`);
  console.log(response.data);
  return response.data;
};

export const deleteAnnouncements = async (id: any) => {
  const response = await api.delete(`/announcement/${id}`);
  return response.data;
};
