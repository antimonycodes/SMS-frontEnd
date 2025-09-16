import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getClassArmsQueryOption,
  getClassLevelsQueryOption,
  getSchoolTermQueryOption,
  getSubjectsQueryOptions,
  getSchoolSessionsQuery,
} from "../hooks/queryOptions";

interface FilterOption {
  value: string | number;
  label: string;
}

interface FilterConfig {
  showSubjects?: boolean;
  showClassArms?: boolean;
  showClassLevels?: boolean;
  showTerms?: boolean;
  showSessions?: boolean;
  showDateFilters?: boolean;
  showStatus?: boolean;
  customFilters?: {
    key: string;
    label: string;
    options: FilterOption[];
  }[];
}

interface DynamicFilterProps {
  config: FilterConfig;
  onFiltersChange: (filters: Record<string, string>) => void;
  initialFilters?: Record<string, string>;
  className?: string;
}

const DynamicFilter: React.FC<DynamicFilterProps> = ({
  config,
  onFiltersChange,
  initialFilters = {},
  className = "",
}) => {
  const [filters, setFilters] =
    useState<Record<string, string>>(initialFilters);

  // Fetch data based on config
  const { data: subjects } = useQuery({
    ...getSubjectsQueryOptions(),
    enabled: config.showSubjects,
  });

  const { data: classArms } = useQuery({
    ...getClassArmsQueryOption(),
    enabled: config.showClassArms,
  });

  const { data: classLevels } = useQuery({
    ...getClassLevelsQueryOption(),
    enabled: config.showClassLevels,
  });

  const { data: terms } = useQuery({
    ...getSchoolTermQueryOption(),
    enabled: config.showTerms,
  });

  const { data: sessions } = useQuery({
    ...getSchoolSessionsQuery(),
    enabled: config.showSessions,
  });
  console.log(sessions);

  // Update filters when they change
  useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleClearFilter = (key: string) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  };

  const handleClearAllFilters = () => {
    setFilters({});
  };

  const hasActiveFilters = Object.keys(filters).length > 0;

  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg p-4 ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={handleClearAllFilters}
            className="text-sm text-red-600 hover:text-red-800 font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* Subjects Filter */}
        {config.showSubjects && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <div className="relative">
              <select
                value={filters.subject_id || ""}
                onChange={(e) =>
                  handleFilterChange("subject_id", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Subjects</option>
                {subjects?.map((subject: any) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>
              {filters.subject_id && (
                <button
                  onClick={() => handleClearFilter("subject_id")}
                  className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        )}

        {/* Class Arms Filter */}
        {config.showClassArms && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Class Arm
            </label>
            <div className="relative">
              <select
                value={filters.class_arm_id || ""}
                onChange={(e) =>
                  handleFilterChange("class_arm_id", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Class Arms</option>
                {classArms?.map((arm: any) => (
                  <option key={arm.id} value={arm.id}>
                    {arm.name}
                  </option>
                ))}
              </select>
              {filters.class_arm_id && (
                <button
                  onClick={() => handleClearFilter("class_arm_id")}
                  className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        )}

        {/* Class Levels Filter */}
        {config.showClassLevels && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Class Level
            </label>
            <div className="relative">
              <select
                value={filters.class_level_id || ""}
                onChange={(e) =>
                  handleFilterChange("class_level_id", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Class Levels</option>
                {classLevels?.map((level: any) => (
                  <option key={level.id} value={level.id}>
                    {level.name}
                  </option>
                ))}
              </select>
              {filters.class_level_id && (
                <button
                  onClick={() => handleClearFilter("class_level_id")}
                  className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        )}

        {/* Terms Filter */}
        {config.showTerms && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Term
            </label>
            <div className="relative">
              <select
                value={filters.term_id || ""}
                onChange={(e) => handleFilterChange("term_id", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Terms</option>
                {terms?.map((term: any) => (
                  <option key={term.id} value={term.id}>
                    {term.name}
                  </option>
                ))}
              </select>
              {filters.term_id && (
                <button
                  onClick={() => handleClearFilter("term_id")}
                  className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        )}

        {/* Sessions Filter */}
        {config.showSessions && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Session
            </label>
            <div className="relative">
              <select
                value={filters.session_id || ""}
                onChange={(e) =>
                  handleFilterChange("session_id", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Sessions</option>
                {sessions?.map((session: any) => (
                  <option key={session.id} value={session.id}>
                    {session.name || session.session_name}
                  </option>
                ))}
              </select>
              {filters.session_id && (
                <button
                  onClick={() => handleClearFilter("session_id")}
                  className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        )}

        {/* Date Filters */}
        {config.showDateFilters && (
          <>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                From Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={filters.from_date || ""}
                  onChange={(e) =>
                    handleFilterChange("from_date", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {filters.from_date && (
                  <button
                    onClick={() => handleClearFilter("from_date")}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                To Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={filters.to_date || ""}
                  onChange={(e) =>
                    handleFilterChange("to_date", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {filters.to_date && (
                  <button
                    onClick={() => handleClearFilter("to_date")}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          </>
        )}

        {/* Status Filter */}
        {config.showStatus && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <div className="relative">
              <select
                value={filters.status || ""}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              {filters.status && (
                <button
                  onClick={() => handleClearFilter("status")}
                  className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        )}

        {/* Custom Filters */}
        {config.customFilters?.map((customFilter) => (
          <div key={customFilter.key} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {customFilter.label}
            </label>
            <div className="relative">
              <select
                value={filters[customFilter.key] || ""}
                onChange={(e) =>
                  handleFilterChange(customFilter.key, e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All {customFilter.label}</option>
                {customFilter.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {filters[customFilter.key] && (
                <button
                  onClick={() => handleClearFilter(customFilter.key)}
                  className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-700">
              Active filters:
            </span>
            {Object.entries(filters).map(([key, value]) => (
              <span
                key={key}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {key.replace(/_/g, " ").replace(/id$/, "").trim()}: {value}
                <button
                  onClick={() => handleClearFilter(key)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicFilter;
