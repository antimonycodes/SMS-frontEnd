// import {
//   ChevronLeft,
//   ChevronRight,
//   ChevronUp,
//   ChevronDown,
//   Search,
//   Filter,
//   X,
//   Download,
//   FileText,
//   Grid3X3,
//   GripVertical,
//   ChevronFirst,
//   ChevronLast,
// } from "lucide-react";
// import React, {
//   useState,
//   useMemo,
//   useCallback,
//   memo,
//   useRef,
//   useEffect,
// } from "react";
// import Loader from "./Loader";

// export interface Column<T> {
//   key: keyof T | string;
//   label: React.ReactNode;
//   render?: (value: T[keyof T], row: T, rowIndex: number) => React.ReactNode;
//   sortable?: boolean;
//   filterable?: boolean;
//   width?: string;
//   align?: "left" | "center" | "right";
//   sticky?: boolean;
//   exportable?: boolean;
//   order?: number; // For drag & drop ordering
// }

// interface PaginationData {
//   total: number;
//   per_page: number;
//   current_page: number;
//   last_page: number;
//   from: number;
//   to: number;
// }

// interface SortConfig {
//   key: string;
//   direction: "asc" | "desc";
// }

// interface FilterConfig {
//   [key: string]: string;
// }

// interface ExportOptions {
//   csv?: boolean;
//   pdf?: boolean;
//   excel?: boolean;
// }

// interface TableProps<T> {
//   columns: Column<T>[];
//   data: T[];
//   rowKey: keyof T | string;

//   // Pagination
//   pagination?: boolean;
//   paginationData?: PaginationData | null;
//   onPageChange?: (page: number) => void;
//   onPerPageChange?: (perPage: number) => void;
//   perPageOptions?: number[];

//   // Sorting
//   sortable?: boolean;
//   sortConfig?: SortConfig | null;
//   onSort?: (key: string, direction: "asc" | "desc") => void;

//   // Filtering
//   filterable?: boolean;
//   filters?: FilterConfig;
//   onFilter?: (filters: FilterConfig) => void;
//   globalSearch?: string;
//   onGlobalSearch?: (search: string) => void;

//   // Selection
//   selectable?: boolean;
//   selectedRows?: Set<string | number>;
//   onRowSelect?: (rowKey: string | number, selected: boolean) => void;
//   onSelectAll?: (selected: boolean) => void;

//   // Row interactions
//   onRowClick?: (row: T, rowIndex: number) => void;
//   clickableRows?: boolean;

//   // Styling & Themes
//   radius?: string;
//   stickyHeader?: boolean;
//   striped?: boolean;
//   compact?: boolean;
//   theme?: "light" | "dark" | "blue" | "green";

//   // States
//   loading?: boolean;
//   emptyMessage?: string;

//   // Advanced features
//   expandableRows?: boolean;
//   renderExpandedRow?: (row: T) => React.ReactNode;
//   expandedRows?: Set<string | number>;
//   onRowExpand?: (rowKey: string | number, expanded: boolean) => void;

//   // Export
//   exportable?: boolean;
//   exportOptions?: ExportOptions;
//   onExport?: (format: "csv" | "pdf" | "excel", data: T[]) => void;
//   exportFileName?: string;

//   // Drag & Drop
//   draggableColumns?: boolean;
//   onColumnReorder?: (newColumnOrder: Column<T>[]) => void;
//   draggableRows?: boolean;
//   onRowReorder?: (dragIndex: number, hoverIndex: number) => void;

//   // Performance
//   virtualized?: boolean;
//   rowHeight?: number;

//   // Responsive
//   responsive?: boolean;
//   mobileBreakpoint?: number;
// }

// // Memoized row component for performance
// const TableRow = memo(
//   <T extends Record<string, any>>({
//     row,
//     rowIndex,
//     columns,
//     rowKey,
//     selectable,
//     selectedRows,
//     expandableRows,
//     expandedRows,
//     onRowSelect,
//     onRowExpand,
//     onRowClick,
//     clickableRows,
//     striped,
//     compact,
//     theme,
//     renderExpandedRow,
//     responsive,
//   }: {
//     row: T;
//     rowIndex: number;
//     columns: Column<T>[];
//     rowKey: keyof T | string;
//     selectable?: boolean;
//     selectedRows?: Set<string | number>;
//     expandableRows?: boolean;
//     expandedRows?: Set<string | number>;
//     onRowSelect?: (rowKey: string | number, selected: boolean) => void;
//     onRowExpand?: (rowKey: string | number, expanded: boolean) => void;
//     onRowClick?: (row: T, rowIndex: number) => void;
//     clickableRows?: boolean;
//     striped?: boolean;
//     compact?: boolean;
//     theme?: string;
//     renderExpandedRow?: (row: T) => React.ReactNode;
//     responsive?: boolean;
//   }) => {
//     const isSelected = selectedRows?.has(String(row[rowKey]));
//     const isExpanded = expandedRows?.has(String(row[rowKey]));

//     const handleRowClick = useCallback(
//       (event: React.MouseEvent) => {
//         const target = event.target as HTMLElement;
//         if (
//           target.closest(
//             "button, a, input, select, textarea, [data-no-row-click]"
//           )
//         ) {
//           return;
//         }

//         if (clickableRows && onRowClick) {
//           onRowClick(row, rowIndex);
//         }
//       },
//       [clickableRows, onRowClick, row, rowIndex]
//     );

//     const handleRowSelect = useCallback(
//       (selected: boolean) => {
//         const key = String(row[rowKey]);
//         onRowSelect?.(key, selected);
//       },
//       [row, rowKey, onRowSelect]
//     );

//     const handleRowExpand = useCallback(() => {
//       const key = String(row[rowKey]);
//       const expanded = expandedRows?.has(key);
//       onRowExpand?.(key, !expanded);
//     }, [row, rowKey, expandedRows, onRowExpand]);

//     const getThemeClasses = () => {
//       const baseClasses = striped && rowIndex % 2 === 1 ? "bg-opacity-50" : "";
//       const selectedClasses = isSelected ? "ring-2 ring-inset" : "";
//       const hoverClasses = clickableRows ? "hover:bg-opacity-75" : "";

//       switch (theme) {
//         case "dark":
//           return `${baseClasses} ${selectedClasses} ${hoverClasses} bg-gray-800 text-white border-gray-700`;
//         case "blue":
//           return `${baseClasses} ${selectedClasses} ${hoverClasses} ${isSelected ? "bg-blue-50 ring-blue-200" : "bg-white"} ${striped && rowIndex % 2 === 1 ? "bg-blue-25" : ""}`;
//         case "green":
//           return `${baseClasses} ${selectedClasses} ${hoverClasses} ${isSelected ? "bg-green-50 ring-green-200" : "bg-white"} ${striped && rowIndex % 2 === 1 ? "bg-green-25" : ""}`;
//         default:
//           return `${baseClasses} ${selectedClasses} ${hoverClasses} ${isSelected ? "bg-blue-50 ring-blue-200" : "bg-white"} ${striped && rowIndex % 2 === 1 ? "bg-gray-50" : ""}`;
//       }
//     };

//     return (
//       <React.Fragment>
//         <tr
//           onClick={handleRowClick}
//           className={`
//           ${getThemeClasses()}
//           ${compact ? "h-10" : ""}
//           transition-all duration-150 cursor-pointer
//         `}
//         >
//           {/* Selection */}
//           {selectable && (
//             <td className="px-3 sm:px-6 py-2 sm:py-4">
//               <input
//                 type="checkbox"
//                 checked={isSelected}
//                 onChange={(e) => handleRowSelect(e.target.checked)}
//                 className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                 data-no-row-click="true"
//               />
//             </td>
//           )}

