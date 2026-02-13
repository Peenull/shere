"use client";

import React, { useState, useEffect } from "react";
import { Copy, Facebook, Twitter, Share2, DollarSign } from "react-feather";
import { useDirector } from "@/components/Director";
import { useAuth } from "@/components/AuthProvider";
import { FaWhatsapp } from "react-icons/fa";

interface ShareProps {
  text: string;
  title: string;
  big?: boolean;
}

const Share: React.FC<ShareProps> = ({ text, title, big }) => {
  const { notify } = useDirector();
  const { user } = useAuth();
  const [url, setUrl] = useState("");
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
    notify("Link copied to clipboard!", true);
  };

  const handlePrimaryInvite = async () => {
    if (!url) return;

    if (isShareApiSupported) {
      try {
        await navigator.share({ title, text, url });
      } catch (error) {
        // Avoid showing an error if the user closes the share dialog
        if ((error as Error).name !== "AbortError") {
          notify("There was an error sharing.", false);
        }
      }
    } else {
      // Fallback for desktop browsers
      handleCopy();
    }
  };

  const shareOptions = [
    {
      name: "X (Twitter)",
      icon: <Twitter size={20} />,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      color: "hover:bg-blue-400/20 hover:text-blue-400",
    },
    {
      name: "Facebook",
      icon: <Facebook size={20} />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: "hover:bg-blue-600/20 hover:text-blue-600",
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp size={20} />,
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + url)}`,
      color: "hover:bg-green-500/20 hover:text-green-500",
    },
  ];

  if (big) {
    return (
      <div className="w-full max-w-md mx-auto">
        <button
          onClick={handlePrimaryInvite}
          disabled={!url}
          className="w-full flex items-center justify-center gap-3 mb-8 py-4 px-6 bg-yellow-400/10 hover:bg-yellow-300/10 text-yellow-400 font-black text-lg rounded-2xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
          title="Opens a share dialog or copies the link to your clipboard"
        >
          <Share2
            size={22}
            className="group-hover:rotate-12 transition-transform"
          />
          <span>Invite & Earn</span>
        </button>

        <div className="relative flex items-center gap-4 my-8">
          <div className="grow h-px bg-gray-800"></div>
          <span className="text-gray-500 text-xs font-black uppercase tracking-widest">
            Or invite via
          </span>
          <div className="grow h-px bg-gray-800"></div>
        </div>

        <div className="bg-slate-950 border border-gray-700 rounded-full flex items-center pr-2 mb-4">
          <input
            type="text"
            readOnly
            value={url || "Loading..."}
            className="w-full bg-transparent text-gray-400 text-sm pl-6 p-3 rounded-full focus:outline-none"
            title="Your unique referral link"
          />
          <button
            onClick={handleCopy}
            disabled={!url}
            className="shrink-0 flex items-center justify-center gap-2 bg-slate-700 text-white font-bold px-5 py-2 rounded-full hover:bg-slate-600 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Copy link to clipboard"
          >
            <Copy size={16} />
          </button>
        </div>

        <div className="flex justify-center items-center gap-4">
          {shareOptions.map((option) => (
            <a
              key={option.name}
              href={option.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center w-14 h-14 bg-slate-900 border border-gray-800 rounded-2xl text-gray-400 transition-all duration-300 group ${option.color} hover:-translate-y-1 shadow-lg hover:shadow-xl`}
              title={`Share on ${option.name}`}
            >
              <div className="group-hover:scale-110 transition-transform">
                {option.icon}
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div
        onClick={handlePrimaryInvite}
        className="group flex items-center justify-center gap-3 bg-linear-to-r from-yellow-400/10 to-yellow-500/10 text-yellow-400 font-black py-4 px-8 rounded-2xl active:scale-95 text-xs sm:text-sm uppercase tracking-widest  w-full sm:w-max"
      >
        <p>Invite</p>
        <DollarSign size={16} />
      </div>
    );
  }
};

export default Share;
