'use client';
import { insertConversation } from '@/api/chat-gpt';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader, Send, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

type Props = {};

const ChatNew = (props: Props) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const sendMessage = async () => {
    if (!input.trim()) {
      toast.error('Silahkan masukan pertanyaan');
      return;
    }
    setIsLoading(true);

    try {
      const result = await insertConversation({
        session_id: '',
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
  return (
    <div className='relative flex h-[90vh] flex-col'>
      <div className='sticky bottom-4 z-10 mt-4 flex items-center gap-2 bg-card'>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Type a message...'
          className='flex-1'
          disabled={isLoading}
        />
        <Button disabled={isLoading} onClick={sendMessage}>
          {isLoading ? (
            <Loader size={20} className='animate-spin' />
          ) : (
            <Send size={20} />
          )}
        </Button>
      </div>
    </div>
  );
};

export default ChatNew;
