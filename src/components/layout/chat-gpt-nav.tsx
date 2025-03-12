'use client';
import React from 'react';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar';
import { useGetconversation } from '@/api/chat-gpt';
import { ConversationList } from '@/constants/chat-gpt';
import Link from 'next/link';
import { Skeleton } from '../ui/skeleton';

type Props = {};

const ChatGptNav = (props: Props) => {
  const { conversations, conversationsLoading } = useGetconversation();

  if (conversationsLoading) {
    return (
      <div className='space-y-4'>
        <Skeleton className='h-[25px] w-full' />
        <Skeleton className='h-[25px] w-full' />
        <Skeleton className='h-[25px] w-full' />
        <Skeleton className='h-[25px] w-full' />
        <Skeleton className='h-[25px] w-full' />
      </div>
    );
  }
  const conversationData: ConversationList[] = conversations || [];

  return (
    <SidebarMenu>
      {conversationData?.length > 0 ? (
        conversationData.map((item) => (
          <SidebarMenuItem key={item.conversation_id}>
            <SidebarMenuButton asChild tooltip={item.conversation_name}>
              <Link href={`/chat-gpt/${item.conversation_id}`}>
                <span suppressHydrationWarning>{item.conversation_name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))
      ) : (
        <div>Belum ada aktivitas</div>
      )}
    </SidebarMenu>
  );
};

export default ChatGptNav;
