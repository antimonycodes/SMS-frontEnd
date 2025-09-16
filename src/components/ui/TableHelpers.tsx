import React from "react";

// Your existing Column interface (from your Table component)
interface Column<T> {
  key: keyof T | string;
  label: React.ReactNode;
  render?: (value: T[keyof T], row: T, rowIndex: number) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
  sticky?: boolean;
  exportable?: boolean;
}

// Format label utility
function formatLabel(key: string): string {
  return key
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

// Column Builder Class - THIS IS THE MAIN ADDITION
export class ColumnBuilder<T extends Record<string, any>> {
  private columns: Column<T>[] = [];

  add(key: keyof T, label?: string, options?: Partial<Column<T>>): this {
    this.columns.push({
      key,
      label: label || formatLabel(String(key)),
      ...options,
    });
    return this;
  }

  custom(
    key: keyof T | string,
    label: string,
    render: (value: any, row: T, rowIndex: number) => React.ReactNode,
    options?: Partial<Column<T>>
  ): this {
    this.columns.push({
      key: key as keyof T,
      label,
      render,
      ...options,
    });
    return this;
  }

  status(
    key: keyof T,
    label: string = "Status",
    options: {
      activeLabel?: string;
      inactiveLabel?: string;
      activeClass?: string;
      inactiveClass?: string;
    } = {}
  ): this {
    const {
      activeLabel = "Active",
      inactiveLabel = "Inactive",
      activeClass = "bg-green-100 text-green-800",
      inactiveClass = "bg-red-100 text-red-800",
    } = options;

    this.columns.push({
      key,
      label,
      render: (value: boolean) => (
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            value ? activeClass : inactiveClass
          }`}
        >
          {value ? activeLabel : inactiveLabel}
        </span>
      ),
    });
    return this;
  }

  tags(
    key: keyof T,
    label: string,
    options: {
      getName?: (item: any) => string;
      getKey?: (item: any) => string | number;
      className?: string;
      emptyText?: string;
    } = {}
  ): this {
    const {
      getName = (item) => item?.name || String(item),
      getKey = (item, index) => item?.id || index,
      className = "bg-blue-100 text-blue-800",
      emptyText = "No items",
    } = options;

    this.columns.push({
      key,
      label,
      render: (items: any[]) => (
        <div className="flex flex-wrap gap-1">
          {(items || []).length > 0 ? (
            items.map((item, index) => (
              <span
                key={getKey(item, index)}
                className={`text-xs px-2 py-1 rounded-full ${className}`}
              >
                {getName(item)}
              </span>
            ))
          ) : (
            <span className="text-gray-400 text-sm">{emptyText}</span>
          )}
        </div>
      ),
    });
    return this;
  }

  actions(
    label: string = "Actions",
    render: (row: T, rowIndex: number) => React.ReactNode
  ): this {
    this.columns.push({
      key: "actions" as keyof T,
      label,
      render: (_, row, rowIndex) => render(row, rowIndex),
      sortable: false,
      filterable: false,
      exportable: false,
    });
    return this;
  }

  date(
    key: keyof T,
    label?: string,
    format: (date: string | Date) => string = (date) =>
      new Date(date).toLocaleDateString()
  ): this {
    this.columns.push({
      key,
      label: label || formatLabel(String(key)),
      render: (value: string | Date) => (value ? format(value) : "-"),
    });
    return this;
  }

  currency(
    key: keyof T,
    label?: string,
    options: {
      currency?: string;
      locale?: string;
    } = {}
  ): this {
    const { currency = "USD", locale = "en-US" } = options;

    this.columns.push({
      key,
      label: label || formatLabel(String(key)),
      render: (value: number) =>
        value != null
          ? new Intl.NumberFormat(locale, {
              style: "currency",
              currency,
            }).format(value)
          : "-",
      align: "right",
    });
    return this;
  }

  build(): Column<T>[] {
    return this.columns;
  }
}

// Action Button Component
export const ActionButton = ({
  variant = "primary",
  size = "sm",
  onClick,
  children,
  ...props
}: {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md";
  onClick: () => void;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const baseClass = `inline-flex items-center justify-center font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors`;

  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary:
      "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    ghost:
      "text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:ring-gray-500",
  };

  const sizeClasses = {
    sm: "px-2 py-1 text-xs rounded",
    md: "px-4 py-2 text-sm rounded-md",
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation(); // Prevents row click when clicking button
        onClick();
      }}
      className={`${baseClass} ${variantClasses[variant]} ${sizeClasses[size]}`}
      data-no-row-click="true"
      {...props}
    >
      {children}
    </button>
  );
};

// Export the type for your existing Table component
export type { Column };
