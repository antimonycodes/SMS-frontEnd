import api from "./api";

// export const getAllTeachers = async (options: any) => {
//   const { page, limit, search } = options ? options : {};
//   const queryParams = new URLSearchParams();
//   if (page) queryParams.append("page", page.toString());
//   if (limit) queryParams.append("limit", limit.toString());
//   if (search) queryParams.append("search", search.toString());
//   const querySring = queryParams.toString();

//   const response = await api.get(
//     `/admin/teachers${querySring ? `?${querySring}` : ""}`
//   );
//   console.log(response.data.data);
//   return response.data;
// };

export const getAllTeachers = async (options: any) => {
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
  const response = await api.get(`/admin/teachers?${queryString}`);

  console.log("API Response:", response.data);
  return response.data;
};

export const createTeachers = async (payload: any) => {
  const response = await api.post("/admin/teachers", payload);
  console.log(response.data.data);
  return response.data;
};

export const deleteTeachers = async (teacherId: string) => {
  const response = await api.delete(`/admin/teachers/${teacherId}`);
  console.log(response.data);
  return response.data;
};
