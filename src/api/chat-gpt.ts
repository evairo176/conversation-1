import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';
import { fetcher, fetcherDelete, fetcherPost, fetcherPut } from '@/lib/axios';

export function useGetconversation() {
  const key = `/conversation-list`; // Key untuk SWR

  const { data, isLoading, error, isValidating } = useSWR(
    key, // Gunakan query params dalam endpoint
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );
  console.log(data);
  const memoizedValue = useMemo(
    () => ({
      conversations: data?.data,
      meta: data?.meta,
      conversationsLoading: isLoading,
      conversationsError: error,
      conversationsValidating: isValidating,
      conversationsEmpty: !isLoading && (!data?.data || data?.data.length === 0)
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetconversationDetail(id: string) {
  const key = `/conversation-detail/${id}`; // Key untuk SWR

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
      conversations: data,
      meta: data?.meta,
      conversationsLoading: isLoading,
      conversationsError: error,
      conversationsValidating: isValidating,
      conversationsEmpty: !isLoading && (!data?.data || data?.data.length === 0)
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetconversationByCompany(
  filters: {
    page?: number;
    limit?: number;
    search?: string;
    mainconversation?: string;
  },
  companyId: string
) {
  const queryParams = new URLSearchParams({
    ...(filters.page && { page: String(filters.page) }),
    ...(filters.limit && { limit: String(filters.limit) }),
    ...(filters.search && { search: filters.search }),
    ...(filters.mainconversation && {
      'main-conversation': filters.mainconversation
    })
  }).toString();

  // console.log(queryParams);
  const key = `/conversation/company/${companyId}${queryParams ? '?' + queryParams : ''}`; // Key untuk SWR

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
      conversations: data?.data,
      meta: data?.meta,
      conversationsLoading: isLoading,
      conversationsError: error,
      conversationsValidating: isValidating,
      conversationsEmpty: !isLoading && (!data?.data || data?.data.length === 0)
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetconversationByCompanyNoFilter(companyId: string) {
  const key = `/conversation/company/${companyId}`; // Key untuk SWR

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

export async function insertConversation(data: {
  session_id?: string;
  prompt: string;
  image_path: any;
  is_external: boolean;
}) {
  const key = `/conversation-detail/${data.session_id}`; // Key untuk SWR
  const response = await fetcherPost('/chatbot-inference', data);

  mutate(`/conversation-list`);
  mutate(key);

  return response;
}

export async function updateconversation(
  newconversation: {
    title: string;
    description?: string;
    companyId: string;
  },
  id: string
) {
  const response = await fetcherPut(`/conversation/${id}`, newconversation);
  // 🔄 Refresh data di SWR setelah insert berhasil

  mutate(`/conversation/company/${newconversation.companyId}`);

  return response;
}

export async function deleteconversation(id: string, companyId: string) {
  const response = await fetcherDelete(`/conversation/${id}`);
  // 🔄 Refresh data di SWR setelah insert berhasil

  mutate(`/conversation/company/${companyId}`);

  return response;
}
