"use client";

import React, { useMemo } from "react";
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

  const url = useMemo(() => {
    if (typeof window !== "undefined" && user?.uid) {
      return `${window.location.origin}/signup?ref=${user.uid}`;
    }
    return "";
  }, [user?.uid]);

  const handleCopy = () => {
    if (!url) return;
    navigator.clipboard.writeText(url);
    notify("Link copied to clipboard!", true);
  };

  const handlePrimaryInvite = async () => {
    if (!url) return;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          notify("There was an error sharing.", false);
        }
      }
    } else {
      handleCopy();
    }
  };

  const shareOptions = [
    {
      name: "WhatsApp",
      icon: <FaWhatsapp size={18} />,
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + url)}`,
      color: "hover:bg-green-500/20 hover:text-green-500",
    },
    {
      name: "X",
      icon: <Twitter size={16} />,
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      color: "hover:bg-white/10 hover:text-white",
    },
    {
      name: "Facebook",
      icon: <Facebook size={18} />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: "hover:bg-blue-600/20 hover:text-blue-600",
    },
  ];

  if (big) {
    return (
      <div className="w-full max-w-md mx-auto space-y-5">
        {/* Primary CTA */}
        <button
          onClick={handlePrimaryInvite}
          disabled={!url}
          className="w-full flex items-center justify-center gap-3 py-4 px-5 bg-yellow-400/10 cursor-pointer border border-yellow-400/20 text-yellow-400 font-black text-sm uppercase tracking-widest rounded-2xl active:scale-95 disabled:opacity-50 "
          aria-disabled={!url}
        >
          <Share2 size={18} strokeWidth={3} />
          <span>Invite</span>
        </button>

        <div className="relative flex items-center gap-4">
          <div className="grow h-px bg-white/5"></div>
          <span className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">
            Quick Share
          </span>
          <div className="grow h-px bg-white/5"></div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center items-center gap-3">
          {shareOptions.map((option) => (
            <a
              key={option.name}
              href={option.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center w-11 h-11 bg-slate-900 border border-white/5 rounded-xl text-gray-400 transition-all duration-200 ${option.color} hover:-translate-y-1`}
              aria-label={`Share via ${option.name}`}
            >
              {option.icon}
            </a>
          ))}

          <button
            onClick={handleCopy}
            className="flex items-center justify-center w-11 h-11 bg-slate-900 border border-white/5 rounded-xl text-gray-400 hover:text-yellow-400 hover:bg-yellow-400/10 transition-all"
            aria-label="Copy invite link"
          >
            <Copy size={16} />
          </button>
        </div>

        {/* Link display */}
        <div className="bg-slate-950/50 border border-white/5 p-2 rounded-2xl flex items-center gap-2">
          <div className="grow px-3 overflow-hidden">
            <p
              className="text-[11px] text-gray-400 font-medium truncate"
              title={url || "Generating link..."}
            >
              {url || "Generating link..."}
            </p>
          </div>
          <button
            onClick={handleCopy}
            className="bg-slate-800 text-gray-300 text-[11px] font-bold px-3 py-2 rounded-xl active:scale-95 transition"
            aria-label="Copy link"
          >
            COPY
          </button>
        </div>
      </div>
    );
  }

  // Small variant (dashboard)
  return (
    <button
      onClick={handlePrimaryInvite}
      className="group flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400/10 to-yellow-500/10 border border-yellow-400/20 text-yellow-400 font-black py-3 px-4 rounded-xl active:scale-95 transition-all w-full sm:w-max min-h-[44px]"
      aria-label="Invite"
    >
      <span className="text-xs uppercase tracking-widest">Invite</span>
      <DollarSign size={14} strokeWidth={3} />
    </button>
  );
};

export default Share;
