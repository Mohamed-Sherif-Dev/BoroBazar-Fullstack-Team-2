import { useState } from "react";
import { ImageUp, X } from "lucide-react";
import type { UserItem } from "../../types/admin-dashboard.types";

type UserFormProps = {
  initialData?: UserItem | null;
  onSave: (user: Omit<UserItem, 'id' | 'createdAt'>) => void;
  onClose: () => void;
};

export default function UserForm({ initialData, onSave, onClose }: UserFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    image: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      image: formData.image ? URL.createObjectURL(formData.image) : (initialData?.image || "https://i.pravatar.cc/150?u=" + Date.now()),
    });
  };

  return (
    <section className="rounded-sm bg-[#f7f7f7] p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[26px] font-semibold text-[#4b4b4b]">
          {initialData ? "Edit User" : "Add User"}
        </h2>

        <button
          type="button"
          onClick={onClose}
          className="rounded-md p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-600"
          aria-label="Close form"
        >
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="border-2 border-[#1e90ff] bg-white p-2">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="mb-1 block text-[11px] text-[#444]">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="h-8 w-full border border-[#d9d9d9] px-2 text-[12px] outline-none focus:border-[#1e90ff]"
              />
            </div>

            <div>
              <label className="mb-1 block text-[11px] text-[#444]">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="h-8 w-full border border-[#d9d9d9] px-2 text-[12px] outline-none focus:border-[#1e90ff]"
              />
            </div>

            <div>
              <label className="mb-1 block text-[11px] text-[#444]">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="h-8 w-full border border-[#d9d9d9] px-2 text-[12px] outline-none focus:border-[#1e90ff]"
              />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="mb-2 text-[18px] font-semibold text-[#4b4b4b]">
            Profile Picture
          </h3>

          <label className="flex h-[95px] w-[95px] cursor-pointer flex-col items-center justify-center rounded border border-[#e3e3e3] bg-[#fafafa] text-[#a0a0a0] hover:bg-gray-100 transition">
            <ImageUp size={24} strokeWidth={1.8} />
            <span className="mt-2 text-[10px]">Upload</span>
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>

          {formData.image && (
            <p className="mt-2 text-[11px] text-gray-500">{formData.image.name}</p>
          )}
        </div>

        <div className="mt-8 flex gap-3">
          <button
            type="submit"
            className="h-11 min-w-[185px] rounded bg-[#11b886] px-6 text-[14px] font-medium text-white transition hover:bg-[#0fa679]"
          >
            {initialData ? "Update User" : "Save User"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="h-11 min-w-[120px] rounded border border-gray-300 bg-white px-6 text-[14px] font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
