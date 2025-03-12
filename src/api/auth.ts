import { fetcherPost } from '@/lib/axios';
import { mutate } from 'swr';

export async function registerUser(newUser: any) {
  const response = await fetcherPost('/auth/register', newUser);

  mutate('/auth/user-register');

  return response;
}
