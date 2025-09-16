import { useState, type JSX } from "react";
import PageHeader from "../../../shared/PageHeader";
import Table from "../../ui/Table";
import CreateSubject from "./CreateSubject";
import { useQuery } from "@tanstack/react-query";
import {
  deleteSubjectQuery,
  getSubjectsQueryOptions,
} from "../../../hooks/queryOptions";
import Button from "../../ui/Button";
import DynamicFilter from "../../../shared/DynamicFilter";

// TypeScript interfaces
interface Teacher {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

interface Class {
  id: number;
  name: string;
}

interface Subject {
  id: number;
  name: string;
  subject_code: string;
  category: string;
  classes: Class[];
  teachers: Teacher[];
}

interface TableColumn {
  key: string;
  label: string;
  render?: (value: any, subject: Subject, rowIndex: number) => JSX.Element;
}

const SubjectPage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [globalSearch, setGlobalSearch] = useState<string>("");
  const [apiFilters, setApiFilters] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const columns: TableColumn[] = [
    { key: "name", label: "Subject Name" },
    { key: "subject_code", label: "Subject Code" },
    {
      key: "classes",
      label: "Classes",
      render: (value: Class[], subject: Subject) => (
        <div className="flex flex-wrap gap-1">
          {(value || []).map((cls) => (
            <span
              key={cls.id}
              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
            >
              {cls.name}
            </span>
          ))}
        </div>
      ),
    },
    {
      key: "teachers",
      label: "Teachers",
      render: (value: Teacher[], subject: Subject) => (
        <div className="space-y-1">
          {(value || []).length > 0 ? (
            (value || []).map((teacher) => (
              <div key={teacher.id} className="text-sm">
                {teacher.first_name} {teacher.last_name}
              </div>
            ))
          ) : (
            <span className="text-gray-400 text-sm">No teachers assigned</span>
          )}
        </div>
      ),
    },
    {
      key: "id",
      label: "",
      render: (Subject) => (
        <div>
          <Button onClick={() => handleDelete(Subject)} variant="delete">
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const {
    data: apiResponse,
    isPending,
    error,
  } = useQuery(
    getSubjectsQueryOptions(
      currentPage,
      perPage,
      debouncedSearch,
      apiFilters // Pass filters to API
    )
  );

  const { mutate: deleteSubject, isPending: isLoading } = deleteSubjectQuery();

  const handleDelete = (subjectsData: string) => {
    console.log("deleted", subjectsData);
    deleteSubject(subjectsData);
  };

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
        <p className="text-red-600">Error loading subjects: {error.message}</p>
      </div>
    );
  }

  // Handle both possible response structures
  const subjectsData: Subject[] = Array.isArray(apiResponse)
    ? apiResponse
    : apiResponse?.data?.subjects || apiResponse?.subjects || [];

  const handleSort = (key: string, direction: "asc" | "desc") => {
    console.log("Sorting by:", key, direction);
  };

  const handleApiFiltersChange = (filters: Record<string, string>) => {
    setApiFilters(filters);
  };

  const filterConfig = {
    // showClassArms: true,
    showSubjects: true,
    // showStatus: true,
    // showDateFilters: true,
    showClassLevels: true, // If teachers are associated with class levels
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Subjects Management"
        buttonText="Add New Subject"
        buttonClick={() => setOpenModal(true)}
      />
      <DynamicFilter
        config={filterConfig}
        onFiltersChange={handleApiFiltersChange}
        initialFilters={apiFilters}
        className="mb-6"
      />

      {subjectsData.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">
            No subjects found. Add your first subject to get started.
          </p>
        </div>
      ) : (
        <Table
          data={subjectsData}
          columns={columns}
          rowKey="id"
          globalSearch={globalSearch}
          onGlobalSearch={setGlobalSearch}
          theme="blue"
          responsive
          mobileBreakpoint={768}
          compact
          striped
          exportable
          exportOptions={{ csv: true, excel: true, pdf: true }}
          exportFileName="subjects-list"
          pagination
          perPageOptions={[10, 25, 50, 100]}
          sortable
          onSort={handleSort}
          selectable
          filterable
          stickyHeader
          draggableColumns
          draggableRows
        />
      )}

      {openModal && (
        <CreateSubject setOpenModal={setOpenModal} openModal={openModal} />
      )}
    </div>
  );
};

export default SubjectPage;
