import {
  infiniteQueryOptions,
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import api, { setAccessToken } from "../api/api";
import { useAuth } from "./useAuth";
import { createClassArm, getClassArms, getClassLevels } from "../api/class";
import type { ClassArm, ClassLevel, SchoolTerm, Session } from "../types";
import {
  createSchoolSession,
  createSchoolSubjects,
  deleteSchoolSubjects,
  getActiveSchoolSessions,
  getSchoolActiveTerms,
  getSchoolSessions,
  getSchoolSubjects,
  getSchoolTerms,
  setActiveSchoolTerm,
  updateSchoolSession,
} from "../api/settings";
import { createTeachers, deleteTeachers, getAllTeachers } from "../api/teacher";
import {
  createAnnouncements,
  deleteAnnouncements,
  getAnnouncements,
} from "../api/annoucement";

export const useLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await api.post("/auth/signin", data);
      return res.data;
    },
    onSuccess: (data) => {
      console.log("Login response data:", data);

      const token = data.data?.user?.accessToken;
      const user = data.data?.user;
      const role = data.data?.user?.user.role;
      console.log(role);

      if (token && user) {
        // Use the login method from useAuth which handles both tokenManager and store
        login(token);

        localStorage.setItem("role", role);

        console.log("Login successful, token set");
        toast.success(data.message || "Login successful");

        // Use replace to prevent back navigation to signin
        navigate("/dashboard", { replace: true });
      } else {
        console.error("Missing token or user in response:", {
          token: !!token,
          user: !!user,
        });
        toast.error("Login failed - invalid response");
      }
    },
    onError: (error: any) => {
      console.error("Login error:", error);
      const message =
        error?.response?.data?.message || error?.message || "Login failed";
      toast.error(message);
    },
  });
};

export const useLogout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      try {
        await api.post("/auth/signout");
      } catch (error) {
        // Continue with logout even if API call fails
        console.log(
          "Signout API call failed, but continuing with local logout"
        );
      }
    },
    onSuccess: () => {
      // Use the logout method from useAuth which handles both tokenManager and store
      logout();

      toast.success("Logged out successfully");

      // Force navigation and replace history to prevent going back
      navigate("/signin", { replace: true });

      // Optional: Force a page reload to ensure all state is cleared
      setTimeout(() => {
        window.location.reload();
      }, 100);
    },
    onError: () => {
      // Clear auth even if API fails
      logout();

      toast.success("Logged out successfully");
      navigate("/signin", { replace: true });

      // Optional: Force a page reload
      setTimeout(() => {
        window.location.reload();
      }, 100);
    },
  });
};

export const getClassLevelsQueryOption = () => {
  return queryOptions<ClassLevel[]>({
    queryKey: ["classLevels"],
    queryFn: getClassLevels,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateClassArm = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createClassArm,
    onSuccess: (data) => {
      toast.success(data.message || "Class arm created successfully");

      queryClient.invalidateQueries({ queryKey: ["classArms"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create class arm";
      toast.error(message);
    },
  });
};

export const getClassArmsQueryOption = () => {
  return queryOptions<ClassArm[]>({
    queryKey: ["classArms"],
    queryFn: getClassArms,
    staleTime: 1000 * 60 * 5,
  });
};

export const getSchoolTermQueryOption = () => {
  return queryOptions<SchoolTerm[]>({
    queryKey: ["schoolTerms"],
    queryFn: getSchoolTerms,
    staleTime: 1000 * 60 * 500,
  });
};

export const getActiveSchoolTermQueryOption = () => {
  return queryOptions<SchoolTerm[]>({
    queryKey: ["activeSchoolTerm"],
    queryFn: getSchoolActiveTerms,
    staleTime: 1000 * 60 * 500,
  });
};

export const activateSchoolTermQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setActiveSchoolTerm,
    onSuccess: (data) => {
      toast.success(data.message || "School term activated successfully");

      queryClient.invalidateQueries({ queryKey: ["activeSchoolTerm"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to activate school term";
      toast.error(message);
    },
  });
};

export const getActiveSchoolSessionsQueryOption = () => {
  return queryOptions<Session[]>({
    queryKey: ["activeSchoolSessions"],
    queryFn: getActiveSchoolSessions,
    staleTime: 1000 * 60 * 500,
  });
};
export const getSchoolSessionsQuery = () => {
  return queryOptions<any[]>({
    queryKey: ["schoolSessions"],
    queryFn: getSchoolSessions,
    staleTime: 1000 * 60 * 500,
  });
};

export const createNewSessionQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSchoolSession,
    onSuccess: (data) => {
      toast.success(data.message || "New session created successfully");

      queryClient.invalidateQueries({ queryKey: ["activeSchoolSessions"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create new session";
      toast.error(message);
    },
  });
};

const updateSchoolSessionName = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSchoolSession,
    onSuccess: (data) => {
      toast.success(data.message || "Session name updated successfully");

      queryClient.invalidateQueries({ queryKey: ["activeSchoolSessions"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update session name";
      toast.error(message);
    },
  });
};

export const createSchoolSubjectsQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSchoolSubjects,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["AllSubjects"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create subject";
      toast.error(message);
    },
  });
};

export const deleteSubjectQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSchoolSubjects,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["AllSubjects"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create subject";
      toast.error(message);
    },
  });
};

export const getSubjectsQueryOptions = (
  page: number = 1,
  limit: number = 10,
  search: string = "",
  filters: Record<string, string> = {}
) => {
  return queryOptions({
    queryKey: ["AllSubjects", page, limit, search, filters],
    queryFn: () => getSchoolSubjects({ page, limit, search, ...filters }),
    staleTime: 1000 * 60 * 1,
  });
};

export const getTeacherQueryOption = (
  page: number = 1,
  limit: number = 10,
  search: string = "",
  filters: Record<string, string> = {}
) => {
  return {
    queryKey: ["teachers", page, limit, search, filters],
    queryFn: () => getAllTeachers({ page, limit, search, ...filters }),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  };
};

export const getTeacherQueryOptionIfinite = () => {
  return infiniteQueryOptions({
    queryKey: ["allteachers"],
    queryFn: ({ pageParam }) =>
      getAllTeachers({ page: pageParam, limit: 1, search: "" }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.hasNext
        ? lastPage.pagination.currentPage + 1
        : undefined;
    },
    getPreviousPageParam: (allPages) => {
      const lastPage = allPages[allPages.length - 1];
      console.log("Last page from allPages:", lastPage.pagination.currentPage);

      return lastPage.pagination.hasPrev
        ? lastPage.pagination.currentPage - 1
        : undefined;
    },
  });
};

export const createTeacherQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTeachers,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["allteachers"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Failed to create Teacher";
      console.log(message);
      toast.error(message);
    },
  });
};

export const deleteTeachertQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTeachers,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["allteachers"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create subject";
      toast.error(message);
    },
  });
};

export const createAnnouncementsQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAnnouncements,
    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create subject";
      toast.error(message);
    },
  });
};

export const getAnnouncementsQuery = () => {
  return infiniteQueryOptions({
    queryKey: ["announcements"],
    queryFn: ({ pageParam }) =>
      getAnnouncements({ page: pageParam, limit: 20, Search: "" }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.hasNext
        ? lastPage.pagination.currentPage + 1
        : undefined;
    },
  });
};

export const deleteAnnouncementsQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAnnouncements,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to delete annuncement";
      toast.error(message);
    },
  });
};
