import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default function Message({ message, closeMessage }) {
  if (!message) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md p-6 animate-in fade-in duration-200">
      <div
        className={`${
          message.good ? "bg-green-800/60" : "bg-red-800/60"
        } border border-white/10 rounded-2xl shadow-xl p-6 transition-colors flex flex-col items-center gap-6 w-full max-w-md`}
      >
        {/* Message Text */}
        <p className="font-bold text-xl text-center text-white">
          {message.text}
        </p>

        {/* Action Buttons */}
        <div className="flex w-full gap-4">
          {message.transaction && (
            <Link
              href="/history"
              className="flex justify-center items-center w-full h-11 text-lg font-semibold cursor-pointer rounded-xl border border-white/10 bg-yellow-600/40 text-white hover:bg-yellow-600/60 transition-all"
            >
              History
            </Link>
          )}
          <button
            className="flex justify-center items-center w-full h-11 text-lg font-semibold cursor-pointer rounded-xl border border-white/10 bg-red-600/40 text-white hover:bg-red-600/60 transition-all"
            onClick={() => closeMessage()}
          >
            Close
          </button>
        </div>

        {/* Footer Section */}
        <div className="mt-4 flex flex-col items-center text-center">
          <p className="text-sm text-gray-300">
            For Questions or Problems, Please Contact
          </p>
          <a
            href="https://wa.me/237683583297?text=Hello%20SHERE"
            className="flex justify-center items-center gap-2 w-full h-11 rounded-xl border border-white/10 bg-green-600/30 text-white hover:text-green-400 hover:bg-green-600/50 transition-all"
          >
            WhatsApp <FaWhatsapp size={18} />
          </a>
          <p className="text-gray-200 mt-2">Thank you for Trusting SHERE.</p>
          <p className="text-gray-200 mt-2">Sharing is Earning.</p>
        </div>
      </div>
    </div>
  );
}