//           {/* Expand */}
//           {expandableRows && (
//             <td className="px-3 sm:px-6 py-2 sm:py-4">
//               <button
//                 onClick={handleRowExpand}
//                 className="text-gray-400 hover:text-gray-600"
//                 data-no-row-click="true"
//               >
//                 {isExpanded ? (
//                   <ChevronDown className="w-4 h-4" />
//                 ) : (
//                   <ChevronRight className="w-4 h-4" />
//                 )}
//               </button>
//             </td>
//           )}

//           {/* Data - Responsive handling */}
//           {responsive ? (
//             // Mobile: Stack columns vertically
//             <td className="px-3 sm:px-6 py-4 sm:hidden">
//               <div className="space-y-2">
//                 {columns.map((column, colIndex) => (
//                   <div key={colIndex} className="flex justify-between">
//                     <span className="font-medium text-gray-500 text-sm">
//                       {column.label}:
//                     </span>
//                     <span className="text-sm text-gray-900">
//                       {column.render
//                         ? column.render(row[column.key], row, rowIndex)
//                         : String(row[column.key] || "")}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </td>
//           ) : null}

//           {/* Desktop: Normal columns */}
//           {columns.map((column, colIndex) => (
//             <td
//               key={colIndex}
//               className={`px-3 sm:px-6 ${compact ? "py-2" : "py-4"} whitespace-nowrap text-sm text-gray-900 text-${column.align || "left"} ${
//                 column.sticky ? "sticky left-0 bg-inherit z-10" : ""
//               } ${responsive ? "hidden sm:table-cell" : ""}`}
//               style={{ width: column.width }}
//             >
//               {column.render
//                 ? column.render(row[column.key], row, rowIndex)
//                 : String(row[column.key] || "")}
//             </td>
//           ))}
//         </tr>

//         {/* Expanded Row */}
//         {expandableRows && isExpanded && renderExpandedRow && (
//           <tr className="bg-gray-50">
//             <td
//               colSpan={columns.length + (selectable ? 1 : 0) + 1}
//               className="px-6 py-4"
//             >
//               {renderExpandedRow(row)}
//             </td>
//           </tr>
//         )}
//       </React.Fragment>
//     );
//   }
// );

// // CSV Export utility
// const exportToCSV = <T extends Record<string, any>>(
//   data: T[],
//   columns: Column<T>[],
//   filename: string = "export"
// ) => {
//   const exportableColumns = columns.filter((col) => col.exportable !== false);
//   const headers = exportableColumns.map((col) => String(col.label)).join(",");
//   const rows = data.map((row) =>
//     exportableColumns
//       .map((col) => {
//         const value = row[col.key];
//         const stringValue = String(value || "");
//         // Escape commas and quotes
//         return stringValue.includes(",") || stringValue.includes('"')
//           ? `"${stringValue.replace(/"/g, '""')}"`
//           : stringValue;
//       })
//       .join(",")
//   );

//   const csvContent = [headers, ...rows].join("\n");
//   const blob = new Blob([csvContent], { type: "text/csv" });
//   const url = window.URL.createObjectURL(blob);
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = `${filename}.csv`;
//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);
//   window.URL.revokeObjectURL(url);
// };

// const Table = <T extends Record<string, any>>({
//   columns,
//   data,
//   rowKey,

//   // Pagination
//   pagination = true,
//   paginationData,
//   onPageChange,
//   onPerPageChange,
//   perPageOptions = [10, 20, 50, 100, 200],

//   // Sorting
//   sortable = false,
//   sortConfig,
//   onSort,

//   // Filtering
//   filterable = false,
//   filters = {},
//   onFilter,
//   globalSearch = "",
//   onGlobalSearch,

//   // Selection
//   selectable = false,
//   selectedRows = new Set(),
//   onRowSelect,
//   onSelectAll,

//   // Row interactions
//   onRowClick,
//   clickableRows = false,

//   // Styling & Themes
//   radius = "rounded-b-lg",
//   stickyHeader = false,
//   striped = false,
//   compact = false,
//   theme = "light",

//   // States
//   loading = false,
//   emptyMessage = "No data available",

//   // Advanced features
//   expandableRows = false,
//   renderExpandedRow,
//   expandedRows = new Set(),
//   onRowExpand,

//   // Export
//   exportable = false,
//   exportOptions = { csv: true },
//   onExport,
//   exportFileName = "table-export",

//   // Drag & Drop
//   draggableColumns = false,
//   onColumnReorder,

//   // Performance
//   virtualized = false,
//   rowHeight = 60,

//   // Responsive
//   responsive = true,
//   mobileBreakpoint = 768,
// }: TableProps<T>) => {
//   const [localFilters, setLocalFilters] = useState<FilterConfig>(filters);
//   const [showFilterRow, setShowFilterRow] = useState(false);
//   const [showExportMenu, setShowExportMenu] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const exportMenuRef = useRef<HTMLDivElement>(null);

//   // Responsive handling
//   useEffect(() => {
//     if (!responsive) return;

//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < mobileBreakpoint);
//     };

//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, [responsive, mobileBreakpoint]);

//   // Close export menu on outside click
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         exportMenuRef.current &&
//         !exportMenuRef.current.contains(event.target as Node)
//       ) {
//         setShowExportMenu(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Memoize processed data for performance
//   const processedData = useMemo(() => {
//     if (!data) return [];
//     return data;
//   }, [data]);

//   const isAllSelected =
//     selectedRows.size > 0 && selectedRows.size === data.length;
//   const isSomeSelected =
//     selectedRows.size > 0 && selectedRows.size < data.length;

//   // Theme classes
//   const getThemeClasses = () => {
//     switch (theme) {
//       case "dark":
//         return {
//           container: "bg-gray-900 border-gray-700",
//           header: "bg-gray-800 text-gray-200",
//           cell: "text-gray-200",
//           border: "border-gray-700",
//         };
//       case "blue":
//         return {
//           container: "bg-white border-blue-200",
//           header: "bg-blue-50 text-blue-900",
//           cell: "text-gray-900",
//           border: "border-blue-200",
//         };
//       case "green":
//         return {
//           container: "bg-white border-green-200",
//           header: "bg-green-50 text-green-900",
//           cell: "text-gray-900",
//           border: "border-green-200",
//         };
//       default:
//         return {
//           container: "bg-white border-[#EAECF0]",
//           header: "bg-[#F9FAFB] text-[#667085]",
//           cell: "text-[#101828]",
//           border: "border-[#EAECF0]",
//         };
//     }
//   };

//   const themeClasses = getThemeClasses();

//   // Handlers
//   const handleSort = useCallback(
//     (columnKey: string) => {
//       if (!onSort) return;

//       const direction =
//         sortConfig?.key === columnKey && sortConfig?.direction === "asc"
//           ? "desc"
//           : "asc";

//       onSort(columnKey, direction);
//     },
//     [sortConfig, onSort]
//   );

//   const handleFilterChange = useCallback(
//     (columnKey: string, value: string) => {
//       const newFilters = { ...localFilters, [columnKey]: value };
//       if (value === "") {
//         delete newFilters[columnKey];
//       }
//       setLocalFilters(newFilters);
//       onFilter?.(newFilters);
//     },
//     [localFilters, onFilter]
//   );

