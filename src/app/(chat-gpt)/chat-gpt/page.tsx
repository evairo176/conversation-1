import PageContainer from '@/components/layout/page-container';
import ChatGpt from '@/features/chat-gpts/chat-gpt';
import { redirect } from 'next/navigation';
import React from 'react';

type Props = {};

const Page = (props: Props) => {
  return redirect('/chat-gpt/new');
};

export default Page;
