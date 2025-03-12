import { useGetconversation } from '@/api/chat-gpt';
import { useRegisterActions } from 'kbar';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NavItem } from 'types';

const useMenu = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  const { conversations, conversationsLoading } = useGetconversation();
  const [menuBaru, setMenuBaru] = useState<NavItem[]>([]);
  const router = useRouter();
  const navigateTo = (url: string) => {
    router.push(url);
  };
  useEffect(() => {
    if (!conversationsLoading && conversations) {
      console.log('Updating menuBaru with conversations:', conversations);
      setMenuBaru(
        conversations.map((row: any) => ({
          title: row.conversation_name,
          url: row.conversation_id,
          moduleName: 'Conversation',
          label: row.conversation_name,
          description: ''
        }))
      );
    }
  }, [conversationsLoading, conversations]);

  // Konversi menuBaru menjadi actions
  const actions = menuBaru.flatMap((navItem) => {
    const baseAction =
      navItem.url !== '#'
        ? {
            id: `${navItem.title.toLowerCase()}Action`,
            name: navItem.title,
            keywords: navItem.title.toLowerCase(),
            section: 'Navigation',
            subtitle: `Go to ${navItem.title}`,
            perform: () => navigateTo(navItem.url)
          }
        : null;

    return baseAction ? [baseAction] : [];
  });

  const themeAction = [
    {
      id: 'toggleTheme',
      name: 'Toggle Theme',
      shortcut: ['t', 't'],
      section: 'Theme',
      perform: toggleTheme
    },
    {
      id: 'setLightTheme',
      name: 'Set Light Theme',
      section: 'Theme',
      perform: () => setTheme('light')
    },
    {
      id: 'setDarkTheme',
      name: 'Set Dark Theme',
      section: 'Theme',
      perform: () => setTheme('dark')
    }
  ];

  const combine = [...actions, ...themeAction];
  // Daftarkan actions ke kbar
  useRegisterActions(combine, [menuBaru]);
};

export { useMenu };
