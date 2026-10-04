import React from 'react';
import { MessageSquare, ShieldCheck, HelpCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Support() {
  return (
    <div key="support-page" className="min-h-screen bg-[#0b0e14] text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center space-x-4 border-b border-gray-800 pb-6">
          <Link to="/" className="p-2 bg-gray-900 rounded-lg hover:bg-gray-800 transition">
            <ArrowLeft className="w-5 h-5 text-gray-400" />
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              QuantyRex Help & Support
            </h1>
            <p className="text-gray-400 text-sm mt-1">24/7 Official Customer Service</p>
          </div>
        </div>

        {/* Support Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Telegram Support Card */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 transition">
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Live Telegram Support</h3>
            <p className="text-gray-400 text-sm mb-6">
              Connect with our senior account managers for real-time assistance.
            </p>
            <a 
              href="https://t.me/QUANTYREX_SUPPORT_OFFICAL" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition"
            >
              Chat with @QUANTYREX_SUPPORT_OFFICAL
            </a>
          </div>

          {/* Official Group Card */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition">
            <div className="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Trading Community</h3>
            <p className="text-gray-400 text-sm mb-6">
              Join our group for daily setups, signals, and live market discussions.
            </p>
            <a 
              href="https://t.me/+eANy58CnrgNjODU1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition"
            >
              Join Official Group
            </a>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6">
          <div className="flex items-start space-x-3 text-sm">
            <HelpCircle className="w-6 h-6 text-amber-400 shrink-0" />
            <div className="text-gray-300">
              <span className="font-semibold text-amber-400 block mb-1">Official Security Reminder</span>
              QuantyRex admins will <strong>NEVER</strong> direct message (DM) you first. Always ensure you are communicating with <span className="text-blue-400 font-mono">@QUANTYREX_SUPPORT_OFFICAL</span>.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
