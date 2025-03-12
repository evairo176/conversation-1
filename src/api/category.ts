import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';
import { fetcher, fetcherDelete, fetcherPost, fetcherPut } from '@/lib/axios';

export function useGetCategory(filters: {
  page?: number;
  limit?: number;
  search?: string;
  mainCategory?: string;
}) {
  const queryParams = new URLSearchParams({
    ...(filters.page && { page: String(filters.page) }),
    ...(filters.limit && { limit: String(filters.limit) }),
    ...(filters.search && { search: filters.search }),
    ...(filters.mainCategory && { 'main-category': filters.mainCategory })
  }).toString();

  // console.log(queryParams);
  const key = `/category${queryParams ? '?' + queryParams : ''}`; // Key untuk SWR

  const { data, isLoading, error, isValidating } = useSWR(
    key, // Gunakan query params dalam endpoint
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  const memoizedValue = useMemo(
    () => ({
      categorys: data?.data,
      meta: data?.meta,
      categorysLoading: isLoading,
      categorysError: error,
      categorysValidating: isValidating,
      categorysEmpty: !isLoading && (!data?.data || data?.data.length === 0)
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetCategoryByCompany(
  filters: {
    page?: number;
    limit?: number;
    search?: string;
    mainCategory?: string;
  },
  companyId: string
) {
  const queryParams = new URLSearchParams({
    ...(filters.page && { page: String(filters.page) }),
    ...(filters.limit && { limit: String(filters.limit) }),
    ...(filters.search && { search: filters.search }),
    ...(filters.mainCategory && { 'main-category': filters.mainCategory })
  }).toString();

  // console.log(queryParams);
  const key = `/category/company/${companyId}${queryParams ? '?' + queryParams : ''}`; // Key untuk SWR

  const { data, isLoading, error, isValidating } = useSWR(
    key, // Gunakan query params dalam endpoint
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  const memoizedValue = useMemo(
    () => ({
      categorys: data?.data,
      meta: data?.meta,
      categorysLoading: isLoading,
      categorysError: error,
      categorysValidating: isValidating,
      categorysEmpty: !isLoading && (!data?.data || data?.data.length === 0)
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetCategoryByCompanyNoFilter(companyId: string) {
  const key = `/category/company/${companyId}`; // Key untuk SWR

  const { data, isLoading, error, isValidating } = useSWR(
    key, // Gunakan query params dalam endpoint
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  const memoizedValue = useMemo(
    () => ({
      categories: data?.data,
      meta: data?.meta,
      categoriesLoading: isLoading,
      categoriesError: error,
      categoriesValidating: isValidating,
      categoriesEmpty: !isLoading && (!data?.data || data?.data.length === 0)
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export async function insertCategory(newCategory: {
  title: string;
  description?: string;
  companyId: string;
}) {
  const response = await fetcherPost('/category', newCategory);

  mutate(`/category/company/${newCategory.companyId}`);

  return response;
}

export async function updateCategory(
  newCategory: {
    title: string;
    description?: string;
    companyId: string;
  },
  id: string
) {
  const response = await fetcherPut(`/category/${id}`, newCategory);
  // 🔄 Refresh data di SWR setelah insert berhasil

  mutate(`/category/company/${newCategory.companyId}`);

  return response;
}

export async function deleteCategory(id: string, companyId: string) {
  const response = await fetcherDelete(`/category/${id}`);
  // 🔄 Refresh data di SWR setelah insert berhasil

  mutate(`/category/company/${companyId}`);

  return response;
}
