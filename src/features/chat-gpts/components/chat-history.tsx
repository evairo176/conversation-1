import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '@/components/ui/accordion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type ChatHistory = {
  chat_history_id: string;
  created_at: string;
  user_chat: string;
  ai_chat: string;
  reference_type: string[];
  reference_content: { link: string; web: string }[];
  reference_user: string[]; // Menampung URL gambar referensi
};

type ChatHistoryProps = {
  data: ChatHistory[];
};

export default function ChatHistoryList({ data }: ChatHistoryProps) {
  const [expandedChat, setExpandedChat] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastItemRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (lastItemRef.current) {
      lastItemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
      });
    }
  }, [data]);

  return (
    <ScrollArea ref={scrollRef} className='mb-4 max-h-screen overflow-auto'>
      <div className='space-y-4'>
        {data.map((chat, index) => (
          <Card
            key={chat.chat_history_id}
            ref={index === data.length - 1 ? lastItemRef : null}
          >
            <CardHeader>
              <CardTitle className='text-lg font-semibold'>
                {chat.user_chat}
              </CardTitle>
              <p className='text-xs text-gray-500'>{chat.created_at}</p>
            </CardHeader>
            <CardContent>
              <p className='line-clamp-2 text-gray-700'>{chat.ai_chat}</p>

              {/* Tampilkan Gambar jika ada dalam reference_user */}
              {chat?.reference_user?.length > 0 && (
                <div className='mt-4'>
                  <h3 className='text-sm font-semibold text-gray-700'>
                    Referensi Gambar:
                  </h3>
                  <div className='mt-2 flex flex-wrap gap-2'>
                    {chat?.reference_user?.map((imgUrl, imgIndex) => (
                      <Image
                        key={imgIndex}
                        src={imgUrl}
                        alt={`Reference Image ${imgIndex + 1}`}
                        width={200}
                        height={200}
                        className='rounded-lg shadow-md'
                      />
                    ))}
                  </div>
                </div>
              )}

              <Button
                variant='outline'
                className='mt-2'
                onClick={() =>
                  setExpandedChat(
                    expandedChat === chat.chat_history_id
                      ? null
                      : chat.chat_history_id
                  )
                }
              >
                {expandedChat === chat.chat_history_id
                  ? 'Sembunyikan'
                  : 'Lihat Detail'}
              </Button>
              {expandedChat === chat.chat_history_id && (
                <p className='mt-2 text-gray-700'>{chat.ai_chat}</p>
              )}
            </CardContent>

            {/* Referensi Text */}
            {chat.reference_content?.length > 0 && (
              <Accordion type='single' collapsible>
                <AccordionItem value='references'>
                  <AccordionTrigger className='mx-5'>
                    Referensi
                  </AccordionTrigger>
                  <AccordionContent className='mx-5'>
                    <ul className='list-disc pl-4'>
                      {chat.reference_content.map((ref, refIndex) => (
                        <li key={refIndex}>
                          <Link
                            href={ref.link}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-blue-500 hover:underline'
                          >
                            {ref.web}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}
