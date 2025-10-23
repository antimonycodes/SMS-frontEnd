// leadership.queries.ts
import {
  useMutation,
  useQueryClient,
  queryOptions,
} from "@tanstack/react-query";
import {
  createLeadershipRole,
  getLeadershipRoles,
  updateLeadershipRole,
  deleteLeadershipRole,
  getLeadershipStats,
  getStudentLeadership,
  assignBulkLeadershipRoles,
} from "../api/leadership";
import { toast } from "sonner";

export const getLeadershipRolesQuery = () =>
  queryOptions({
    queryKey: ["leadershipRoles"],
    queryFn: getLeadershipRoles,
  });

export const createLeadershipRoleQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: assignBulkLeadershipRoles,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["leadershipRoles"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create role";
      toast.error(message);
    },
  });
};

export const updateLeadershipRoleQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: { name: string; category: string };
    }) => updateLeadershipRole(payload, id),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["leadershipRoles"] });
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Failed to update role";
      toast.error(message);
    },
  });
};

export const deleteLeadershipRoleQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteLeadershipRole(id),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["leadershipRoles"] });
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Failed to delete role";
      toast.error(message);
    },
  });
};

export const useLeadershipStats = (sessionId?: string | number) => {
  return queryOptions({
    queryKey: ["leadershipStats", sessionId],
    queryFn: () => getLeadershipStats(sessionId),
  });
};

export const allStudentLeadership = () => {
  return queryOptions({
    queryKey: ["StudentLeadership"],
    queryFn: getStudentLeadership,
  });
};
