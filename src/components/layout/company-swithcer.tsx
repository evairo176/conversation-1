'use client';

import * as React from 'react';
import { ChevronsUpDown, Plus } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar';
import { useSession } from 'next-auth/react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ScrollArea } from '../ui/scroll-area';

export function CompanySwitcher({
  company
}: {
  company: {
    id: string;
    name: string;
    logo: React.ElementType;
    plan: string;
  }[];
}) {
  const { isMobile } = useSidebar();
  const { data: session, update } = useSession();
  const [activeTeam, setActiveTeam] = React.useState(
    company?.find((row) => row.id === session?.user.companyId)
  );
  const router = useRouter();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                {activeTeam && <activeTeam.logo className='size-4' />}
              </div>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>
                  {activeTeam?.name}
                </span>
                <span className='truncate text-xs'>
                  {activeTeam?.plan} - ({session?.user.role.name})
                </span>
              </div>
              <ChevronsUpDown className='ml-auto' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
            align='start'
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className='text-xs text-muted-foreground'>
              {`Companies (${company?.length} total`})
            </DropdownMenuLabel>
            <ScrollArea
              className={cn(
                'w-full rounded-md border',
                company?.length > 3 && 'h-32'
              )}
            >
              {company
                .filter((row) => row.id === session?.user.companyId)
                .map((team, index) => (
                  <DropdownMenuItem
                    key={team.name}
                    onClick={() => {
                      if (session?.user.companyId === team.id) {
                        return;
                      }

                      setActiveTeam(team);
                      update({ companyId: team.id });
                      router.refresh();
                      toast.success(
                        `Berhasil mengganti perusahaan ${team.name}`
                      );
                    }}
                    className={cn(
                      'gap-2 p-2',
                      session?.user.companyId === team.id &&
                        'cursor-not-allowed bg-secondary'
                    )}
                  >
                    <div className='flex size-6 items-center justify-center rounded-sm border'>
                      <team.logo className='size-4 shrink-0' />
                    </div>
                    {team.name}
                    <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                  </DropdownMenuItem>
                ))}
              {company
                .filter((row) => row.id !== session?.user.companyId)
                .map((team, index) => (
                  <DropdownMenuItem
                    key={team.name}
                    onClick={() => {
                      if (session?.user.companyId === team.id) {
                        return;
                      }

                      setActiveTeam(team);
                      update({ companyId: team.id });
                      router.refresh();
                      toast.success(
                        `Berhasil mengganti perusahaan ${team.name}`
                      );
                    }}
                    className={cn(
                      'gap-2 p-2',
                      session?.user.companyId === team.id &&
                        'cursor-not-allowed bg-secondary'
                    )}
                  >
                    <div className='flex size-6 items-center justify-center rounded-sm border'>
                      <team.logo className='size-4 shrink-0' />
                    </div>
                    {team.name}
                    <DropdownMenuShortcut>⌘{index + 2}</DropdownMenuShortcut>
                  </DropdownMenuItem>
                ))}
            </ScrollArea>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                router.push('/dashboard/companies');
              }}
              className='gap-2 p-2'
            >
              <div className='flex size-6 items-center justify-center rounded-md border bg-background'>
                <Plus className='size-4' />
              </div>
              <div className='font-medium text-muted-foreground'>
                Add Company
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
