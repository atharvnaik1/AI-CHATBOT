"use client";

import React, { useState, useEffect } from 'react';
import styles from './chat.module.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import OpenAI from 'openai';

interface ChatBoxProps {
  currentQuestion: string;
  setCurrentQuestion: (question: string) => void;
  onSearchButtonClick: (question: string) => void;
  messages: OpenAI.Chat.ChatCompletionMessageParam[],
}


function ChatInputField(
  { currentQuestion, setCurrentQuestion, onSearchButtonClick, messages }: ChatBoxProps
) {
  // const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (loading) {
      setTimeout(() => setLoading(false), 2000);
    }
  }, [loading]);

  function handleQuestionChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCurrentQuestion(event.target.value);
  }
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleQuestion();
    }
  };

  async function handleQuestion() {
    const QuestionbyUser = currentQuestion.trim();
    if (QuestionbyUser !== '') {
      setLoading(true);
      onSearchButtonClick(currentQuestion);
      setCurrentQuestion('');

    }
  }

  return (
    <div>
      <div className={styles.chatContainer}>

        <div className={styles.messageContainer}>
          {messages.map((message, index) => (
            <div key={index} className={`${styles.message} ${message.role === 'user' ? styles.userMessage : styles.assistantMessage}`}>
              <span className={styles.role}>{message.role} : </span>
              {Array.isArray(message.content) ? message.content.join('') : message.content}
            </div>
          ))}
          {loading && <div className={styles.loadingIndicator}>Loading......</div>}

        </div>
      </div>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Ask a question ..."
          className={styles.chatInput}
          value={currentQuestion}
          onChange={handleQuestionChange}
          onKeyDown={handleKeyPress}
        />
        <button className={styles.searchButton} onClick={handleQuestion}>
          <svg className={styles.sendIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div >

    </div>
  );
}

export default ChatInputField;