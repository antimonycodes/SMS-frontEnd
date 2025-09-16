import api from "./api";

export const createLeadershipRole = async (payload: {
  name: string;
  category: string;
}) => {
  const res = await api.post("/admin/leadership/role", payload);
  return res.data;
};

export const getLeadershipRoles = async (): Promise<any[]> => {
  const response = await api.get("/admin/leadership/role");
  console.log(response.data.data.roles);
  return response.data.data.roles;
};

export const updateLeadershipRole = async (
  payload: {
    name: string;
    category: string;
  },
  id: any
) => {
  const res = await api.put(`/admin/leadership/role/${id}`, payload);
  return res.data;
};

export const deleteLeadershipRole = async (id: string) => {
  const response = await api.delete(`/admin/leadership/role/${id}`);
  console.log(response.data);
  return response.data;
};

export const getLeadershipStats = async (sessionId?: string | number) => {
  const url = sessionId
    ? `/admin/leadership/stats?session_id=${sessionId}`
    : `/admin/leadership/stats`;

  const response = await api.get(url);
  return response.data.data.leadershipStats;
};

export const getStudentLeadership = async (): Promise<any[]> => {
  const response = await api.get("/admin/leadership/student/session");
  console.log(response.data.data.studentLeadershipRoles, "ertyui");
  return response.data.data.studentLeadershipRoles;
};
