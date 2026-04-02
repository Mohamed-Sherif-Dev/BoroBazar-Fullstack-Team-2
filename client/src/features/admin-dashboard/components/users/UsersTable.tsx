import { useCallback, useEffect, useState } from "react";
import { CalendarDays, Mail, Trash2, X, Loader2, Search, RefreshCcw, UserCircle2 } from "lucide-react";
import UsersTablePagination from "./UsersTablePagination";
import { api } from "../../../../services/api";

interface DBUser {
  _id: string;
  name: string;
  email: string;
  createdAt?: string;
}

interface Pagination {
  totalDocuments: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

export default function UsersTable() {
  const [users, setUsers] = useState<DBUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Pagination>({
    totalDocuments: 0,
    totalPages: 1,
    currentPage: 1,
    limit: 10,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");

  const [userToDelete, setUserToDelete] = useState<DBUser | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await api.getUsers({ page: currentPage, limit: rowsPerPage });

      if (result?.success) {
        setUsers(result.data.users);
        setPagination(result.data.pagination);
      } else {
        setError("Failed to fetch users.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [currentPage, rowsPerPage]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Client-side search on the current page
  const filteredUsers = search
    ? users.filter(
        (u) =>
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase())
      )
    : users;

  const handleRowsPerPageChange = (value: number) => {
    setRowsPerPage(value);
    setCurrentPage(1);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;
    setDeleting(true);
    try {
      await api.deleteUser(userToDelete._id);
      setUserToDelete(null);
      fetchUsers();
    } catch {
      // silently handle
    } finally {
      setDeleting(false);
    }
  };

  const startIndex = pagination.totalDocuments === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const endIndex = Math.min(currentPage * rowsPerPage, pagination.totalDocuments);

  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-gray-200 px-4 py-3 md:flex-row md:items-center md:justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          Users List
          <span className="ml-2 text-sm font-normal text-gray-400">
            ({pagination.totalDocuments} total)
          </span>
        </h2>

        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-[260px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users..."
              className="h-9 w-full rounded-md border border-gray-200 bg-gray-50 pl-9 pr-3 text-sm outline-none placeholder:text-gray-400 focus:border-blue-400"
            />
          </div>
          <button
            onClick={fetchUsers}
            className="rounded-md border border-gray-200 p-2 text-gray-500 hover:bg-gray-50"
            title="Refresh"
          >
            <RefreshCcw size={15} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold uppercase text-gray-500">
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="px-4 py-12 text-center">
                  <div className="flex flex-col items-center justify-center gap-2 text-gray-400">
                    <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
                    <p className="text-sm">Loading users...</p>
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center">
                  <p className="text-sm text-red-500">{error}</p>
                  <button onClick={fetchUsers} className="mt-2 text-xs text-blue-500 underline">Retry</button>
                </td>
              </tr>
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-400 shrink-0">
                        <UserCircle2 size={22} />
                      </div>
                      <span className="font-medium text-gray-900">{user.name}</span>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Mail size={13} className="text-gray-400" />
                      <span>{user.email}</span>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    {user.createdAt ? (
                      <div className="flex items-center gap-1 text-gray-500 text-xs">
                        <CalendarDays size={13} />
                        <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-xs">—</span>
                    )}
                  </td>

                  <td className="px-4 py-4 text-right">
                    <button
                      onClick={() => setUserToDelete(user)}
                      className="inline-flex items-center gap-1 rounded border border-red-200 px-3 py-1 text-xs font-medium text-red-500 transition hover:bg-red-50 hover:border-red-300"
                    >
                      <Trash2 size={13} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-gray-400">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <UsersTablePagination
        currentPage={currentPage}
        totalPages={pagination.totalPages}
        rowsPerPage={rowsPerPage}
        totalItems={pagination.totalDocuments}
        startIndex={startIndex}
        endIndex={endIndex}
        onPrev={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        onNext={() => setCurrentPage((prev) => Math.min(prev + 1, pagination.totalPages))}
        onRowsPerPageChange={handleRowsPerPageChange}
      />

      {/* Delete Confirmation Modal */}
      {userToDelete !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm overflow-hidden rounded-xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-red-100 bg-red-50 p-4">
              <h2 className="text-base font-semibold text-red-700">Delete User</h2>
              <button
                onClick={() => setUserToDelete(null)}
                className="rounded-full p-1.5 text-red-400 hover:bg-red-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 space-y-3">
              <div className="rounded-md bg-red-50 border border-red-100 p-3">
                <p className="text-sm text-red-800 font-medium">
                  Are you sure you want to delete this user? This action cannot be undone.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-400 shrink-0">
                  <UserCircle2 size={22} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{userToDelete.name}</p>
                  <p className="text-xs text-gray-500">{userToDelete.email}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 bg-gray-50 p-4 flex justify-end gap-3">
              <button
                onClick={() => setUserToDelete(null)}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 flex items-center gap-2 disabled:opacity-50"
              >
                {deleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}