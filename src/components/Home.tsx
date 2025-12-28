
import React from "react";

const Home: React.FC = () => {
  return (
    <div className="text-white">
      {/* Hero Section */}
      <div className="text-center py-20 px-6">
        <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-purple-400 to-yellow-400 text-transparent bg-clip-text">
          Refer, Earn, Repeat.
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
          Welcome to Shere, the platform where your network is your net worth.
          Earn by referring others and watch your shares grow.
        </p>
      </div>

      {/* How It Works Section */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-black text-center mb-10">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-slate-900/50 p-8 rounded-3xl border border-gray-800">
            <h3 className="text-xl font-bold mb-2 text-yellow-400">1. Buy a Share</h3>
            <p className="text-slate-400">
              Purchase a percentage of referral earnings, starting from 1% for
              200 FCFA. The higher your share, the more you earn.
            </p>
          </div>
          <div className="bg-slate-900/50 p-8 rounded-3xl border border-gray-800">
            <h3 className="text-xl font-bold mb-2 text-yellow-400">2. Refer Friends</h3>
            <p className="text-slate-400">
              Invite your friends to join Shere. When they purchase shares, you
              get a percentage of their investment based on your share.
            </p>
          </div>
          <div className="bg-slate-900/50 p-8 rounded-3xl border border-gray-800">
            <h3 className="text-xl font-bold mb-2 text-yellow-400">3. Watch & Earn</h3>
            <p className="text-slate-400">
              Increase your earnings by watching ads. A simple way to boost your
              income on the platform.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center py-20 px-6">
        <h2 className="text-4xl font-black mb-4">Ready to Start Earning?</h2>
        <p className="text-slate-400 mb-8 max-w-lg mx-auto">
          Create an account today and unlock the power of your network.
        </p>
        <a
          href="/signup"
          className="inline-block py-4 px-10 bg-yellow-400 text-black font-black rounded-2xl hover:bg-yellow-300 transition-all active:scale-95 shadow-xl shadow-yellow-400/10"
        >
          GET STARTED
        </a>
      </div>
    </div>
  );
};

export default Home;
