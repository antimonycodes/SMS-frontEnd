import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStudent, getStudents } from "../api/student";
import { toast } from "sonner";

export const createStudentQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createStudent,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["allStudents"] });
      toast.success(data.message);
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

export const getStudentsQuery = (
  page: number = 1,
  limit: number = 1,
  search: string = "",
  filters: Record<string, string> = {}
) => {
  return {
    queryKey: ["allStudents", page, limit, search, filters],
    queryFn: () => getStudents({ page, limit, search, ...filters }),
    keepPreviousData: true,
    // staleTime: 5 * 60 * 1000,
  };
};
