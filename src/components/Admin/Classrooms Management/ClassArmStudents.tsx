import { useQuery } from "@tanstack/react-query";
import { getClassArmDetailsQuery } from "../../../hooks/useClass";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { transformPaginationData } from "../Student/StudentList";
import { ActionButton, ColumnBuilder } from "../../ui/TableHelpers";
import Table from "../../ui/Table";
import DynamicFilter from "../../../shared/DynamicFilter";

const ClassArmStudents = ({ id }: any) => {
  const [globalSearch, setGlobalSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(2);
  const [apiFilters, setApiFilters] = useState<Record<string, string>>({});
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(
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
  const { data, isPending } = useQuery(
    getClassArmDetailsQuery(
      id,
      currentPage,
      perPage,
      debouncedSearch,
      apiFilters
    )
  );

  const studentList = data?.data?.students || [];
  const paginationData = data?.pagination;
  // Transform pagination data to match Table component expectations
  const paginationInfo = useMemo(() => {
    return transformPaginationData(paginationData);
  }, [paginationData]);

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

  // const handleSelectAll = useCallback(
  //   (selected: boolean) => {
  //     console.log("Select all triggered:", selected);
  //     if (selected) {
  //       // Select all visible students on current page
  //       const allCurrentPageIds = new Set(
  //         studentList.map((student: any) => student.id)
  //       );
  //       console.log("Selecting all current page IDs:", allCurrentPageIds);
  //       setSelectedRows(allCurrentPageIds);
  //     } else {
  //       console.log("Deselecting all");
  //       setSelectedRows(new Set());
  //     }
  //   },
  //   [studentList]
  // );

  // Fixed columns definition
  const columns = useMemo(() => {
    const builder = new ColumnBuilder<any>();
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
            onClick={() => student}
            data-no-row-click="true"
          >
            Delete
          </ActionButton>
          <ActionButton
            variant="ghost"
            onClick={() => student}
            data-no-row-click="true"
          >
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
  const filterConfig = {
    showSessions: true,
    // showClassLevels: true,
  };

  return (
    <div>
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
            // onSelectAll={handleSelectAll}
            // Expandable rows props
            expandableRows={true}
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
    </div>
  );
};

export default ClassArmStudents;
