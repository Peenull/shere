"use client";

import React, { useEffect, useState } from "react";
import { UserPlus, Zap, PieChart } from "react-feather";

type ActivityType = "SIGNUP" | "COMMISSION" | "STAKE_PURCHASE";

interface Activity {
  id: string; // Fake Firebase-style ID
  type: ActivityType;
  message: string;
  amount?: number;
  timestamp: number;
}

const generateFakeId = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const prefix = Array.from({ length: 3 }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length)),
  ).join("");
  const suffix = Array.from({ length: 3 }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length)),
  ).join("");
  return `${prefix}*******${suffix}`;
};

const generateRandomActivity = (): Activity => {
  const types: ActivityType[] = ["SIGNUP", "COMMISSION", "STAKE_PURCHASE"];
  const type = types[Math.floor(Math.random() * types.length)];
  const id = generateFakeId();
  let message = "";
  let amount = 0;

  if (type === "SIGNUP") {
    message = `New user ${id} joined the network`;
  } else if (type === "COMMISSION") {
    amount = Math.floor(Math.random() * (5000 - 200 + 1)) + 200; // Max 5000
    message = `User ${id} earned ${amount.toLocaleString()} FCFA commission`;
  } else if (type === "STAKE_PURCHASE") {
    amount = Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000; // Max 10000
    message = `User ${id} purchased a ${Math.floor(Math.random() * 50) + 1}% stake`;
  }

  return {
    id,
    type,
    message,
    amount,
    timestamp: Date.now(),
  };
};

export default function ActivityTicker() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // Initial set of activities
    const initial = Array.from({ length: 15 }, () => generateRandomActivity());
    setActivities(initial);

    // Add a new activity every 5-10 seconds
    const interval = setInterval(
      () => {
        setActivities((prev) => {
          const updated = [generateRandomActivity(), ...prev];
          return updated.slice(0, 20); // Keep last 20
        });
      },
      Math.random() * (10000 - 5000) + 5000,
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-slate-950/40 backdrop-blur-md border-b border-white/5 py-3 overflow-hidden whitespace-nowrap relative z-50">
      <div className="flex animate-marquee hover:[animation-play-state:paused]">
        {/* Double the list for seamless loop */}
        {[...activities, ...activities].map((activity, idx) => (
          <div
            key={`${activity.id}-${idx}`}
            className="inline-flex items-center gap-2 mx-8 px-4 py-1.5 bg-slate-900/50 border border-slate-800 rounded-full group"
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${
                activity.type === "SIGNUP"
                  ? "bg-blue-500/10 text-blue-400"
                  : activity.type === "COMMISSION"
                    ? "bg-green-500/10 text-green-400"
                    : "bg-yellow-400/10 text-yellow-400"
              }`}
            >
              {activity.type === "SIGNUP" && <UserPlus size={12} />}
              {activity.type === "COMMISSION" && <Zap size={12} />}
              {activity.type === "STAKE_PURCHASE" && <PieChart size={12} />}
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">
              {activity.message}
            </span>
            <span className="text-[8px] text-gray-700 font-bold ml-2">
              JUST NOW
            </span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          display: inline-flex;
          animation: marquee 120s linear infinite;
        }
      `}</style>
    </div>
  );
}
