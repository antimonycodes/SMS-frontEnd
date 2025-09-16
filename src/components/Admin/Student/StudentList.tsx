import { useNavigate } from "react-router-dom";
import Table from "../../ui/Table";
import { getStudentsQuery } from "../../../hooks/useStudent";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState, useCallback, useEffect } from "react";
import { ActionButton, ColumnBuilder } from "../../ui/TableHelpers";
import DynamicFilter from "../../../shared/DynamicFilter";

interface Student {
  id: string | number;
  admission_number: number;
  first_name: string;
  last_name: string;
  email: string;
  current_class: string;
}

// Transform API pagination to match Table component expected format
export const transformPaginationData = (apiPagination: any) => {
  if (!apiPagination) return null;

  // Calculate from/to values
  const currentPage = apiPagination.page || 1;
  const perPage = apiPagination.limit || 10;
  const total = apiPagination.total || 0;

  // Calculate from and to based on current page and limit
  const from = total > 0 ? (currentPage - 1) * perPage + 1 : 0;
  const to = Math.min(currentPage * perPage, total);

  return {
    total: total,
    per_page: perPage,
    current_page: currentPage,
    last_page: apiPagination.totalPages || 1,
    from: from,
    to: to,
  };
};

const StudentList = () => {
  const [globalSearch, setGlobalSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(2);
  const [apiFilters, setApiFilters] = useState<Record<string, string>>({});
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(
    new Set()
  );
  const [expandedRows, setExpandedRows] = useState<Set<string | number>>(
    new Set()
  );

  const navigate = useNavigate();

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(globalSearch);
    }, 300);
    return () => clearTimeout(timer);
  }, [globalSearch]);

  // Reset to first page when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, apiFilters]);

  // Clear selections when data changes (page, search, filters)
  useEffect(() => {
    setSelectedRows(new Set());
  }, [currentPage, debouncedSearch, apiFilters, perPage]);

  const handleViewMore = (student: Student) => {
    navigate(`/dashboard/student/${student.id}`, {
      state: { data: student },
    });
  };

  const handleDelete = (student: Student) => {
    console.log("Delete student:", student.id);
    // Implement delete logic with confirmation dialog
  };

  const {
    data: students,
    isPending,
    error,
  } = useQuery(
    getStudentsQuery(currentPage, perPage, debouncedSearch, apiFilters)
  );

  const studentList = students?.data?.students || [];

  // Transform pagination data to match Table component expectations
  const paginationInfo = useMemo(() => {
    return transformPaginationData(students?.pagination);
  }, [students?.pagination]);

  const filterConfig = {
    showClassArms: true,
    showClassLevels: true,
  };

  // Fixed pagination handlers
  const handlePageChange = useCallback((page: number) => {
    console.log("Changing to page:", page);
    setCurrentPage(page);
  }, []);

  const handlePerPageChange = useCallback((newPerPage: number) => {
    console.log("Changing per page to:", newPerPage);
    setPerPage(newPerPage);
    setCurrentPage(1); // Reset to first page
  }, []);

  const handleGlobalSearchChange = useCallback((search: string) => {
    setGlobalSearch(search);
  }, []);

  const handleApiFiltersChange = useCallback(
    (filters: Record<string, string>) => {
      setApiFilters(filters);
    },
    []
  );

  // Fixed selection handlers
  const handleRowSelect = useCallback(
    (rowKey: string | number, selected: boolean) => {
      setSelectedRows((prev) => {
        const newSet = new Set(prev);
        if (selected) {
          newSet.add(rowKey);
        } else {
          newSet.delete(rowKey);
        }
        console.log("Row selection changed:", { rowKey, selected, newSet });
        return newSet;
      });
    },
    []
  );

  // Fixed select all - should work with current page data only
  const handleSelectAll = useCallback(
    (selected: boolean) => {
      console.log("Select all triggered:", selected);
      if (selected) {
        // Select all visible students on current page
        const allCurrentPageIds: any = new Set(
          studentList.map((student: Student) => student.id)
        );
        console.log("Selecting all current page IDs:", allCurrentPageIds);
        setSelectedRows(allCurrentPageIds);
      } else {
        console.log("Deselecting all");
        setSelectedRows(new Set());
      }
    },
    [studentList]
  );

  const handleRowExpand = useCallback(
    (rowKey: string | number, expanded: boolean) => {
      setExpandedRows((prev) => {
        const newSet = new Set(prev);
        if (expanded) {
          newSet.add(rowKey);
        } else {
          newSet.delete(rowKey);
        }
        return newSet;
      });
    },
    []
  );

  // Fixed columns definition
  const columns = useMemo(() => {
    const builder = new ColumnBuilder<Student>();
    return builder
      .add("admission_number", "Admission Number", {
        sortable: true,
        filterable: true,
      })
      .add("first_name", "First Name", {
        sortable: true,
        filterable: true,
      })
      .add("last_name", "Last Name", {
        sortable: true,
        filterable: true,
      })
      .add("email", "Email", {
        sortable: true,
        filterable: true,
      })
      .add("current_class", "Class", {
        sortable: true,
        filterable: true,
      })
      .actions("Actions", (student) => (
        <div className="flex items-center gap-3">
          <ActionButton
            variant="danger"
            onClick={() => handleDelete(student)}
            data-no-row-click="true"
          >
            Delete
          </ActionButton>
          <ActionButton
            variant="ghost"
            onClick={() => handleViewMore(student)}
            data-no-row-click="true"
          >
            View More
          </ActionButton>
        </div>
      ))
      .build();
  }, []);

  // Debug logging
  useEffect(() => {
    console.log("Component state:", {
      currentPage,
      perPage,
      selectedRowsCount: selectedRows.size,
      studentListLength: studentList.length,
      paginationInfo,
    });
  }, [
    currentPage,
    perPage,
    selectedRows.size,
    studentList.length,
    paginationInfo,
  ]);

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
        <p className="text-red-600">Error loading students: {error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <DynamicFilter
        config={filterConfig}
        onFiltersChange={handleApiFiltersChange}
        initialFilters={apiFilters}
        className="mb-6"
      />
      {studentList.length === 0 && !isPending ? (
        <div className="text-center py-8">
          <p className="text-gray-500">
            {debouncedSearch || Object.keys(apiFilters).length > 0
              ? `No students found matching your criteria`
              : "No students found."}
          </p>
        </div>
      ) : (
        <Table
          data={studentList}
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
          exportFileName="student-list"
          // Pagination props
          pagination={true}
          paginationData={paginationInfo}
          onPageChange={handlePageChange}
          onPerPageChange={handlePerPageChange}
          perPageOptions={[1, 2, 10, 25, 50, 100]}
          // Selection props
          selectable={true}
          selectedRows={selectedRows}
          onRowSelect={handleRowSelect}
          onSelectAll={handleSelectAll}
          // Expandable rows props
          expandableRows={true}
          expandedRows={expandedRows}
          sortable={true}
          // filterable={true}
          stickyHeader={true}
          draggableColumns={false}
          draggableRows={false}
          clickableRows={false}
          loading={isPending}
        />
      )}
    </div>
  );
};

export default StudentList;
