import { useState, useRef, useEffect } from 'react';
import { Bot, Send, Copy, Check, RefreshCw, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://quantyrexmarkets-api.vercel.app/api';
const STORAGE_KEY = 'qm_ai_chat_history';

const QUICK_PROMPTS = [
  { label: 'Reassure client', text: 'Write the EXACT message to send the client — they are doubting our platform is legitimate. Use trust signals (KYC, encryption, transaction logs, 24/7 support). No preamble.' },
  { label: 'Handle fraud claim', text: 'Write the EXACT message to send the client — they are accusing us of fraud. Firm, not defensive. Acknowledge their concern, clarify legitimacy with specifics, give next step. No preamble.' },
  { label: 'Explain withdrawal fee', text: 'Write the EXACT message to send the client explaining the WITHDRAWAL CODE VALIDATION FEE specifically — it is the refundable security charge for verifying withdrawals, credited back to dashboard balance after verification. Cover what it is, why, the refund reassurance, and next step. No preamble.' },
  { label: 'Explain registration fee', text: 'Write the EXACT message to send the client explaining the REGISTRATION FEE specifically — it is a one-time account activation charge (NOT refundable — different from withdrawal validation), required to unlock deposits/withdrawals/trading. Cover what it activates and how to complete payment. No preamble.' },
  { label: 'Explain account upgrade', text: 'Write the EXACT message to send the client explaining ACCOUNT UPGRADE specifically — moving from current tier to higher one (Bronze/Silver/Gold/Platinum/Diamond/Elite). Cover benefits of upgrade (higher ROI, faster withdrawals, larger limits, priority support), how upgrade is done (deposit differential to new tier minimum), and that new rates apply immediately. No preamble.' },
  { label: 'Explain KYC', text: 'Write the EXACT message to send the client explaining KYC verification — required documents, why mandatory, review timeline. No preamble.' },
  { label: 'Withdrawal delay', text: 'Write the EXACT message reassuring a client whose withdrawal is taking time. Explain processing steps, realistic timeline, fund safety. No preamble.' },
  { label: 'Translate to Hindi', text: 'Translate the following client-facing message to natural, professional Hindi. Output ONLY the translation, nothing else:\n\n' },
  { label: 'Translate to English', text: 'Translate the following to clear, professional English. Output ONLY the translation, nothing else:\n\n' },
  { label: 'Make shorter', text: 'Rewrite this message shorter and more direct, keeping professional tone. Output ONLY the rewritten message, no preamble:\n\n' },
  { label: 'Make longer', text: 'Expand this message with more detail, explanation, and reassurance. Output ONLY the expanded message, no preamble:\n\n' },
  { label: 'Warmer tone', text: 'Rewrite this in a warmer, more empathetic tone. Output ONLY the rewritten message, no preamble:\n\n' },
  { label: 'Draft full email', text: 'Draft a FULL EMAIL (with "Dear Sir/Ma\'am," salutation and "Warm regards, Quantyrex Markets Support" sign-off) about: ' },
];

export default function AIChatView({ onClose }) {
  const { current: t } = useTheme();
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [{ role: 'assistant', content: "Hi! I'm your support assistant. Ask me anything — I can draft client responses, explain policies, translate messages, or help with tough conversations." }];
  });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState(null);
  const [showPrompts, setShowPrompts] = useState(false);
  const scrollRef = useRef(null);
  const bottomRef = useRef(null);

  // Persist to localStorage
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-50))); } catch {}
  }, [messages]);

  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const send = async (overrideText) => {
    const text = (overrideText || input).trim();
    if (!text || loading) return;
    const newMessages = [...messages, { role: 'user', content: text, createdAt: new Date().toISOString() }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${BASE_URL}/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content }))
        })
      });
      const data = await res.json();
      const reply = data.success && data.reply ? data.reply : ('⚠️ ' + (data.message || 'Failed to respond'));
      setMessages([...newMessages, { role: 'assistant', content: reply, createdAt: new Date().toISOString() }]);
    } catch (err) {
      setMessages([...newMessages, { role: 'assistant', content: '⚠️ Network error: ' + err.message, createdAt: new Date().toISOString() }]);
    } finally {
      setLoading(false);
    }
  };

  const copy = async (text, idx) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 1200);
    } catch {}
  };

  const clearChat = () => {
    if (!window.confirm('Clear AI chat history?')) return;
    const initial = [{ role: 'assistant', content: 'Cleared. How can I help?' }];
    setMessages(initial);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#000', color: t.text }}>
      {/* Header */}
      <div style={{
        padding: '14px 16px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: '#0a0a0a', flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {onClose && (
            <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: t.text, cursor: 'pointer', padding: '4px', fontSize: '20px' }}>←</button>
          )}
          <div style={{
            width: '42px', height: '42px', borderRadius: '50%',
            background: '#262626',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Bot size={20} color="#e5e5e5" strokeWidth={1.5}/>
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 700 }}>AI Assistant</div>
            <div style={{ fontSize: '10px', color: '#22c55e' }}>● Always online</div>
          </div>
        </div>
        <button onClick={clearChat} title="Clear chat" style={{
          background: 'transparent', border: 'none', color: t.faintText,
          cursor: 'pointer', padding: '8px'
        }}>
          <RefreshCw size={14}/>
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} style={{
        flex: 1, overflowY: 'auto', padding: '14px',
        display: 'flex', flexDirection: 'column', gap: '12px'
      }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '85%',
            display: 'flex', flexDirection: 'column',
            alignItems: m.role === 'user' ? 'flex-end' : 'flex-start',
            gap: '4px'
          }}>
            <div style={{
              background: m.role === 'user' ? '#3b82f6' : '#1c1c1c',
              color: 'white',
              padding: '10px 14px',
              borderRadius: m.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
              fontSize: '12px', lineHeight: 1.5,
              whiteSpace: 'pre-wrap', wordBreak: 'break-word',
              userSelect: 'text', WebkitUserSelect: 'text', WebkitTouchCallout: 'default'
            }}>
              {m.content}
            </div>
            {m.role === 'assistant' && i > 0 && (
              <button onClick={() => copy(m.content, i)} style={{
                background: 'transparent', border: 'none', color: t.faintText,
                fontSize: '10px', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: '4px',
                padding: '2px 6px'
              }}>
                {copiedIdx === i ? <><Check size={11} strokeWidth={3}/> Copied</> : <><Copy size={11}/> Copy</>}
              </button>
            )}
          </div>
        ))}
        {loading && (
          <div style={{
            alignSelf: 'flex-start', background: '#1c1c1c',
            padding: '10px 14px', borderRadius: '14px 14px 14px 4px',
            fontSize: '12px', color: t.faintText
          }}>
            <span style={{ display: 'inline-block', animation: 'aiPulse 1.4s infinite' }}>thinking…</span>
          </div>
        )}
        <div ref={bottomRef}/>
      </div>

      {/* Quick prompts popover (only when toggled) */}
      {showPrompts && (
        <div style={{
          position: 'relative',
          padding: '10px 12px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          background: '#0a0a0a',
          display: 'flex', flexWrap: 'wrap', gap: '6px',
          flexShrink: 0
        }}>
          {QUICK_PROMPTS.map(p => (
            <button key={p.label} onClick={() => { send(p.text); setShowPrompts(false); }} disabled={loading} style={{
              background: '#1c1c1c', border: '1px solid rgba(255,255,255,0.08)',
              color: t.text, padding: '7px 11px', borderRadius: '16px',
              fontSize: '10px', cursor: loading ? 'wait' : 'pointer',
              whiteSpace: 'nowrap'
            }}>
              {p.label}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{
        padding: '12px 16px',
        paddingBottom: 'max(12px, env(safe-area-inset-bottom, 12px))',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        background: '#0a0a0a',
        display: 'flex', gap: '8px', alignItems: 'flex-end', flexShrink: 0
      }}>
        <button
          onClick={() => setShowPrompts(s => !s)}
          title="Quick prompts"
          style={{
            background: showPrompts ? '#262626' : 'transparent',
            border: `1px solid ${showPrompts ? '#404040' : 'rgba(255,255,255,0.1)'}`,
            color: showPrompts ? '#fff' : t.faintText,
            width: '40px', height: '40px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0
          }}>
          <Zap size={16} strokeWidth={2}/>
        </button>
        <textarea
          value={input}
          onChange={e => {
            setInput(e.target.value);
            e.target.style.height = 'auto';
            e.target.style.height = Math.min(e.target.scrollHeight, 140) + 'px';
          }}
          onKeyDown={e => {
            const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
            if (e.key === 'Enter' && !e.shiftKey && !isMobile) {
              e.preventDefault();
              send();
              e.target.style.height = 'auto';
            }
          }}
          placeholder="Ask anything..."
          rows={1}
          style={{
            flex: 1, background: '#111',
            border: '1px solid rgba(255,255,255,0.1)',
            color: t.text, fontSize: '13px',
            padding: '10px 16px', outline: 'none',
            borderRadius: '20px', resize: 'none',
            fontFamily: 'inherit', lineHeight: '1.4',
            maxHeight: '140px', overflowY: 'auto',
            minHeight: '40px', boxSizing: 'border-box',
            userSelect: 'text', WebkitUserSelect: 'text',
            WebkitTouchCallout: 'default'
          }}
          spellCheck={true}
        />
        <button onClick={() => send()} disabled={loading || !input.trim()} style={{
          background: '#fff',
          border: 'none', color: '#000', width: '40px', height: '40px',
          borderRadius: '50%', cursor: (loading || !input.trim()) ? 'not-allowed' : 'pointer',
          opacity: (loading || !input.trim()) ? 0.5 : 1,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
        }}>
          <Send size={16}/>
        </button>
      </div>
      <style>{`@keyframes aiPulse { 0%,100% { opacity: 0.5 } 50% { opacity: 1 } }`}</style>
    </div>
  );
}
