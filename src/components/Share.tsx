'use client';

import { useAuth } from './AuthProvider';
import { useDirector } from './Director';
import { Share2 } from "react-feather";
import { FaWhatsapp, FaFacebook, FaTwitter, FaTelegram } from 'react-icons/fa';

interface ShareProps {
    title: string;
    text: string;
    embedded?: boolean;
}

export default function Share({ title, text, embedded = false }: ShareProps) {
    const { notify } = useDirector();
    const { user } = useAuth();

    const getReferralUrl = () => {
        if (!user) return window.location.origin;
        return `${window.location.origin}/signup?ref=${user.uid}`;
    }

    const handleShare = () => {
        const referralUrl = getReferralUrl();
        if (navigator.share) {
            navigator.share({
                title: title,
                text: text,
                url: referralUrl,
            }).then(() => {
                notify('Thanks for sharing!', true);
            }).catch((error) => {
                console.error('Error sharing:', error);
                copyToClipboard();
            });
        } else {
            copyToClipboard();
        }
    };

    const copyToClipboard = () => {
        const referralUrl = getReferralUrl();
        const fullText = `${text} ${referralUrl}`;
        navigator.clipboard.writeText(fullText).then(() => {
            notify('Referral link copied to clipboard!', true);
        }).catch(err => {
            console.error('Failed to copy: ', err);
            notify('Failed to copy link.', false);
        });
    };

    if (embedded) {
        return (
            <button onClick={handleShare} className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors font-semibold">
                Share your link
            </button>
        );
    }

    const socialShare = (platform: string) => {
        const referralUrl = getReferralUrl();
        const shareText = encodeURIComponent(`${text} ${referralUrl}`);
        let url = '';

        switch (platform) {
            case 'whatsapp':
                url = `https://api.whatsapp.com/send?text=${shareText}`;
                break;
            case 'facebook':
                url = `https://www.facebook.com/sharer/sharer.php?u=${referralUrl}`;
                break;
            case 'twitter':
                url = `https://twitter.com/intent/tweet?url=${referralUrl}&text=${encodeURIComponent(text)}&via=YourTwitterHandle`; // Replace with your Twitter handle
                break;
            case 'telegram':
                url = `https://t.me/share/url?url=${referralUrl}&text=${encodeURIComponent(text)}`;
                break;
            default:
                return;
        }
        window.open(url, '_blank', 'noopener,noreferrer');
    }

    return (
        <div className="w-full max-w-xs mx-auto">
            <button
                onClick={handleShare}
                className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-full shadow-lg shadow-yellow-400/20 transition-all transform hover:-translate-y-0.5"
            >
                <Share2 size={20} />
                <span>Share & Earn</span>
            </button>

            <div className="mt-6 flex justify-center items-center gap-4">
                <p className="text-sm text-gray-500">Or share via</p>
                <div className="flex items-center gap-3">
                     <button onClick={() => socialShare('whatsapp')} className="p-3 bg-slate-800/80 rounded-full hover:bg-slate-700 transition-colors"><FaWhatsapp size={20} className="text-green-400" /></button>
                     <button onClick={() => socialShare('facebook')} className="p-3 bg-slate-800/80 rounded-full hover:bg-slate-700 transition-colors"><FaFacebook size={20} className="text-blue-500" /></button>
                     <button onClick={() => socialShare('twitter')} className="p-3 bg-slate-800/80 rounded-full hover:bg-slate-700 transition-colors"><FaTwitter size={20} className="text-blue-400" /></button>
                     <button onClick={() => socialShare('telegram')} className="p-3 bg-slate-800/80 rounded-full hover:bg-slate-700 transition-colors"><FaTelegram size={20} className="text-sky-400" /></button>
                </div>
            </div>
        </div>
    );
}
