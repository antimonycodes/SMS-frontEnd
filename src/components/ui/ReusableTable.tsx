// components/ui/ReusableTable.tsx
import React, { useState, useEffect, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type SortingState,
  type PaginationState,
  type ColumnDef,
  //   ColumnDef,
  //   SortingState,
  //   PaginationState,
} from "@tanstack/react-table";

// Types
export interface TableColumn<T = any> {
  accessorKey?: keyof T;
  id?: string;
  header: string;
  cell?: (props: {
    getValue: () => any;
    row: { original: T };
  }) => React.ReactNode;
  enableSorting?: boolean;
  enableFiltering?: boolean;
  size?: number;
  minSize?: number;
  maxSize?: number;
}

export interface FilterConfig {
  key: string;
  type: "text" | "select" | "multiselect" | "number" | "date" | "daterange";
  label: string;
  placeholder?: string;
  options?: { label: string; value: any }[];
  min?: number;
  max?: number;
}

export interface TableAction<T = any> {
  label: string;
  onClick: (row: T) => void;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  show?: (row: T) => boolean;
  disabled?: (row: T) => boolean;
}

export interface ReusableTableProps<T = any> {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  error?: string | null;

  // Pagination
  pagination?: {
    pageIndex: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
  };

  // Sorting
  sorting?: SortingState;
  onSortingChange?: (sorting: SortingState) => void;

  // Filtering
  filters?: Record<string, any>;
  onFiltersChange?: (filters: Record<string, any>) => void;
  filterConfigs?: FilterConfig[];
  globalSearch?: string;
  onGlobalSearchChange?: (search: string) => void;

  // Actions
  actions?: TableAction<T>[];

  // Styling & Behavior
  title?: string;
  showFilters?: boolean;
  showPagination?: boolean;
  showGlobalSearch?: boolean;
  striped?: boolean;
  bordered?: boolean;
  compact?: boolean;
  stickyHeader?: boolean;
  maxHeight?: string;

  // Selection
  selectable?: boolean;
  selectedRows?: T[];
  onSelectionChange?: (selectedRows: T[]) => void;

  // Export
  exportable?: boolean;
  exportOptions?: {
    csv?: boolean;
    excel?: boolean;
    pdf?: boolean;
  };
  exportFileName?: string;

  // Empty state
  emptyMessage?: string;

  // Custom row props
  getRowProps?: (row: T) => React.HTMLAttributes<HTMLTableRowElement>;
}