//   const handleSelectAll = useCallback(
//     (selected: boolean) => {
//       onSelectAll?.(selected);
//     },
//     [onSelectAll]
//   );

//   const handleExport = useCallback(
//     (format: "csv" | "pdf" | "excel") => {
//       if (onExport) {
//         onExport(format, processedData);
//       } else if (format === "csv") {
//         exportToCSV(processedData, columns, exportFileName);
//       }
//       setShowExportMenu(false);
//     },
//     [onExport, processedData, columns, exportFileName]
//   );

//   // Render methods
//   const renderSortIcon = (columnKey: string) => {
//     if (sortConfig?.key !== columnKey) {
//       return <ChevronUp className="w-4 h-4 opacity-30" />;
//     }
//     return sortConfig.direction === "asc" ? (
//       <ChevronUp className="w-4 h-4" />
//     ) : (
//       <ChevronDown className="w-4 h-4" />
//     );
//   };

//   const renderFilterRow = () => {
//     if (!showFilterRow) return null;

//     return (
//       <tr className={`${themeClasses.header} border-b ${themeClasses.border}`}>
//         {selectable && <th className="px-3 sm:px-6 py-3"></th>}
//         {expandableRows && <th className="px-3 sm:px-6 py-3"></th>}
//         {columns.map((column, index) => (
//           <th key={index} className="px-3 sm:px-6 py-3">
//             {column.filterable && (
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder={`Filter ${column.label}...`}
//                   value={localFilters[String(column.key)] || ""}
//                   onChange={(e) =>
//                     handleFilterChange(String(column.key), e.target.value)
//                   }
//                   className="w-full px-3 py-1 text-sm border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//                 {localFilters[String(column.key)] && (
//                   <button
//                     onClick={() => handleFilterChange(String(column.key), "")}
//                     className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                   >
//                     <X className="w-3 h-3" />
//                   </button>
//                 )}
//               </div>
//             )}
//           </th>
//         ))}
//       </tr>
//     );
//   };

//   // Show states
//   const showEmptyState = processedData.length === 0 && !loading;
//   const showLoader = loading && processedData.length === 0;

//   // Pagination logic
//   const currentPage = paginationData?.current_page || 1;
//   const totalPages = paginationData?.last_page || 1;
//   const startItem = paginationData?.from || 0;
//   const endItem = paginationData?.to || 0;
//   const totalItems = paginationData?.total || 0;
//   const perPage = paginationData?.per_page || perPageOptions[0];

//   const getPageItems = () => {
//     const items: (number | string)[] = [];

//     if (totalPages <= 7) {
//       for (let i = 1; i <= totalPages; i++) {
//         items.push(i);
//       }
//     } else {
//       items.push(1);

//       if (currentPage > 4) {
//         items.push("ellipsis-start");
//       }

//       const startPage = Math.max(2, currentPage - 1);
//       const endPage = Math.min(totalPages - 1, currentPage + 1);

//       for (let i = startPage; i <= endPage; i++) {
//         items.push(i);
//       }

//       if (currentPage < totalPages - 3) {
//         items.push("ellipsis-end");
//       }

//       if (totalPages > 1) {
//         items.push(totalPages);
//       }
//     }
//     return items;
//   };

//   return (
//     <div
//       className={`overflow-hidden shadow-sm ${themeClasses.container} border ${radius}`}
//     >
//       {/* Controls Bar */}
//       <div
//         className={`px-4 py-3 border-b ${themeClasses.border} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`}
//       >
//         {/* Left side - Search and Filters */}
//         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
//           {/* Global Search */}
//           {onGlobalSearch && (
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 value={globalSearch}
//                 onChange={(e) => onGlobalSearch(e.target.value)}
//                 className="pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
//               />
//             </div>
//           )}

//           {/* Filter Toggle */}
//           {filterable && (
//             <button
//               onClick={() => setShowFilterRow(!showFilterRow)}
//               className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
//                 showFilterRow
//                   ? "bg-blue-100 text-blue-700"
//                   : "text-gray-600 hover:bg-gray-100"
//               }`}
//             >
//               <Filter className="w-4 h-4" />
//               <span>Filters</span>
//             </button>
//           )}

//           {/* Active Filters */}
//           {Object.keys(localFilters).length > 0 && (
//             <div className="flex flex-wrap items-center gap-2">
//               {Object.entries(localFilters).map(([key, value]) => (
//                 <span
//                   key={key}
//                   className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
//                 >
//                   {key}: {value}
//                   <button
//                     onClick={() => handleFilterChange(key, "")}
//                     className="ml-1 hover:text-blue-900"
//                   >
//                     <X className="w-3 h-3" />
//                   </button>
//                 </span>
//               ))}
//               <button
//                 onClick={() => {
//                   setLocalFilters({});
//                   onFilter?.({});
//                 }}
//                 className="text-xs text-red-600 hover:text-red-800"
//               >
//                 Clear all
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Right side - Export */}
//         {exportable && (
//           <div className="relative" ref={exportMenuRef}>
//             <button
//               onClick={() => setShowExportMenu(!showExportMenu)}
//               className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
//             >
//               <Download className="w-4 h-4" />
//               <span>Export</span>
//             </button>

//             {showExportMenu && (
//               <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-[120px]">
//                 {exportOptions.csv && (
//                   <button
//                     onClick={() => handleExport("csv")}
//                     className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2 text-sm"
//                   >
//                     <FileText className="w-4 h-4" />
//                     <span>CSV</span>
//                   </button>
//                 )}
//                 {exportOptions.pdf && (
//                   <button
//                     onClick={() => handleExport("pdf")}
//                     className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2 text-sm"
//                   >
//                     <FileText className="w-4 h-4" />
//                     <span>PDF</span>
//                   </button>
//                 )}
//                 {exportOptions.excel && (
//                   <button
//                     onClick={() => handleExport("excel")}
//                     className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2 text-sm"
//                   >
//                     <Grid3X3 className="w-4 h-4" />
//                     <span>Excel</span>
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead
//             className={`${themeClasses.header} ${stickyHeader ? "sticky top-0 z-10" : ""}`}
//           >
//             <tr>
//               {/* Selection Column */}
//               {selectable && (
//                 <th className="px-3 sm:px-6 py-3 text-left">
//                   <input
//                     type="checkbox"
//                     checked={isAllSelected}
//                     ref={(input) => {
//                       if (input) input.indeterminate = isSomeSelected;
//                     }}
//                     onChange={(e) => handleSelectAll(e.target.checked)}
//                     className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                     data-no-row-click="true"
//                   />
//                 </th>
//               )}

//               {/* Expand Column */}
//               {expandableRows && (
//                 <th className="px-3 sm:px-6 py-3 text-left w-8"></th>
//               )}

//               {/* Data Columns */}
//               {(!responsive || !isMobile) &&
//                 columns.map((column, index) => (
//                   <th
//                     key={index}
//                     className={`px-3 sm:px-6 py-3 text-${column.align || "left"} text-xs font-medium uppercase tracking-wider ${
//                       column.sticky ? "sticky left-0 z-10" : ""
//                     } ${themeClasses.header}`}
//                     style={{ width: column.width }}
//                   >
//                     <div className="flex items-center space-x-1">
//                       <span>{column.label}</span>
//                       {(sortable || column.sortable) && (
//                         <button
//                           onClick={() => handleSort(String(column.key))}
//                           className="text-gray-400 hover:text-gray-600"
//                           data-no-row-click="true"
//                         >
//                           {renderSortIcon(String(column.key))}
//                         </button>
//                       )}
//                     </div>
//                   </th>
//                 ))}

