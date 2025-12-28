'use client';

import { useAuth } from '@/components/AuthProvider';
import { useDirector } from '@/components/Director';
import { ArrowDownCircle } from 'react-feather';

interface WithdrawProps {
  totalBalance: number;
  loading: boolean;
}

export default function Withdraw({ totalBalance, loading }: WithdrawProps) {
  const { user } = useAuth();
  const { prompt, notify } = useDirector();

  const handleWithdraw = async () => {
    if (!user) return;

    const amount = await prompt({
      type: 'input',
      message: 'How much do you want to withdraw?',
      inputLabel: 'Amount (FCFA)',
      inputPlaceholder: 'e.g., 5000',
      okText: 'Request Withdraw',
    });

    if (amount && !isNaN(Number(amount))) {
      const numericAmount = Number(amount);
      if (numericAmount > totalBalance) {
        notify("You don't have enough balance for this withdrawal.", false);
        return;
      }

      const confirmation = await prompt({
        message: `You are about to request a withdrawal of ${numericAmount.toLocaleString()} FCFA. Proceed?`,
        okText: 'Confirm',
      });

      if (confirmation) {
        const whatsappMessage = `Hello, I would like to withdraw ${numericAmount.toLocaleString()} FCFA from my Shere account.\n\nUser: ${user.displayName || 'N/A'}\nUserID: ${user.uid}`;
        const whatsappUrl = `https://wa.me/237676736946?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');
        notify('Redirecting to WhatsApp to complete your request...', true);
      }
    } else if (amount) {
      notify('Please enter a valid number.', false);
    }
  };

  return (
    <button
      onClick={handleWithdraw}
      disabled={loading || !user}
      className="w-full sm:w-auto flex items-center justify-center gap-2 py-2 px-5 bg-green-500/10 hover:bg-green-500/20 text-green-400 font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <ArrowDownCircle size={18} />
      <span>Withdraw</span>
    </button>
  );
}
