import React from 'react';
import { MessageSquare, ShieldCheck, HelpCircle, ArrowLeft } from 'lucide-react';

export default function Support() {
  return (
    <div className="min-h-screen bg-[#0b0e14] text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center space-x-4 border-b border-gray-800 pb-6">
          <a href="/" className="p-2 bg-gray-900 rounded-lg hover:bg-gray-800 transition">
            <ArrowLeft className="w-5 h-5 text-gray-400" />
          </a>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              QuantyRex Help & Support
            </h1>
            <p className="text-gray-400 text-sm mt-1">24/7 Official Customer Service & Inquiries</p>
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
              Connect directly with our senior account managers and support staff on Telegram for real-time assistance.
            </p>
            <a 
              href="https://t.me/QUANTYREX_SUPPORT_OFFICAL" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition"
            >
              Contact Support (@QUANTYREX_SUPPORT_OFFICAL)
            </a>
          </div>

          {/* Official Group Card */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition">
            <div className="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Community Trading Group</h3>
            <p className="text-gray-400 text-sm mb-6">
              Join our official trading community group for daily setups, signals, and live market discussions.
            </p>
            <a 
              href="https://t.me/+eANy58CnrgNjODU1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition"
            >
              Join Trading Group
            </a>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <HelpCircle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-400 mb-1">Official Security Reminder</h4>
              <p className="text-gray-300 text-sm">
                QuantyRex admins will <strong>NEVER</strong> direct message (DM) you first to demand funds, seed phrases, or private keys. Always ensure you are communicating with our official handle: <span className="text-blue-400 font-mono">@QUANTYREX_SUPPORT_OFFICAL</span>.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
