'use client';
import { createContext, useState, useRef, useContext, ReactNode } from 'react';
import Notification from '../Notification/Notification';
import NewPrompt from './NewPrompt';

interface PromptOptions {
  title?: string;
  subtitle?: string | ReactNode;
  type?: 'confirm' | 'input';
  inputLabel?: string;
  inputPlaceholder?: string;
  okText?: string;
  cancelText?: string;
  minLength?: number;
  maxLength?: number;
}

// Define the shape of the context
interface DirectorContextType {
  notify: (message: string, good?: boolean, duration?: number) => void;
  prompt: (options: PromptOptions) => Promise<any>;
}

// Create the context with the correct type
export const States = createContext<DirectorContextType | null>(null);

// Custom hook to use the Director context
export function useDirector() {
  const context = useContext(States);
  if (!context) {
    throw new Error('useDirector must be used within a Director');
  }
  return context;
}

interface DirectorProps {
  children: ReactNode;
}

export default function Director({ children }: DirectorProps) {
  const [message, setMessage] = useState('');
  const [messageGood, setMessageGood] = useState(true);

  // Prompt state
  const [promptOpen, setPromptOpen] = useState(false);
  const [promptOptions, setPromptOptions] = useState<PromptOptions>({});
  const promptResolver = useRef<((value: any) => void) | null>(null);

  const notify = (message: string, good = true, duration = 4000) => {
    setMessage(message);
    setMessageGood(good);
    setTimeout(() => {
      setMessage('');
    }, duration);
  };

  const prompt = (options: PromptOptions) => {
    setPromptOptions(options || {});
    setPromptOpen(true);
    return new Promise((resolve) => {
      promptResolver.current = resolve;
    });
  };

  const handlePromptClose = () => {
    setPromptOpen(false);
    if (promptResolver.current) {
      promptResolver.current(null); // Resolve with null on close
      promptResolver.current = null;
    }
  };

  const handlePromptConfirm = (value?: string) => {
    setPromptOpen(false);
    if (promptResolver.current) {
      promptResolver.current(value !== undefined ? value : true); // Resolve with input value or true
      promptResolver.current = null;
    }
  };

  const handlePromptCancel = () => {
    setPromptOpen(false);
    if (promptResolver.current) {
      promptResolver.current(false); // Resolve with false on cancel
      promptResolver.current = null;
    }
  };

  return (
    <States.Provider value={{ notify, prompt }}>
      <div>
        {message.length > 0 && (
          <Notification message={message} messageGood={messageGood} />
        )}

        <NewPrompt
          open={promptOpen}
          onClose={handlePromptClose}
          onConfirm={handlePromptConfirm}
          onCancel={handlePromptCancel}
          {...promptOptions}
        />
        {children}
      </div>
    </States.Provider>
  );
}