//               {/* Mobile: Single column header */}
//               {responsive && isMobile && (
//                 <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Details
//                 </th>
//               )}
//             </tr>

//             {/* Filter Row */}
//             {renderFilterRow()}
//           </thead>

//           <tbody className={`divide-y ${themeClasses.border}`}>
//             {showLoader ? (
//               <tr>
//                 <td
//                   colSpan={
//                     columns.length +
//                     (selectable ? 1 : 0) +
//                     (expandableRows ? 1 : 0)
//                   }
//                   className="px-6 py-12 text-center"
//                 >
//                   <div className="flex justify-center">
//                     <Loader />
//                   </div>
//                 </td>
//               </tr>
//             ) : showEmptyState ? (
//               <tr>
//                 <td
//                   colSpan={
//                     columns.length +
//                     (selectable ? 1 : 0) +
//                     (expandableRows ? 1 : 0)
//                   }
//                   className="px-6 py-12 text-center text-sm text-gray-500"
//                 >
//                   {emptyMessage}
//                 </td>
//               </tr>
//             ) : (
//               processedData?.map((row, rowIndex) => (
//                 <TableRow
//                   key={String(row[rowKey])}
//                   row={row}
//                   rowIndex={rowIndex}
//                   columns={columns}
//                   rowKey={rowKey}
//                   selectable={selectable}
//                   selectedRows={selectedRows}
//                   expandableRows={expandableRows}
//                   expandedRows={expandedRows}
//                   onRowSelect={onRowSelect}
//                   onRowExpand={onRowExpand}
//                   onRowClick={onRowClick}
//                   clickableRows={clickableRows}
//                   striped={striped}
//                   compact={compact}
//                   theme={theme}
//                   renderExpandedRow={renderExpandedRow}
//                   responsive={responsive && isMobile}
//                 />
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Enhanced Pagination */}
//       {pagination && paginationData && totalPages > 0 && (
//         <div
//           className={`w-full flex flex-col sm:flex-row items-center justify-between px-4 py-3 border-t ${themeClasses.border} gap-4`}
//         >
//           {/* Left side - Info and Per Page */}
//           <div className="flex flex-col sm:flex-row items-center gap-4">
//             <div className="text-sm text-gray-500">
//               Showing {startItem} to {endItem} of {totalItems} entries
//               {selectedRows.size > 0 && (
//                 <span className="ml-2 text-blue-600">
//                   ({selectedRows.size} selected)
//                 </span>
//               )}
//             </div>

//             {/* Per Page Selector */}
//             {onPerPageChange && (
//               <div className="flex items-center space-x-2">
//                 <label className="text-sm text-gray-500">Show:</label>
//                 <select
//                   value={perPage}
//                   onChange={(e) => onPerPageChange(parseInt(e.target.value))}
//                   className="border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   {perPageOptions.map((option) => (
//                     <option key={option} value={option}>
//                       {option}
//                     </option>
//                   ))}
//                 </select>
//                 <span className="text-sm text-gray-500">per page</span>
//               </div>
//             )}
//           </div>

//           {/* Right side - Navigation */}
//           <div className="flex items-center gap-2">
//             {/* First Page */}
//             <button
//               onClick={() => onPageChange?.(1)}
//               disabled={currentPage <= 1}
//               className={`p-2 border border-gray-300 rounded-lg flex items-center text-gray-600 hover:bg-gray-50 ${
//                 currentPage <= 1
//                   ? "opacity-50 cursor-not-allowed"
//                   : "cursor-pointer"
//               }`}
//               type="button"
//               title="First page"
//             >
//               <ChevronFirst className="w-4 h-4" />
//             </button>

//             {/* Previous Button */}
//             <button
//               onClick={() => onPageChange?.(currentPage - 1)}
//               disabled={currentPage <= 1}
//               className={`px-3 py-2 border border-gray-300 rounded-lg flex items-center gap-2 text-gray-600 font-medium hover:bg-gray-50 ${
//                 currentPage <= 1
//                   ? "opacity-50 cursor-not-allowed"
//                   : "cursor-pointer"
//               }`}
//               type="button"
//             >
//               <ChevronLeft className="w-4 h-4" />
//               <span className="hidden sm:inline">Previous</span>
//             </button>

//             {/* Page Numbers */}
//             <div className="hidden md:flex items-center gap-1">
//               {getPageItems().map((item, index) =>
//                 typeof item === "number" ? (
//                   <button
//                     key={index}
//                     onClick={() => onPageChange?.(item)}
//                     type="button"
//                     className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
//                       item === currentPage
//                         ? "bg-blue-600 text-white border border-blue-600"
//                         : "text-gray-600 hover:bg-gray-50 border border-gray-300"
//                     }`}
//                   >
//                     {item}
//                   </button>
//                 ) : (
//                   <span key={item.toString()} className="text-gray-400 px-2">
//                     ...
//                   </span>
//                 )
//               )}
//             </div>

//             {/* Current page indicator for mobile/tablet */}
//             <div className="md:hidden flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
//               <span className="text-sm font-medium text-gray-600">
//                 {currentPage} / {totalPages}
//               </span>
//             </div>

//             {/* Next Button */}
//             <button
//               onClick={() => onPageChange?.(currentPage + 1)}
//               disabled={currentPage >= totalPages}
//               type="button"
//               className={`px-3 py-2 border border-gray-300 rounded-lg flex items-center gap-2 text-gray-600 font-medium hover:bg-gray-50 ${
//                 currentPage >= totalPages
//                   ? "opacity-50 cursor-not-allowed"
//                   : "cursor-pointer"
//               }`}
//             >
//               <span className="hidden sm:inline">Next</span>
//               <ChevronRight className="w-4 h-4" />
//             </button>

//             {/* Last Page */}
//             <button
//               onClick={() => onPageChange?.(totalPages)}
//               disabled={currentPage >= totalPages}
//               className={`p-2 border border-gray-300 rounded-lg flex items-center text-gray-600 hover:bg-gray-50 ${
//                 currentPage >= totalPages
//                   ? "opacity-50 cursor-not-allowed"
//                   : "cursor-pointer"
//               }`}
//               type="button"
//               title="Last page"
//             >
//               <ChevronLast className="w-4 h-4" />
//             </button>

//             {/* Jump to Page Input (for large datasets) */}
//             {totalPages > 10 && (
//               <div className="hidden lg:flex items-center space-x-2 ml-4">
//                 <span className="text-sm text-gray-500">Go to:</span>
//                 <input
//                   type="number"
//                   min="1"
//                   max={totalPages}
//                   className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   onKeyPress={(e) => {
//                     if (e.key === "Enter") {
//                       const page = parseInt(
//                         (e.target as HTMLInputElement).value
//                       );
//                       if (page >= 1 && page <= totalPages) {
//                         onPageChange?.(page);
//                         (e.target as HTMLInputElement).value = "";
//                       }
//                     }
//                   }}
//                   placeholder={currentPage.toString()}
//                 />
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Table;

import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Search,
  X,
  Download,
  FileText,
  Grid3X3,
  ChevronFirst,
  ChevronLast,
} from "lucide-react";
import React, {
  useState,
  useMemo,
  useCallback,
  memo,
  useRef,
  useEffect,
} from "react";
import Loader from "./Loader";

