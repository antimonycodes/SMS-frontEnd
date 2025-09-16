// utils/tableHelpers.ts
// import { TableColumn } from "../components/ui/ReusableTable";

import type { TableColumn } from "../components/ui/ReusableTable";

// Common column builders for reuse across tables
export class TableColumnBuilder<T> {
  private columns: TableColumn<T>[] = [];

  text(
    key: keyof T,
    header: string,
    options?: { sortable?: boolean; size?: number }
  ) {
    this.columns.push({
      accessorKey: key,
      header,
      enableSorting: options?.sortable ?? true,
      size: options?.size,
    });
    return this;
  }

  badge(
    key: keyof T,
    header: string,
    options?: {
      getColor?: (value: any) => string;
      getText?: (value: any) => string;
      sortable?: boolean;
    }
  ) {
    this.columns.push({
      accessorKey: key,
      header,
      cell: ({ getValue }) => {
        const value = getValue();
        const color = options?.getColor?.(value) || "gray";
        const text = options?.getText?.(value) || String(value);
        return (
          <span
            className={`px-2 py-1 text-xs rounded bg-${color}-100 text-${color}-800`}
          >
            {text}
          </span>
        );
      },
      enableSorting: options?.sortable ?? true,
    });
    return this;
  }

  currency(key: keyof T, header: string, options?: { sortable?: boolean }) {
    this.columns.push({
      accessorKey: key,
      header,
      cell: ({ getValue }) => {
        const value = getValue();
        return `$${Number(value).toLocaleString()}`;
      },
      enableSorting: options?.sortable ?? true,
    });
    return this;
  }

  date(
    key: keyof T,
    header: string,
    options?: { format?: "short" | "long"; sortable?: boolean }
  ) {
    this.columns.push({
      accessorKey: key,
      header,
      cell: ({ getValue }) => {
        const value = getValue();
        const date = new Date(value);
        return options?.format === "long"
          ? date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : date.toLocaleDateString();
      },
      enableSorting: options?.sortable ?? true,
    });
    return this;
  }

  tags(
    key: keyof T,
    header: string,
    options?: {
      getName?: (item: any) => string;
      getColor?: (item: any) => string;
      maxDisplay?: number;
      sortable?: boolean;
    }
  ) {
    this.columns.push({
      accessorKey: key,
      header,
      cell: ({ getValue }) => {
        const values = getValue() as any[];
        if (!Array.isArray(values) || values.length === 0) {
          return <span className="text-gray-500">None</span>;
        }

        const maxDisplay = options?.maxDisplay || 2;
        const displayItems = values.slice(0, maxDisplay);
        const remainingCount = values.length - maxDisplay;

        return (
          <div className="flex flex-wrap gap-1">
            {displayItems.map((item, index) => {
              const name = options?.getName
                ? options.getName(item)
                : String(item);
              const color = options?.getColor ? options.getColor(item) : "blue";
              return (
                <span
                  key={index}
                  className={`px-2 py-1 text-xs rounded bg-${color}-100 text-${color}-800`}
                >
                  {name}
                </span>
              );
            })}
            {remainingCount > 0 && (
              <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-600">
                +{remainingCount} more
              </span>
            )}
          </div>
        );
      },
      enableSorting: options?.sortable ?? false,
    });
    return this;
  }

  custom(
    id: string,
    header: string,
    cell: (props: any) => React.ReactNode,
    options?: {
      sortable?: boolean;
      size?: number;
    }
  ) {
    this.columns.push({
      id,
      header,
      cell,
      enableSorting: options?.sortable ?? false,
      size: options?.size,
    });
    return this;
  }

  build(): TableColumn<T>[] {
    return this.columns;
  }
}

// Common filter configurations
export const createFilterConfigs = (
  type: "teacher" | "student" | "course" | "custom",
  customConfigs?: any[]
) => {
  const commonFilters = {
    teacher: [
      {
        key: "search",
        type: "text" as const,
        label: "Search",
        placeholder: "Search teachers...",
      },
      {
        key: "status",
        type: "select" as const,
        label: "Status",
        placeholder: "All Statuses",
        options: [
          { label: "Active", value: "active" },
          { label: "Inactive", value: "inactive" },
        ],
      },
      {
        key: "qualification",
        type: "select" as const,
        label: "Qualification",
        options: [
          { label: "Bachelor's Degree", value: "bachelor" },
          { label: "Master's Degree", value: "master" },
          { label: "PhD", value: "phd" },
        ],
      },
      {
        key: "minSalary",
        type: "number" as const,
        label: "Min Salary",
        placeholder: "0",
      },
      {
        key: "maxSalary",
        type: "number" as const,
        label: "Max Salary",
        placeholder: "100000",
      },
    ],
    student: [
      {
        key: "search",
        type: "text" as const,
        label: "Search",
        placeholder: "Search students...",
      },
      {
        key: "grade",
        type: "select" as const,
        label: "Grade",
        options: Array.from({ length: 12 }, (_, i) => ({
          label: `Grade ${i + 1}`,
          value: `${i + 1}`,
        })),
      },
      {
        key: "status",
        type: "select" as const,
        label: "Status",
        options: [
          { label: "Active", value: "active" },
          { label: "Inactive", value: "inactive" },
          { label: "Graduated", value: "graduated" },
        ],
      },
    ],
    course: [
      {
        key: "search",
        type: "text" as const,
        label: "Search",
        placeholder: "Search courses...",
      },
      {
        key: "department",
        type: "select" as const,
        label: "Department",
        options: [
          { label: "Science", value: "science" },
          { label: "Mathematics", value: "math" },
          { label: "English", value: "english" },
          { label: "History", value: "history" },
        ],
      },
      {
        key: "minCredits",
        type: "number" as const,
        label: "Min Credits",
        min: 1,
        max: 10,
      },
    ],
    custom: customConfigs || [],
  };

  return commonFilters[type];
};
