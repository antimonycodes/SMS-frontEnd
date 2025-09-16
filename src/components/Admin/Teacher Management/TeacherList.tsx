import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  deleteTeachertQuery,
  getTeacherQueryOption,
} from "../../../hooks/queryOptions";
import Table from "../../ui/Table";
import { ColumnBuilder, ActionButton } from "../../ui/TableHelpers";
import DynamicFilter from "../../../shared/DynamicFilter";

interface Subject {
  id: number;
  name: string;
}

interface Teacher {
  id: number;
  school_id: number;
  employee_id: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  email: string;
  phone: string;
  address: string;
  qualification: string;
  hire_date: string;
  salary: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  subjects: Subject[];
}

interface PaginationData {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
}

interface SortConfig {
  key: string;
  direction: "asc" | "desc";
}

const TeacherList = () => {
  const navigate = useNavigate();
  const [globalSearch, setGlobalSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [apiFilters, setApiFilters] = useState<Record<string, string>>({});

  const { mutate: deleteTeacher } = deleteTeachertQuery();

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(globalSearch);
    }, 500);
    return () => clearTimeout(timer);
  }, [globalSearch]);

  // Reset page when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, apiFilters]);

  // Query with filters
  const { data, isPending, error } = useQuery(
    getTeacherQueryOption(
      currentPage,
      perPage,
      debouncedSearch,
      apiFilters // Pass filters to API
    )
  );

  const handleViewMore = (teacher: Teacher) => {
    navigate(`/dashboard/teacher/${teacher.id}`, {
      state: { data: teacher },
    });
  };

  const handleDelete = (teacher: Teacher) => {
    deleteTeacher(teacher.id.toString());
  };

  const handleSort = (key: string, direction: "asc" | "desc") => {
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1);
  };

  const handleGlobalSearchChange = (search: string) => {
    setGlobalSearch(search);
  };

  // Handle filter changes from DynamicFilter component
  const handleApiFiltersChange = (filters: Record<string, string>) => {
    setApiFilters(filters);
  };

  const teachersData = data?.data?.teachers || [];
  const paginationInfo = data?.pagination;

  // Filter configuration for teachers
  const filterConfig = {
    showSubjects: true,
    // showStatus: true,
    // showDateFilters: true,
    showClassLevels: true, // If teachers are associated with class levels
    // customFilters: [
    //   {
    //     key: "qualification",
    //     label: "Qualification",
    //     options: [
    //       { value: "BSc", label: "BSc" },
    //       { value: "MSc", label: "MSc" },
    //       { value: "PhD", label: "PhD" },
    //       { value: "BEd", label: "BEd" },
    //       { value: "MEd", label: "MEd" },
    //     ],
    //   },
    //   {
    //     key: "employment_type",
    //     label: "Employment Type",
    //     options: [
    //       { value: "full_time", label: "Full Time" },
    //       { value: "part_time", label: "Part Time" },
    //       { value: "contract", label: "Contract" },
    //     ],
    //   },
    // ],
  };

  const columns = useMemo(() => {
    const builder = new ColumnBuilder<Teacher>();
    return builder
      .add("employee_id", "Employee ID", { sortable: true, filterable: false })
      .add("first_name", "First Name", { sortable: true, filterable: false })
      .add("last_name", "Last Name", { sortable: true, filterable: false })
      .add("email", "Email", { sortable: true, filterable: false })
      .add("phone", "Phone", { sortable: true, filterable: false })
      .tags("subjects", "Subjects", {
        getName: (subject) => subject.name,
        getKey: (subject) => subject.id,
        className: "bg-green-100 text-green-800",
        emptyText: "No subjects assigned",
      })
      .add("qualification", "Qualification", {
        sortable: true,
        filterable: false,
      })
      .status("is_active", "Status", {
        activeLabel: "Active",
        inactiveLabel: "Inactive",
      })
      .actions("Actions", (teacher) => (
        <div className="flex items-center gap-3">
          <ActionButton variant="danger" onClick={() => handleDelete(teacher)}>
            Delete
          </ActionButton>
          <ActionButton variant="ghost" onClick={() => handleViewMore(teacher)}>
            View More
          </ActionButton>
        </div>
      ))
      .build();
  }, []);

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-600">Error loading teachers: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Dynamic Filter Component */}
      <DynamicFilter
        config={filterConfig}
        onFiltersChange={handleApiFiltersChange}
        initialFilters={apiFilters}
        className="mb-6"
      />

      {teachersData.length === 0 && !isPending ? (
        <div className="text-center py-8">
          <p className="text-gray-500">
            {debouncedSearch || Object.keys(apiFilters).length > 0
              ? `No teachers found matching your criteria`
              : "No teachers found."}
          </p>
        </div>
      ) : (
        <Table
          data={teachersData}
          columns={columns}
          rowKey="id"
          globalSearch={globalSearch}
          onGlobalSearch={handleGlobalSearchChange}
          theme="blue"
          responsive
          mobileBreakpoint={768}
          compact
          striped
          exportable
          exportOptions={{ csv: true, excel: true, pdf: true }}
          exportFileName="teachers-list"
          pagination
          paginationData={paginationInfo}
          onPageChange={handlePageChange}
          onPerPageChange={handlePerPageChange}
          perPageOptions={[1, 5, 10, 25, 50, 100]}
          sortable
          sortConfig={sortConfig}
          onSort={handleSort}
          selectable
          stickyHeader
          loading={isPending}
        />
      )}
    </div>
  );
};

export default TeacherList;
