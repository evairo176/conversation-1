import PageContainer from '@/components/layout/page-container';
import ChatGpt from '@/features/chat-gpts/chat-gpt';
export type paramsType = Promise<{ id: string }>;
export default async function Page({ params }: { params: paramsType }) {
  const { id } = await params;

  return (
    <PageContainer scrollable={true}>
      <div className='flex flex-1 flex-col'>
        <ChatGpt id={id} />
      </div>
    </PageContainer>
  );
}
