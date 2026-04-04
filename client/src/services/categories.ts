import { api } from "./axios";

export async function getCategories() {
  const res = await api.get("/categories");
  return res.data.data;
}

export async function createCategory(data: any) {
  const formData = new FormData();
  formData.append("name", data.name);
  if (data.subCategories && data.subCategories.length > 0) {
    formData.append("subCategories", JSON.stringify(data.subCategories));
  }
  if (data.image) {
    formData.append("image", data.image);
  }

  const res = await api.post("/categories", formData);
  return res.data.data;
}

export async function deleteCategory(id: string) {
  const res = await api.delete(`/categories/${id}`);
  return res.data;
}

export async function deleteSubCategory(id: string, subName: string) {
  const res = await api.delete(`/categories/${id}/sub/${encodeURIComponent(subName)}`);
  return res.data;
}

export async function addSubCategories(id: string, subCats: string[]) {
  const res = await api.patch(`/categories/${id}/sub`, { subCategories: subCats });
  return res.data;
}