export interface Column<T> {
  key: keyof T | string;
  label: React.ReactNode;
  render?: (value: T[keyof T], row: T, rowIndex: number) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
  sticky?: boolean;
  exportable?: boolean;
  order?: number;
}

// Enhanced Filter Configuration Types
interface FilterOption {
  value: string;
  label: string;
}

interface FilterConfig {
  key: string;
  label: string;
  type: "select" | "multiselect" | "date" | "daterange" | "text" | "number";
  options?: FilterOption[];
  placeholder?: string;
  defaultValue?: any;
  gridCols?: 1 | 2 | 3; // How many grid columns this filter should span
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

interface FilterConfig2 {
  [key: string]: string;
}

interface ExportOptions {
  csv?: boolean;
  pdf?: boolean;
  excel?: boolean;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey: any;

  // Pagination
  pagination?: boolean;
  paginationData?: PaginationData | null;
  onPageChange?: (page: number) => void;
  onPerPageChange?: (perPage: number) => void;
  perPageOptions?: number[];

  // Sorting
  sortable?: boolean;
  sortConfig?: SortConfig | null;
  onSort?: (key: string, direction: "asc" | "desc") => void;

  // Enhanced Filtering
  filterable?: boolean;
  filters?: FilterConfig2;
  onFilter?: (filters: FilterConfig2) => void;
  globalSearch?: string;
  onGlobalSearch?: (search: string) => void;

  // NEW: Dynamic Filter Panel
  filterConfigs?: FilterConfig[];
  showFilterPanel?: boolean;
  onFiltersChange?: (filters: Record<string, any>) => void;

  // Selection
  selectable?: boolean;
  selectedRows?: Set<string | number>;
  onRowSelect?: (rowKey: string | number, selected: boolean) => void;
  onSelectAll?: (selected: boolean) => void;

  // Row interactions
  onRowClick?: (row: T, rowIndex: number) => void;
  clickableRows?: boolean;

  // Styling & Themes
  radius?: string;
  stickyHeader?: boolean;
  striped?: boolean;
  compact?: boolean;
  theme?: "light" | "dark" | "blue" | "green";

  // States
  loading?: boolean;
  emptyMessage?: string;

  // Advanced features
  expandableRows?: boolean;
  renderExpandedRow?: (row: T) => React.ReactNode;
  expandedRows?: Set<string | number>;
  onRowExpand?: (rowKey: string | number, expanded: boolean) => void;

  // Export
  exportable?: boolean;
  exportOptions?: ExportOptions;
  onExport?: (format: "csv" | "pdf" | "excel", data: T[]) => void;
  exportFileName?: string;

  // Drag & Drop
  draggableColumns?: boolean;
  onColumnReorder?: (newColumnOrder: Column<T>[]) => void;
  draggableRows?: boolean;
  onRowReorder?: (dragIndex: number, hoverIndex: number) => void;

  // Performance
  virtualized?: boolean;
  rowHeight?: number;

