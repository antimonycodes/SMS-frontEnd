import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getLeadershipRolesQuery,
  createLeadershipRoleQuery,
  updateLeadershipRoleQuery,
  deleteLeadershipRoleQuery,
} from "../../../hooks/leadership";

const RolesSetup = () => {
  const { data: roles, isLoading } = useQuery(getLeadershipRolesQuery());

  const createMutation = createLeadershipRoleQuery();
  const updateMutation = updateLeadershipRoleQuery();
  const deleteMutation = deleteLeadershipRoleQuery();

  const [form, setForm] = useState({ name: "", category: "" });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateMutation.mutate({ id: editingId, payload: form });
    } else {
      createMutation.mutate(form);
    }
    setForm({ name: "", category: "" });
    setEditingId(null);
    setIsModalOpen(false);
  };

  const handleEdit = (role: any) => {
    setForm({ name: role.name, category: role.category });
    setEditingId(role.id);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this role?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Leadership Roles</h1>
        <button
          onClick={() => {
            setForm({ name: "", category: "" });
            setEditingId(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          + Add Role
        </button>
      </div>

      {/* Roles Table */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles?.map((role) => (
              <tr key={role.id} className="border-t">
                <td className="p-2">{role.name}</td>
                <td className="p-2">
                  {role.category === "school_level"
                    ? "School Level"
                    : "Class Level"}
                </td>
                <td className="p-2 flex space-x-2">
                  <button
                    onClick={() => {
                      setEditingId(role.id);
                      setForm({ name: role.name, category: role.category });
                      setIsModalOpen(true);
                    }}
                    className="px-2 py-1 bg-yellow-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteMutation.mutate(role.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <h2 className="text-lg font-semibold mb-4">
              {editingId ? "Edit Role" : "Create Role"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Role Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="border p-2 rounded w-full"
                required
              />

              {/* Category dropdown */}
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="border p-2 rounded w-full"
                required
              >
                <option value="">Select Category</option>
                <option value="school_role">School Role</option>
                <option value="class_role">Class Role</option>
              </select>

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    createMutation.isPending || updateMutation.isPending
                  }
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  {editingId ? "Update" : "Create"}
                </button>
              </div>
            </form>

            {/* Close button top-right */}
            <button
              className="absolute top-2 right-2 text-gray-600"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RolesSetup;
