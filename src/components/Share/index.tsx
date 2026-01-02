'use client';

import React, { useState, useEffect } from 'react';
import { Copy, Facebook, MessageCircle, Twitter, Share2, Users } from 'react-feather';
import { useDirector } from '@/components/Director';
import { useAuth } from '@/components/AuthProvider';

interface ShareProps {
  text: string;
  title: string;
}

const Share: React.FC<ShareProps> = ({ text, title }) => {
  const { notify } = useDirector();
  const { user } = useAuth();
  const [url, setUrl] = useState('');
  const [isShareApiSupported, setIsShareApiSupported] = useState(false);

  useEffect(() => {
    if (user?.uid) {
      const origin = window.location.origin;
      setUrl(`${origin}/signup?ref=${user.uid}`);
    }
    setIsShareApiSupported(!!navigator.share);
  }, [user]);

  const handleCopy = () => {
    if (!url) return;
    navigator.clipboard.writeText(url);
    notify('Link copied to clipboard!', true);
  };

  const handlePrimaryInvite = async () => {
    if (!url) return;

    if (isShareApiSupported) {
      try {
        await navigator.share({ title, text, url });
      } catch (error) {
        // Avoid showing an error if the user closes the share dialog
        if ((error as Error).name !== 'AbortError') {
          notify('There was an error sharing.', false);
        }
      }
    } else {
      // Fallback for desktop browsers
      handleCopy();
    }
  };

  const shareOptions = [
    {
      name: 'X (Twitter)',
      icon: <Twitter size={20} />,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      color: 'hover:bg-blue-400/20 hover:text-blue-400',
    },
    {
      name: 'Facebook',
      icon: <Facebook size={20} />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: 'hover:bg-blue-600/20 hover:text-blue-600',
    },
    {
      name: 'WhatsApp',
      icon: <MessageCircle size={20} />,
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`,
      color: 'hover:bg-green-500/20 hover:text-green-500',
    },
  ];

  return (
    <div className="w-full max-w-md mx-auto">
      <button
        onClick={handlePrimaryInvite}
        disabled={!url}
        className="w-full max-w-xs mx-auto flex items-center justify-center gap-3 mb-4 py-3 px-4 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-lg shadow-lg shadow-yellow-400/20 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
        title="Opens a share dialog or copies the link to your clipboard"
      >
        <Users size={20} />
        <span>Invite a Friend</span>
      </button>

      <div className="flex items-center my-6">
        <div className="flex-grow border-t border-gray-700/50"></div>
        <span className="flex-shrink mx-4 text-gray-500 text-sm">or</span>
        <div className="flex-grow border-t border-gray-700/50"></div>
      </div>

      <div className="bg-slate-950 border border-gray-700 rounded-full flex items-center pr-2 mb-4">
        <input 
          type="text"
          readOnly
          value={url || 'Loading...'}
          className="w-full bg-transparent text-gray-400 text-sm pl-6 p-3 rounded-full focus:outline-none"
          title="Your unique referral link"
        />
        <button 
          onClick={handleCopy}
          disabled={!url}
          className="flex-shrink-0 flex items-center justify-center gap-2 bg-slate-700 text-white font-bold px-5 py-2 rounded-full hover:bg-slate-600 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Copy link to clipboard"
        >
          <Copy size={16} />
        </button>
      </div>

      <div className="flex justify-center items-center gap-3">
        {shareOptions.map((option) => (
          <a
            key={option.name}
            href={option.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center w-12 h-12 bg-slate-800/60 rounded-full text-gray-400 transition-all duration-300 ${option.color}`}
            title={`Share on ${option.name}`}
          >
            {option.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Share;