  // Responsive
  responsive?: boolean;
  mobileBreakpoint?: number;
}

// Memoized row component for performance (keeping your existing implementation)
const TableRow = memo(
  <T extends Record<string, any>>({
    row,
    rowIndex,
    columns,
    rowKey,
    selectable,
    selectedRows,
    expandableRows,
    expandedRows,
    onRowSelect,
    onRowExpand,
    onRowClick,
    clickableRows,
    striped,
    compact,
    theme,
    renderExpandedRow,
    responsive,
  }: {
    row: T;
    rowIndex: number;
    columns: Column<T>[];
    rowKey: keyof T | string;
    selectable?: boolean;
    selectedRows?: Set<string | number>;
    expandableRows?: boolean;
    expandedRows?: Set<string | number>;
    onRowSelect?: (rowKey: string | number, selected: boolean) => void;
    onRowExpand?: (rowKey: string | number, expanded: boolean) => void;
    onRowClick?: (row: T, rowIndex: number) => void;
    clickableRows?: boolean;
    striped?: boolean;
    compact?: boolean;
    theme?: string;
    renderExpandedRow?: (row: T) => React.ReactNode;
    responsive?: boolean;
  }) => {
    const isSelected = selectedRows?.has(String(row[rowKey]));
    const isExpanded = expandedRows?.has(String(row[rowKey]));

    const handleRowClick = useCallback(
      (event: React.MouseEvent) => {
        const target = event.target as HTMLElement;
        if (
          target.closest(
            "button, a, input, select, textarea, [data-no-row-click]"
          )
        ) {
          return;
        }

        if (clickableRows && onRowClick) {
          onRowClick(row, rowIndex);
        }
      },
      [clickableRows, onRowClick, row, rowIndex]
    );

    const handleRowSelect = useCallback(
      (selected: boolean) => {
        const key = String(row[rowKey]);
        onRowSelect?.(key, selected);
      },
      [row, rowKey, onRowSelect]
    );

    const handleRowExpand = useCallback(() => {
      const key = String(row[rowKey]);
      const expanded = expandedRows?.has(key);
      onRowExpand?.(key, !expanded);
    }, [row, rowKey, expandedRows, onRowExpand]);

    const getThemeClasses = () => {
      const baseClasses = striped && rowIndex % 2 === 1 ? "bg-opacity-50" : "";
      const selectedClasses = isSelected ? "ring-2 ring-inset" : "";
      const hoverClasses = clickableRows ? "hover:bg-opacity-75" : "";

      switch (theme) {
        case "dark":
          return `${baseClasses} ${selectedClasses} ${hoverClasses} bg-gray-800 text-white border-gray-700`;
        case "blue":
          return `${baseClasses} ${selectedClasses} ${hoverClasses} ${isSelected ? "bg-blue-50 ring-blue-200" : "bg-white"} ${striped && rowIndex % 2 === 1 ? "bg-blue-25" : ""}`;
        case "green":
          return `${baseClasses} ${selectedClasses} ${hoverClasses} ${isSelected ? "bg-green-50 ring-green-200" : "bg-white"} ${striped && rowIndex % 2 === 1 ? "bg-green-25" : ""}`;
        default:
          return `${baseClasses} ${selectedClasses} ${hoverClasses} ${isSelected ? "bg-blue-50 ring-blue-200" : "bg-white"} ${striped && rowIndex % 2 === 1 ? "bg-gray-50" : ""}`;
      }
    };

    return (
      <React.Fragment>
        <tr
          onClick={handleRowClick}
          className={`
          ${getThemeClasses()}
          ${compact ? "h-10" : ""}
          transition-all duration-150 cursor-pointer
        `}
        >
          {/* Selection */}
          {selectable && (
            <td className="px-3 sm:px-6 py-2 sm:py-4">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={(e) => handleRowSelect(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                data-no-row-click="true"
              />
            </td>
          )}

          {/* Expand */}
          {expandableRows && (
            <td className="px-3 sm:px-6 py-2 sm:py-4">
              <button
                onClick={handleRowExpand}
                className="text-gray-400 hover:text-gray-600"
                data-no-row-click="true"
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
            </td>
          )}

          {/* Data - Responsive handling */}
          {responsive ? (
            <td className="px-3 sm:px-6 py-4 sm:hidden">
              <div className="space-y-2">
                {columns.map((column, colIndex) => (
                  <div key={colIndex} className="flex justify-between">
                    <span className="font-medium text-gray-500 text-sm">
                      {column.label}:
                    </span>
                    <span className="text-sm text-gray-900">
                      {column.render
                        ? column.render(row[column.key], row, rowIndex)
                        : String(row[column.key] || "")}
                    </span>
                  </div>
                ))}
              </div>
            </td>
          ) : null}

          {/* Desktop: Normal columns */}
          {columns.map((column, colIndex) => (
            <td
              key={colIndex}
              className={`px-3 sm:px-6 ${compact ? "py-2" : "py-4"} whitespace-nowrap text-sm text-gray-900 text-${column.align || "left"} ${
                column.sticky ? "sticky left-0 bg-inherit z-10" : ""
              } ${responsive ? "hidden sm:table-cell" : ""}`}
              style={{ width: column.width }}
            >
              {column.render
                ? column.render(row[column.key], row, rowIndex)
                : String(row[column.key] || "")}
            </td>
          ))}
        </tr>

        {/* Expanded Row */}
        {expandableRows && isExpanded && renderExpandedRow && (
          <tr className="bg-gray-50">
            <td
              colSpan={columns.length + (selectable ? 1 : 0) + 1}
              className="px-6 py-4"
            >
              {renderExpandedRow(row)}
            </td>
          </tr>
        )}
      </React.Fragment>
    );
  }
);

// CSV Export utility (keeping your existing implementation)
const exportToCSV = <T extends Record<string, any>>(
  data: T[],
  columns: Column<T>[],
  filename: string = "export"
) => {
  const exportableColumns = columns.filter((col) => col.exportable !== false);
  const headers = exportableColumns.map((col) => String(col.label)).join(",");
  const rows = data.map((row) =>
    exportableColumns
      .map((col) => {
        const value = row[col.key];
        const stringValue = String(value || "");
        return stringValue.includes(",") || stringValue.includes('"')
          ? `"${stringValue.replace(/"/g, '""')}"`
          : stringValue;
      })
      .join(",")
  );

  const csvContent = [headers, ...rows].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};

const Table = <T extends Record<string, any>>({
  columns,
  data,
  rowKey,

  // Pagination
  pagination = true,
  paginationData,
  onPageChange,
  onPerPageChange,
  perPageOptions = [1, 10, 20, 50, 100, 200],

  // Sorting
  sortable = false,
  sortConfig,
  onSort,

  // Filtering
  filters = {},
  onFilter,
  globalSearch = "",
  onGlobalSearch,

  // NEW: Dynamic Filter Panel
  filterConfigs = [],
  onFiltersChange,

  // Selection
  selectable = false,
  selectedRows = new Set(),
  onRowSelect,
  onSelectAll,

  // Row interactions
  onRowClick,
  clickableRows = false,

  // Styling & Themes
  radius = "rounded-b-lg",
  stickyHeader = false,
  striped = false,
  compact = false,
  theme = "light",

  // States
  loading = false,
  emptyMessage = "No data available",

  // Advanced features
  expandableRows = false,
  expandedRows = new Set(),
  onRowExpand,

  // Export
  exportable = false,
  exportOptions = { csv: true },
  onExport,
  exportFileName = "table-export",

  // Drag & Drop
  // draggableColumns = false,
  // onColumnReorder,

  // Performance
  // virtualized = false,
  // rowHeight = 60,

  // Responsive
  responsive = true,
  mobileBreakpoint = 768,
}: TableProps<T>) => {
  const [localFilters, setLocalFilters] = useState<FilterConfig2>(filters);
  const [showFilterRow, setShowFilterRow] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const exportMenuRef = useRef<HTMLDivElement>(null);

  // NEW: Dynamic Filter Panel State
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [dynamicFilters, setDynamicFilters] = useState<Record<string, any>>({});

  // Responsive handling
  useEffect(() => {
    if (!responsive) return;

    const checkMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [responsive, mobileBreakpoint]);

  // Close export menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        exportMenuRef.current &&
        !exportMenuRef.current.contains(event.target as Node)
      ) {
        setShowExportMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Memoize processed data for performance
  const processedData = useMemo(() => {
    if (!data) return [];
    let result = data;

    // Apply dynamic filters
    Object.entries(dynamicFilters).forEach(([key, value]) => {
      if (!value) return;

      const config = filterConfigs.find((f) => f.key === key);
      if (!config) return;

      result = result.filter((row) => {
        const rowValue = row[key as keyof T];

        switch (config.type) {
          case "select":
            return String(rowValue) === String(value);

          case "multiselect":
            return Array.isArray(value)
              ? value.includes(String(rowValue))
              : true;

          case "text":
            return String(rowValue)
              .toLowerCase()
              .includes(String(value).toLowerCase());

          case "number":
            return String(rowValue).includes(String(value));

          case "date":
            return String(rowValue).includes(String(value));

          case "daterange":
            if (value.from && value.to) {
              const rowDate = new Date(rowValue as string);
              const fromDate = new Date(value.from);
              const toDate = new Date(value.to);
              return rowDate >= fromDate && rowDate <= toDate;
            }
            return true;

          default:
            return true;
        }
      });
    });

    // Apply global search
    if (globalSearch) {
      result = result.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(globalSearch.toLowerCase())
        )
      );
    }

    return result;
  }, [data, dynamicFilters, globalSearch, filterConfigs]);

  const isAllSelected =
    selectedRows.size > 0 && selectedRows.size === processedData.length;
  const isSomeSelected =
    selectedRows.size > 0 && selectedRows.size < processedData.length;

  // Theme classes
  const getThemeClasses = () => {
    switch (theme) {
      case "dark":
        return {
          container: "bg-gray-900 border-gray-700",
          header: "bg-gray-800 text-gray-200",
          cell: "text-gray-200",
          border: "border-gray-700",
        };
      case "blue":
        return {
          container: "bg-white border-blue-200",
          header: "bg-blue-50 text-blue-900",
          cell: "text-gray-900",
          border: "border-blue-200",
        };
      case "green":
        return {
          container: "bg-white border-green-200",
          header: "bg-green-50 text-green-900",
          cell: "text-gray-900",
          border: "border-green-200",
        };
      default:
        return {
          container: "bg-white border-[#EAECF0]",
          header: "bg-[#F9FAFB] text-[#667085]",
          cell: "text-[#101828]",
          border: "border-[#EAECF0]",
        };
    }
  };

  const themeClasses = getThemeClasses();

  // NEW: Dynamic Filter Handlers
  const handleDynamicFilterChange = useCallback(
    (key: string, value: any) => {
      const newFilters = { ...dynamicFilters, [key]: value };

      // Remove empty values
      if (
        !value ||
        value === "" ||
        (Array.isArray(value) && value.length === 0)
      ) {
        delete newFilters[key];
      }

      setDynamicFilters(newFilters);
      onFiltersChange?.(newFilters);
    },
    [dynamicFilters, onFiltersChange]
  );

  const clearAllDynamicFilters = useCallback(() => {
    setDynamicFilters({});
    onFiltersChange?.({});
  }, [onFiltersChange]);

  const activeFilterCount =
    Object.keys(dynamicFilters).length + (globalSearch ? 1 : 0);

  // Handlers (keeping your existing implementations)
  const handleSort = useCallback(
    (columnKey: string) => {
      if (!onSort) return;

      const direction =
        sortConfig?.key === columnKey && sortConfig?.direction === "asc"
          ? "desc"
          : "asc";

      onSort(columnKey, direction);
    },
    [sortConfig, onSort]
  );

  const handleFilterChange = useCallback(
    (columnKey: string, value: string) => {
      const newFilters = { ...localFilters, [columnKey]: value };
      if (value === "") {
        delete newFilters[columnKey];
      }
      setLocalFilters(newFilters);
      onFilter?.(newFilters);
    },
    [localFilters, onFilter]
  );

  const handleSelectAll = useCallback(
    (selected: boolean) => {
      onSelectAll?.(selected);
    },
    [onSelectAll]
  );

  const handleExport = useCallback(
    (format: "csv" | "pdf" | "excel") => {
      if (onExport) {
        onExport(format, processedData);
      } else if (format === "csv") {
        exportToCSV(processedData, columns, exportFileName);
      }
      setShowExportMenu(false);
    },
    [onExport, processedData, columns, exportFileName]
  );

  // NEW: Render Dynamic Filter Input
  const renderDynamicFilterInput = (config: FilterConfig) => {
    const value = dynamicFilters[config.key];

    switch (config.type) {
      case "select":
        return (
          <div className="relative">
            <select
              value={value || ""}
              onChange={(e) =>
                handleDynamicFilterChange(config.key, e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none pr-8"
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
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        );

      case "multiselect":
        return (
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {config.options?.map((option) => (
              <label key={option.value} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={(value || []).includes(option.value)}
                  onChange={(e) => {
                    const currentValues = value || [];
                    const newValues = e.target.checked
                      ? [...currentValues, option.value]
                      : currentValues.filter((v: string) => v !== option.value);
                    handleDynamicFilterChange(config.key, newValues);
                  }}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        );

      case "date":
        return (
          <div className="relative">
            <input
              type="date"
              value={value || ""}
              onChange={(e) =>
                handleDynamicFilterChange(config.key, e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder={config.placeholder}
            />
          </div>
        );

      case "daterange":
        return (
          <div className="grid grid-cols-2 gap-2">
            <div className="relative">
              <input
                type="date"
                value={value?.from || ""}
                onChange={(e) =>
                  handleDynamicFilterChange(config.key, {
                    ...value,
                    from: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                placeholder="From"
              />
            </div>
            <div className="relative">
              <input
                type="date"
                value={value?.to || ""}
                onChange={(e) =>
                  handleDynamicFilterChange(config.key, {
                    ...value,
                    to: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                placeholder="To"
              />
            </div>
          </div>
        );

      case "text":
        return (
          <input
            type="text"
            value={value || ""}
            onChange={(e) =>
              handleDynamicFilterChange(config.key, e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder={
              config.placeholder || `Filter by ${config.label.toLowerCase()}...`
            }
          />
        );

      case "number":
        return (
          <input
            type="number"
            value={value || ""}
            onChange={(e) =>
              handleDynamicFilterChange(config.key, e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder={
              config.placeholder || `Filter by ${config.label.toLowerCase()}...`
            }
          />
        );

      default:
        return null;
    }
  };

  // Render methods (keeping your existing implementations)
  const renderSortIcon = (columnKey: string) => {
    if (sortConfig?.key !== columnKey) {
      return <ChevronUp className="w-4 h-4 opacity-30" />;
    }
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  const renderFilterRow = () => {
    if (!showFilterRow) return null;

    return (
      <tr className={`${themeClasses.header} border-b ${themeClasses.border}`}>
        {selectable && <th className="px-3 sm:px-6 py-3"></th>}
        {expandableRows && <th className="px-3 sm:px-6 py-3"></th>}
        {columns.map((column, index) => (
          <th key={index} className="px-3 sm:px-6 py-3">
            {column.filterable && (
              <div className="relative">
                <input
                  type="text"
                  placeholder={`Filter ${column.label}...`}
                  value={localFilters[String(column.key)] || ""}
                  onChange={(e) =>
                    handleFilterChange(String(column.key), e.target.value)
                  }
                  className="w-full px-3 py-1 text-sm border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {localFilters[String(column.key)] && (
                  <button
                    onClick={() => handleFilterChange(String(column.key), "")}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            )}
          </th>
        ))}
      </tr>
    );
  };

  // Show states
  const showEmptyState = processedData.length === 0 && !loading;
  const showLoader = loading && processedData.length === 0;

  // Pagination logic (keeping your existing implementation)
  const currentPage = paginationData?.current_page || 1;
  const totalPages = paginationData?.last_page || 1;
  const startItem = paginationData?.from || 0;
  const endItem = paginationData?.to || 0;
  const totalItems = paginationData?.total || 0;
  const perPage = paginationData?.per_page || perPageOptions[0];

  const getPageItems = () => {
    const items: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      items.push(1);

      if (currentPage > 4) {
        items.push("ellipsis-start");
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        items.push(i);
      }

      if (currentPage < totalPages - 3) {
        items.push("ellipsis-end");
      }

      if (totalPages > 1) {
        items.push(totalPages);
      }
    }
    return items;
  };

  return (
    <div
      className={`overflow-hidden shadow-sm ${themeClasses.container} border ${radius}`}
    >
      {/* Enhanced Controls Bar */}
      <div
        className={`px-4 py-3 border-b ${themeClasses.border} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`}
      >
        {/* Left side - Search and Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Global Search */}
          {onGlobalSearch && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search patient name, department, etc..."
                value={globalSearch}
                onChange={(e) => onGlobalSearch(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent w-full sm:w-64"
              />
            </div>
          )}

          {/* Reset Button */}
          <button
            onClick={() => {
              clearAllDynamicFilters();
              if (onGlobalSearch) onGlobalSearch("");
            }}
            disabled={activeFilterCount === 0}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activeFilterCount > 0
                ? "text-gray-700 hover:bg-gray-50"
                : "text-gray-400 cursor-not-allowed"
            }`}
          >
            Reset
          </button>

          {/* Legacy Active Filters */}
          {Object.keys(localFilters).length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {Object.entries(localFilters).map(([key, value]) => (
                <span
                  key={key}
                  className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                >
                  {key}: {value}
                  <button
                    onClick={() => handleFilterChange(key, "")}
                    className="ml-1 hover:text-blue-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              <button
                onClick={() => {
                  setLocalFilters({});
                  onFilter?.({});
                }}
                className="text-xs text-red-600 hover:text-red-800"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Right side - Export */}
        {exportable && (
          <div className="relative" ref={exportMenuRef}>
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>

            {showExportMenu && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-[120px]">
                {exportOptions.csv && (
                  <button
                    onClick={() => handleExport("csv")}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2 text-sm"
                  >
                    <FileText className="w-4 h-4" />
                    <span>CSV</span>
                  </button>
                )}
                {exportOptions.pdf && (
                  <button
                    onClick={() => handleExport("pdf")}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2 text-sm"
                  >
                    <FileText className="w-4 h-4" />
                    <span>PDF</span>
                  </button>
                )}
                {exportOptions.excel && (
                  <button
                    onClick={() => handleExport("excel")}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2 text-sm"
                  >
                    <Grid3X3 className="w-4 h-4" />
                    <span>Excel</span>
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* NEW: Dynamic Filter Panel */}
      {showFilterPanel && filterConfigs.length > 0 && (
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filterConfigs.map((config) => (
              <div
                key={config.key}
                className={`space-y-2 ${config.gridCols ? `col-span-${config.gridCols}` : ""}`}
              >
                <label className="block text-sm font-medium text-gray-700">
                  {config.label}
                </label>
                {renderDynamicFilterInput(config)}
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-200">
            <button
              onClick={() => setShowFilterPanel(false)}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => setShowFilterPanel(false)}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Active Dynamic Filters Display */}
      {activeFilterCount > 0 && (
        <div className="p-3 bg-blue-50 border-b border-gray-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-blue-700 font-medium">
              Active filters:
            </span>

            {globalSearch && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                Search: {globalSearch}
                <button onClick={() => onGlobalSearch?.("")}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {Object.entries(dynamicFilters).map(([key, value]) => {
              const config = filterConfigs.find((f) => f.key === key);
              if (!config) return null;

              const displayValue =
                config.type === "multiselect" && Array.isArray(value)
                  ? `${value.length} selected`
                  : config.type === "daterange" && typeof value === "object"
                    ? `${value.from || ""} - ${value.to || ""}`
                    : String(value);

              return (
                <span
                  key={key}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                >
                  {config.label}: {displayValue}
                  <button onClick={() => handleDynamicFilterChange(key, "")}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              );
            })}

            <button
              onClick={clearAllDynamicFilters}
              className="text-xs text-red-600 hover:text-red-800 underline ml-2"
            >
              Clear all
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead
            className={`${themeClasses.header} ${stickyHeader ? "sticky top-0 z-10" : ""}`}
          >
            <tr>
              {/* Selection Column */}
              {selectable && (
                <th className="px-3 sm:px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    ref={(input) => {
                      if (input) input.indeterminate = isSomeSelected;
                    }}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    data-no-row-click="true"
                  />
                </th>
              )}

              {/* Expand Column */}
              {expandableRows && (
                <th className="px-3 sm:px-6 py-3 text-left w-8"></th>
              )}

              {/* Data Columns */}
              {(!responsive || !isMobile) &&
                columns.map((column, index) => (
                  <th
                    key={index}
                    className={`px-3 sm:px-6 py-3 text-${column.align || "left"} text-xs font-medium uppercase tracking-wider ${
                      column.sticky ? "sticky left-0 z-10" : ""
                    } ${themeClasses.header}`}
                    style={{ width: column.width }}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{column.label}</span>
                      {(sortable || column.sortable) && (
                        <button
                          onClick={() => handleSort(String(column.key))}
                          className="text-gray-400 hover:text-gray-600"
                          data-no-row-click="true"
                        >
                          {renderSortIcon(String(column.key))}
                        </button>
                      )}
                    </div>
                  </th>
                ))}

              {/* Mobile: Single column header */}
              {responsive && isMobile && (
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
              )}
            </tr>

            {/* Legacy Filter Row */}
            {renderFilterRow()}
          </thead>

          <tbody className={`divide-y ${themeClasses.border}`}>
            {showLoader ? (
              <tr>
                <td
                  colSpan={
                    columns.length +
                    (selectable ? 1 : 0) +
                    (expandableRows ? 1 : 0)
                  }
                  className="px-6 py-12 text-center"
                >
                  <div className="flex justify-center">
                    <Loader />
                  </div>
                </td>
              </tr>
            ) : showEmptyState ? (
              <tr>
                <td
                  colSpan={
                    columns.length +
                    (selectable ? 1 : 0) +
                    (expandableRows ? 1 : 0)
                  }
                  className="px-6 py-12 text-center text-sm text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              processedData?.map((row, rowIndex) => (
                <TableRow
                  key={String(row[rowKey])}
                  row={row}
                  rowIndex={rowIndex}
                  columns={columns}
                  rowKey={rowKey}
                  selectable={selectable}
                  selectedRows={selectedRows}
                  expandableRows={expandableRows}
                  expandedRows={expandedRows}
                  onRowSelect={onRowSelect}
                  onRowExpand={onRowExpand}
                  onRowClick={onRowClick}
                  clickableRows={clickableRows}
                  striped={striped}
                  compact={compact}
                  theme={theme}
                  // renderExpandedRow={renderExpandedRow}
                  responsive={responsive && isMobile}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Enhanced Pagination (keeping your existing implementation) */}
      {pagination && paginationData && totalPages > 0 && (
        <div
          className={`w-full flex flex-col sm:flex-row items-center justify-between px-4 py-3 border-t ${themeClasses.border} gap-4`}
        >
          {/* Left side - Info and Per Page */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="text-sm text-gray-500">
              Showing {startItem} to {endItem} of {totalItems} entries
              {selectedRows.size > 0 && (
                <span className="ml-2 text-blue-600">
                  ({selectedRows.size} selected)
                </span>
              )}
            </div>

            {/* Per Page Selector */}
            {onPerPageChange && (
              <div className="flex items-center space-x-2">
                <label className="text-sm text-gray-500">Show:</label>
                <select
                  value={perPage}
                  onChange={(e) => onPerPageChange(parseInt(e.target.value))}
                  className="border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {perPageOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <span className="text-sm text-gray-500">per page</span>
              </div>
            )}
          </div>

          {/* Right side - Navigation */}
          <div className="flex items-center gap-2">
            {/* First Page */}
            <button
              onClick={() => onPageChange?.(1)}
              disabled={currentPage <= 1}
              className={`p-2 border border-gray-300 rounded-lg flex items-center text-gray-600 hover:bg-gray-50 ${
                currentPage <= 1
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              type="button"
              title="First page"
            >
              <ChevronFirst className="w-4 h-4" />
            </button>

            {/* Previous Button */}
            <button
              onClick={() => onPageChange?.(currentPage - 1)}
              disabled={currentPage <= 1}
              className={`px-3 py-2 border border-gray-300 rounded-lg flex items-center gap-2 text-gray-600 font-medium hover:bg-gray-50 ${
                currentPage <= 1
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              type="button"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            {/* Page Numbers */}
            <div className="hidden md:flex items-center gap-1">
              {getPageItems().map((item, index) =>
                typeof item === "number" ? (
                  <button
                    key={index}
                    onClick={() => onPageChange?.(item)}
                    type="button"
                    className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                      item === currentPage
                        ? "bg-blue-600 text-white border border-blue-600"
                        : "text-gray-600 hover:bg-gray-50 border border-gray-300"
                    }`}
                  >
                    {item}
                  </button>
                ) : (
                  <span key={item.toString()} className="text-gray-400 px-2">
                    ...
                  </span>
                )
              )}
            </div>

            {/* Current page indicator for mobile/tablet */}
            <div className="md:hidden flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-600">
                {currentPage} / {totalPages}
              </span>
            </div>

            {/* Next Button */}
            <button
              onClick={() => onPageChange?.(currentPage + 1)}
              disabled={currentPage >= totalPages}
              type="button"
              className={`px-3 py-2 border border-gray-300 rounded-lg flex items-center gap-2 text-gray-600 font-medium hover:bg-gray-50 ${
                currentPage >= totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Last Page */}
            <button
              onClick={() => onPageChange?.(totalPages)}
              disabled={currentPage >= totalPages}
              className={`p-2 border border-gray-300 rounded-lg flex items-center text-gray-600 hover:bg-gray-50 ${
                currentPage >= totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              type="button"
              title="Last page"
            >
              <ChevronLast className="w-4 h-4" />
            </button>

            {/* Jump to Page Input (for large datasets) */}
            {totalPages > 10 && (
              <div className="hidden lg:flex items-center space-x-2 ml-4">
                <span className="text-sm text-gray-500">Go to:</span>
                <input
                  type="number"
                  min="1"
                  max={totalPages}
                  className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      const page = parseInt(
                        (e.target as HTMLInputElement).value
                      );
                      if (page >= 1 && page <= totalPages) {
                        onPageChange?.(page);
                        (e.target as HTMLInputElement).value = "";
                      }
                    }
                  }}
                  placeholder={currentPage.toString()}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
