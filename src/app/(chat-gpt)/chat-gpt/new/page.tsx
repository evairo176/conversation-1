import PageContainer from '@/components/layout/page-container';
import ChatNew from '@/features/chat-gpts/components/chat-new';
import React from 'react';

type Props = {};

const Page = (props: Props) => {
  return (
    <PageContainer scrollable={true}>
      <div className='flex flex-1 flex-col'>
        <ChatNew />
      </div>
    </PageContainer>
  );
};

export default Page;
