"use client";

interface NotificationProps {
  message: string;
  messageGood: boolean;
}

export default function Notification({
  message,
  messageGood,
}: NotificationProps) {
  const bgColor = messageGood ? "bg-green-500" : "bg-red-500";

  return (
    <div
      className={`fixed top-5 right-5 z-100 p-4 rounded-lg text-white transition-all duration-300 ${bgColor}`}
    >
      {message}
    </div>
  );
}
