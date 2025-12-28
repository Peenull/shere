'use client';

import { useAuth } from '@/components/AuthProvider';
import { useDirector } from '@/components/Director';
import { ShoppingCart, TrendingUp } from 'react-feather';

interface BuySharesProps {
  currentShare: number;
}

export default function BuyShares({ currentShare }: BuySharesProps) {
  const { user } = useAuth();
  const { prompt, notify } = useDirector();

  const handleBuyShares = async () => {
    if (!user) return;

    const amount = await prompt({
        type: 'input',
        message: 'How many shares do you want to buy?',
        inputLabel: 'Number of Shares',
        inputPlaceholder: 'e.g., 10',
        okText: 'Request Purchase',
    });

    if (amount && !isNaN(Number(amount))) {
        const numericAmount = Number(amount);
        if (currentShare + numericAmount > 50) {
            notify(`You can only buy up to ${50 - currentShare} more shares.`, false);
            return;
        }

        const confirmation = await prompt({
            message: `You are about to request to buy ${numericAmount} shares. Proceed?`,
            okText: 'Confirm'
        });

        if (confirmation) {
            const whatsappMessage = `Hello, I would like to buy ${numericAmount} shares for my Shere account.\n\nUser: ${user.displayName || 'N/A'}\nUserID: ${user.uid}`;
            const whatsappUrl = `https://wa.me/237676736946?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappUrl, '_blank');
            notify('Redirecting to WhatsApp to complete your request...', true);
        }
    } else if (amount) {
        notify('Please enter a valid number.', false);
    }
  };

  return (
    <div className="col-span-2 bg-yellow-400/10 border border-yellow-400/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center text-center sm:text-left justify-between gap-4">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-yellow-400/20 text-yellow-300">
                <TrendingUp size={24} />
            </div>
            <div>
                <h3 className="text-white font-bold text-lg">Increase Your Earning Potential</h3>
                <p className="text-yellow-200/80 text-sm">Your share is low. Buy more to maximize your earnings.</p>
            </div>
        </div>
        <button
            onClick={handleBuyShares}
            className="flex-shrink-0 flex items-center justify-center gap-2 mt-2 sm:mt-0 py-2 px-5 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-lg shadow-lg shadow-yellow-400/20 transition-all transform hover:-translate-y-0.5"
        >
            <ShoppingCart size={18} />
            <span>Buy More Shares</span>
        </button>
    </div>
  );
}
