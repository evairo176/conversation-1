'use client';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader, Send, Trash } from 'lucide-react';
import { addMessage, clearMessages } from '@/redux/slices/chat-gpt';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux';
import { v4 as uuidv4 } from 'uuid';
import { Textarea } from '@/components/ui/textarea';
import { insertConversation, useGetconversationDetail } from '@/api/chat-gpt';
import {
  ConversationDetail,
  DataConversationDetail
} from '@/constants/chat-gpt';
import ChatHistoryList from './chat-history';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

export default function ChatComponent({ id }: { id: string }) {
  const { conversations, conversationsLoading } = useGetconversationDetail(
    id as string
  );

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const sendMessage = async (session_id: string) => {
    if (!input.trim()) {
      toast.error('Silahkan masukan pertanyaan');
      return;
    }
    setIsLoading(true);

    try {
      const result = await insertConversation({
        session_id: session_id,
        prompt: input,
        is_external: true,
        image_path: []
      });

      router.push(result.conv_id);
      setInput('');
    } catch (err: any) {
      console.log('Error:', err.response?.data || err.message);
      toast.error(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  if (conversationsLoading) {
    return (
      <div>
        <Skeleton className='h-60 w-full' />
      </div>
    );
  }
  const conversationData: DataConversationDetail[] =
    conversations?.data?.map((row: any) => {
      return {
        ...row,
        reference_content: row?.reference_content.map((item: any) =>
          JSON.parse(item.replace(/'/g, '"'))
        )
      };
    }) || [];

  return (
    <div className='relative flex h-[90vh] flex-col'>
      <div>Conversation Name: {conversations?.conversation_name}</div>
      <ChatHistoryList data={conversationData} />

      <div className='sticky bottom-4 z-10 mt-4 flex items-center gap-2 bg-card'>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Type a message...'
          className='flex-1'
          disabled={isLoading}
        />
        <Button disabled={isLoading} onClick={() => sendMessage(id)}>
          {isLoading ? (
            <Loader size={20} className='animate-spin' />
          ) : (
            <Send size={20} />
          )}
        </Button>
      </div>
    </div>
  );
}
