'use client';
import React from 'react';
import ChatComponent from './components/chat';

type Props = {
  id: string;
};

const ChatGpt = ({ id }: Props) => {
  return <ChatComponent id={id} />;
};

export default ChatGpt;
