"use client";

import { useState} from "react";
import ChatInputField from "./components/chat";
import styles from './chatpage.module.css';
import OpenAI from 'openai';
import Header from './components/header';


export default function ChatPage() {
  const [messages, setMessages] = useState<OpenAI.Chat.ChatCompletionMessageParam[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const submitModelRequest = async () => {
    const newMessage: OpenAI.Chat.ChatCompletionMessageParam = {
      role: 'user',
      content: currentQuestion,
    };
    const newMessages = [...messages, newMessage];


    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages: newMessages }),
    }).then((response) => {
      if (response.body) {
        const reader = response.body.getReader();
        let responseText = '';
        const stream = new ReadableStream({
          async start(controller) {
            while (true) {
              const { done, value } = await reader.read();
              if (done) {
                break;
              }
              const chunk = new TextDecoder().decode(value);
              responseText += chunk;
              setMessages(
                [...newMessages,
                { "role": "assistant", "content": responseText }]
              );

              controller.enqueue(value);
            }
            controller.close();
            reader.releaseLock();
          }
        })
      }
    })

  }

  return (<div> <Header />
    <main className={styles.mainContainer}>
      {/* Your other components */}


      <ChatInputField
        onSearchButtonClick={() => {
          console.log('Search button clicked with question:', currentQuestion);
          submitModelRequest();
        }}
        currentQuestion={currentQuestion}
        setCurrentQuestion={setCurrentQuestion}
        messages={messages}
      />
    </main>
  </div>
  );
}