const ReusableTable = <T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  error = null,
  pagination,
  sorting,
  onSortingChange,
  filters = {},
  onFiltersChange,
  filterConfigs = [],
  globalSearch = "",
  onGlobalSearchChange,
  actions = [],
  title,
  showFilters = true,
  showPagination = true,
  showGlobalSearch = true,
  striped = true,
  bordered = true,
  compact = false,
  stickyHeader = false,
  maxHeight,
  selectable = false,
  selectedRows = [],
  onSelectionChange,
  exportable = false,
  exportOptions = { csv: true },
  exportFileName = "table-export",
  emptyMessage = "No data available",
  getRowProps,
}: ReusableTableProps<T>) => {
  const [internalSorting, setInternalSorting] = useState<SortingState>([]);
  const [internalPagination, setInternalPagination] = useState<PaginationState>(
    {
      pageIndex: 0,
      pageSize: 10,
    }
  );
  const [rowSelection, setRowSelection] = useState({});

  // Build columns with actions
  const tableColumns = useMemo((): ColumnDef<T>[] => {
    const cols: ColumnDef<T>[] = [];

    // Selection column
    if (selectable) {
      cols.push({
        id: "select",
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
            className="rounded border-gray-300"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            className="rounded border-gray-300"
          />
        ),
        size: 50,
      });
    }

    // Data columns
    columns.forEach((col) => {
      cols.push({
        accessorKey: col.accessorKey as string,
        id: col.id || (col.accessorKey as string),
        header: col.header,
        cell: col.cell
          ? ({ getValue, row }) => col.cell!({ getValue, row })
          : undefined,
        enableSorting: col.enableSorting ?? true,
        size: col.size,
        minSize: col.minSize,
        maxSize: col.maxSize,
      });
    });

    // Actions column
    if (actions.length > 0) {
      cols.push({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            {actions
              .filter((action) => !action.show || action.show(row.original))
              .map((action, index) => (
                <button
                  key={index}
                  onClick={() => action.onClick(row.original)}
                  disabled={action.disabled?.(row.original)}
                  className={`px-3 py-1 text-xs rounded transition-colors ${getActionButtonClass(action.variant)} ${
                    action.disabled?.(row.original)
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {action.label}
                </button>
              ))}
          </div>
        ),
        size: actions.length * 80,
        enableSorting: false,
      });
    }

    return cols;
  }, [columns, actions, selectable]);

  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting: sorting || internalSorting,
      pagination: pagination
        ? {
            pageIndex: pagination.pageIndex,
            pageSize: pagination.pageSize,
          }
        : internalPagination,
      rowSelection: selectable ? rowSelection : {},
    },
    onSortingChange: onSortingChange || setInternalSorting,
    onPaginationChange: pagination ? undefined : setInternalPagination,
    onRowSelectionChange: selectable ? setRowSelection : undefined,
    manualPagination: !!pagination,
    manualSorting: !!onSortingChange,
    pageCount: pagination
      ? Math.ceil(pagination.total / pagination.pageSize)
      : undefined,
    enableRowSelection: selectable,
  });

  // Handle selection change
  useEffect(() => {
    if (selectable && onSelectionChange) {
      const selectedRowData = table
        .getSelectedRowModel()
        .rows.map((row) => row.original);
      onSelectionChange(selectedRowData);
    }
  }, [rowSelection, selectable, onSelectionChange, table]);

  // Pagination handlers
  const handlePageChange = (pageIndex: number) => {
    if (pagination) {
      pagination.onPageChange(pageIndex);
    } else {
      setInternalPagination((prev) => ({ ...prev, pageIndex }));
    }
  };

  const handlePageSizeChange = (pageSize: number) => {
    if (pagination) {
      pagination.onPageSizeChange(pageSize);
    } else {
      setInternalPagination((prev) => ({ ...prev, pageSize, pageIndex: 0 }));
    }
  };

  const getActionButtonClass = (variant?: string) => {
    switch (variant) {
      case "primary":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "danger":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "ghost":
        return "text-gray-600 hover:bg-gray-100";
      default:
        return "bg-gray-100 text-gray-700 hover:bg-gray-200";
    }
  };

  const updateFilter = (key: string, value: any) => {
    if (onFiltersChange) {
      onFiltersChange({ ...filters, [key]: value });
    }
  };

  const clearFilters = () => {
    if (onFiltersChange) {
      const clearedFilters = Object.keys(filters).reduce(
        (acc, key) => {
          acc[key] = "";
          return acc;
        },
        {} as Record<string, any>
      );
      onFiltersChange(clearedFilters);
    }
  };

  const activeFiltersCount = Object.values(filters).filter((value) => {
    if (Array.isArray(value)) return value.length > 0;
    return value !== "" && value !== null && value !== undefined;
  }).length;

  const renderFilter = (config: FilterConfig) => {
    const value = filters[config.key] || "";

    switch (config.type) {
      case "text":
        return (
          <input
            type="text"
            placeholder={config.placeholder}
            value={value}
            onChange={(e) => updateFilter(config.key, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        );

      case "select":
        return (
          <select
            value={value}
            onChange={(e) => updateFilter(config.key, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">
              {config.placeholder || `All ${config.label}`}
            </option>
            {config.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case "number":
        return (
          <input
            type="number"
            placeholder={config.placeholder}
            value={value}
            min={config.min}
            max={config.max}
            onChange={(e) => updateFilter(config.key, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        );

      default:
        return null;
    }
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      {title && (
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      )}

      {/* Filters */}
      {showFilters && filterConfigs.length > 0 && (
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Filters</h3>
            {activeFiltersCount > 0 && (
              <button
                onClick={clearFilters}
                className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
              >
                Clear All ({activeFiltersCount})
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filterConfigs.map((config) => (
              <div key={config.key}>
                <label className="block text-sm font-medium mb-1">
                  {config.label}
                </label>
                {renderFilter(config)}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Global Search */}
      {showGlobalSearch && onGlobalSearchChange && (
        <div className="flex justify-between items-center">
          <input
            type="text"
            placeholder="Search..."
            value={globalSearch}
            onChange={(e) => onGlobalSearchChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {selectable && selectedRows.length > 0 && (
            <span className="text-sm text-gray-600">
              {selectedRows.length} row(s) selected
            </span>
          )}
        </div>
      )}

      {/* Table */}
      <div
        className={`bg-white rounded-lg ${bordered ? "border" : ""} shadow-sm overflow-hidden`}
        style={{ maxHeight }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead
              className={`bg-gray-50 ${stickyHeader ? "sticky top-0 z-10" : ""}`}
            >
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                        header.column.getCanSort()
                          ? "cursor-pointer hover:bg-gray-100"
                          : ""
                      } ${compact ? "px-3 py-2" : "px-6 py-3"}`}
                      style={{ width: header.getSize() }}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center gap-2">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanSort() && (
                          <span className="text-gray-400">
                            {header.column.getIsSorted() === "desc"
                              ? " ↓"
                              : header.column.getIsSorted() === "asc"
                                ? " ↑"
                                : " ↕"}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td
                    colSpan={table.getVisibleLeafColumns().length}
                    className="px-6 py-4 text-center"
                  >
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      <span className="ml-2">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={table.getVisibleLeafColumns().length}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row, index) => (
                  <tr
                    key={row.id}
                    className={`hover:bg-gray-50 ${striped && index % 2 === 1 ? "bg-gray-25" : ""}`}
                    {...(getRowProps ? getRowProps(row.original) : {})}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className={`whitespace-nowrap text-sm text-gray-900 ${
                          compact ? "px-3 py-2" : "px-6 py-4"
                        }`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {showPagination && (
          <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-700">
                  Page {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount()}
                  {pagination && ` (${pagination.total} total records)`}
                </span>
                <select
                  value={table.getState().pagination.pageSize}
                  onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                  className="px-2 py-1 border border-gray-300 rounded text-sm"
                >
                  {[10, 20, 30, 50, 100].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handlePageChange(0)}
                  disabled={!table.getCanPreviousPage()}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded hover:bg-gray-200 disabled:opacity-50"
                >
                  First
                </button>
                <button
                  onClick={() =>
                    handlePageChange(table.getState().pagination.pageIndex - 1)
                  }
                  disabled={!table.getCanPreviousPage()}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded hover:bg-gray-200 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    handlePageChange(table.getState().pagination.pageIndex + 1)
                  }
                  disabled={!table.getCanNextPage()}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded hover:bg-gray-200 disabled:opacity-50"
                >
                  Next
                </button>
                <button
                  onClick={() => handlePageChange(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded hover:bg-gray-200 disabled:opacity-50"
                >
                  Last
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReusableTable;
