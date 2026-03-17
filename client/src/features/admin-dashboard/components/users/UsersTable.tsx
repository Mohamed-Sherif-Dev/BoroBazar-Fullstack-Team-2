// src/features/admin-dashboard/components/UsersTable.tsx
import { useMemo, useState, useEffect } from "react";
import { CalendarDays, Mail, Phone, Search, Trash2, X, Loader2 } from "lucide-react";
import type { UserItem } from "../../types/admin-dashboard.types";
import UsersTablePagination from "./UsersTablePagination";
import { api } from "../../../../services/api";

export default function UsersTable() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userToDelete, setUserToDelete] = useState<UserItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await api.getUsers();
        setUsers(result.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const keyword = search.toLowerCase();

      return (
        user.name.toLowerCase().includes(keyword) ||
        user.email.toLowerCase().includes(keyword) ||
        user.phone.toLowerCase().includes(keyword) ||
        user.createdAt.toLowerCase().includes(keyword)
      );
    });
  }, [users, search]);

  const totalItems = filteredUsers.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / rowsPerPage));
  const start = (currentPage - 1) * rowsPerPage;
  const paginatedUsers = filteredUsers.slice(start, start + rowsPerPage);

  const startIndex = totalItems === 0 ? 0 : start + 1;
  const endIndex = Math.min(start + rowsPerPage, totalItems);

  const confirmDelete = () => {
    if (userToDelete === null) return;
    setUsers((prev) => prev.filter((user) => user.id !== userToDelete.id));
    setUserToDelete(null);
  };

  const handleDeleteClick = (user: UserItem) => {
    setUserToDelete(user);
  };

  const handleRowsPerPageChange = (value: number) => {
    setRowsPerPage(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-gray-200 px-4 py-3 md:flex-row md:items-center md:justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Users List</h2>

        <div className="relative w-full md:w-[280px] lg:w-[320px]">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search here..."
            className="h-10 w-full rounded-md border border-gray-200 bg-gray-50 pl-9 pr-3 text-sm outline-none placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold uppercase text-gray-500">
              <th className="px-4 py-3">
                <input type="checkbox" />
              </th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">User Phone No</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center">
                  <div className="flex flex-col items-center justify-center space-y-3 text-gray-500">
                    <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
                    <p className="text-sm font-medium">Loading users...</p>
                  </div>
                </td>
              </tr>
            ) : paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-100">
                  <td className="px-4 py-4 align-top">
                    <input type="checkbox" />
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-start gap-3">
                      <img
                        src={user.image}
                        alt={user.name}
                        className="h-10 w-10 rounded-md object-cover"
                      />

                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>

                        <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                          <Mail size={12} />
                          <span>{user.email}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1 text-gray-700">
                      <Phone size={13} />
                      <span>{user.phone}</span>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1 text-gray-700">
                      <CalendarDays size={13} />
                      <span>{user.createdAt}</span>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <button
                      onClick={() => handleDeleteClick(user)}
                      className="rounded border border-red-200 px-3 py-1 text-xs font-medium text-red-500 transition hover:bg-red-50"
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <UsersTablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        totalItems={totalItems}
        startIndex={startIndex}
        endIndex={endIndex}
        onPrev={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        onNext={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        onRowsPerPageChange={handleRowsPerPageChange}
      />

      {userToDelete !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-red-100 bg-red-50 p-5">
              <h2 className="text-xl font-semibold text-red-700">Confirm Deletion</h2>
              <button
                onClick={() => setUserToDelete(null)}
                className="rounded-full p-2 text-red-400 hover:bg-red-100 hover:text-red-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 md:flex gap-6">
              <div className="mb-4 shrink-0 md:mb-0">
                <img
                  src={userToDelete.image}
                  alt={userToDelete.name}
                  className="h-24 w-24 rounded-lg object-cover shadow-sm border border-gray-100"
                />
              </div>

              <div className="flex-1 space-y-3">
                <div className="rounded-md bg-red-50 p-3 mb-3 border border-red-100">
                  <p className="text-sm text-red-800 font-medium">
                    Are you sure you want to delete this user? This action cannot be undone.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900">{userToDelete.name}</h3>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail size={16} className="text-gray-400" />
                    <span>{userToDelete.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone size={16} className="text-gray-400" />
                    <span>{userToDelete.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CalendarDays size={16} className="text-gray-400" />
                    <span>Joined: {userToDelete.createdAt}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 bg-gray-50 p-5 flex justify-end gap-3">
              <button
                onClick={() => setUserToDelete(null)}
                className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="rounded-lg bg-red-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 flex items-center gap-2"
              >
                <Trash2 size={16} />
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}