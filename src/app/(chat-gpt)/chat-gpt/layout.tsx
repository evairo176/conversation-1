import KBar from '@/components/kbar';
import ChatGptAppSidebar from '@/components/layout/chat-gpt-app-sidebar';
import ChatGptHeader from '@/components/layout/chat-gpt-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import authOptions from '@/lib/auth.config';
import { getServerSession } from 'next-auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // Persisting the sidebar state in the cookie.
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';

  const session = await getServerSession(authOptions);
  // console.log(session);

  if (session === null) {
    return redirect('/login');
  }
  return (
    <KBar>
      <SidebarProvider defaultOpen={defaultOpen}>
        <ChatGptAppSidebar />
        <SidebarInset>
          <ChatGptHeader />
          {/* page main content */}
          {children}
          {/* page main content ends */}
        </SidebarInset>
      </SidebarProvider>
    </KBar>
  );
}
