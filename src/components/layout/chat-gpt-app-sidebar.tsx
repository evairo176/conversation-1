'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from '@/components/ui/sidebar';
import {
  ChartArea,
  GalleryVerticalEnd,
  Pencil,
  Search,
  ShieldPlus,
  SquareMenu
} from 'lucide-react';

import * as React from 'react';
import ChatGptNav from './chat-gpt-nav';
import { Button } from '../ui/button';
import { useKBar } from 'kbar';
import Link from 'next/link';

export const company = {
  name: 'Acme Inc',
  logo: GalleryVerticalEnd,
  plan: 'Enterprise'
};

export default function ChatGptAppSidebar() {
  const { query } = useKBar();
  return (
    <Sidebar>
      {/* <Sidebar collapsible='icon'> */}
      <SidebarHeader>
        <div className='flex items-center justify-between'>
          <Button onClick={query.toggle} size={'icon'} variant={'ghost'}>
            <Search className='h-5 w-5' />
          </Button>
          <Button asChild size={'icon'} variant={'ghost'}>
            <Link href={'/chat-gpt/new'}>
              <Pencil className='h-5 w-5' />
            </Link>
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent className='overflow-x-hidden'>
        <SidebarGroup>
          <SidebarMenuButton tooltip={'Chat GPT'}>
            <ChartArea />
            <span>Chat GPT</span>
          </SidebarMenuButton>

          <SidebarMenuButton tooltip={'Explore Chat GPT'}>
            <SquareMenu />
            <span>Explore Chat GPT</span>
          </SidebarMenuButton>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Histories</SidebarGroupLabel>
          <React.Suspense fallback={<div>Loading...</div>}>
            <ChatGptNav />
          </React.Suspense>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Button variant={'ghost'} className='w-full py-10'>
              <ShieldPlus className='mr-2 h-6 w-6' />
              <div className='flex flex-col items-start'>
                <h3 className='text-[15px] font-semibold'> Tingkatkan paket</h3>
                <p className='text-[11px] text-gray-300'>
                  Lebih banyak akses ke model terbaik
                </p>
              </div>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
