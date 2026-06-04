import { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Copy, Check, X, RefreshCw } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://quantyrexmarkets-api.vercel.app/api';

const QUICK_PROMPTS = [
  { label: 'Reassure upset client', text: 'Draft a calm, professional response to reassure a client who is doubting our platform.' },
  { label: 'Explain withdrawal fee', text: 'Explain to a client that the withdrawal code validation fee is refundable and credited back to their balance.' },
  { label: 'Registration fee email', text: 'Draft an email explaining the one-time registration fee for account activation.' },
  { label: 'Translate to Hindi', text: 'Translate the following to Hindi:\n\n' },
  { label: 'Make it shorter', text: 'Rewrite the following message to be shorter and more direct:\n\n' },
  { label: 'Make it warmer', text: 'Rewrite this in a warmer, more personal tone:\n\n' },
];

export default function AIAssistant({ context, onInsert, compact = false }) {
  const { current: t } = useTheme();
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m your support assistant. Ask me anything — I can draft client responses, explain policies, translate messages, or help with tough conversations.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  const send = async (overrideText) => {
    const text = (overrideText || input).trim();
    if (!text || loading) return;

    const newMessages = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${BASE_URL}/ai/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          context: context || null
        })
      });
      const data = await res.json();
      if (data.success && data.reply) {
        setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages([...newMessages, { role: 'assistant', content: '⚠️ ' + (data.message || 'Failed to get response') }]);
      }
    } catch (err) {
      setMessages([...newMessages, { role: 'assistant', content: '⚠️ Network error: ' + err.message }]);
    } finally {
      setLoading(false);
    }
  };

  const copy = async (text, idx) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 1500);
    } catch {}
  };

  const clearChat = () => {
    setMessages([{ role: 'assistant', content: 'Cleared. How can I help?' }]);
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      height: compact ? '100%' : '100vh',
      background: '#0a0a0a',
      color: t.text
    }}>
      {/* Header */}
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,85,247,0.08))'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Sparkles size={16} color="white"/>
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700 }}>Support AI</div>
            <div style={{ fontSize: '9px', color: t.faintText }}>Powered by Llama 3.3 · No limits</div>
          </div>
        </div>
        <button onClick={clearChat} title="Clear chat" style={{
          background: 'transparent', border: 'none', color: t.faintText,
          cursor: 'pointer', padding: '6px'
        }}>
          <RefreshCw size={14}/>
        </button>
      </div>

      {/* Context indicator */}
      {context && (
        <div style={{
          padding: '6px 16px', fontSize: '9px', color: '#a855f7',
          background: 'rgba(168,85,247,0.08)', borderBottom: '1px solid rgba(168,85,247,0.15)'
        }}>
          ✨ Context: chatting about {context.substring(0, 80)}{context.length > 80 ? '…' : ''}
        </div>
      )}

      {/* Messages */}
      <div ref={scrollRef} style={{
        flex: 1, overflowY: 'auto', padding: '12px',
        display: 'flex', flexDirection: 'column', gap: '10px'
      }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '90%',
            background: m.role === 'user' ? '#6366f1' : '#1a1a1a',
            color: m.role === 'user' ? 'white' : t.text,
            padding: '10px 14px',
            borderRadius: m.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
            fontSize: '12px', lineHeight: 1.5,
            whiteSpace: 'pre-wrap', wordBreak: 'break-word',
            userSelect: 'text', WebkitUserSelect: 'text', WebkitTouchCallout: 'default'
          }}>
            {m.content}
            {m.role === 'assistant' && i > 0 && (
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '6px' }}>
                <button onClick={() => copy(m.content, i)} style={{
                  background: 'transparent', border: 'none', color: t.faintText,
                  fontSize: '10px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px', padding: 0
                }}>
                  {copiedIdx === i ? <><Check size={11} strokeWidth={3}/> Copied</> : <><Copy size={11}/> Copy</>}
                </button>
                {onInsert && (
                  <button onClick={() => onInsert(m.content)} style={{
                    background: 'transparent', border: 'none', color: '#22c55e',
                    fontSize: '10px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px', padding: 0
                  }}>
                    <Send size={11}/> Insert in chat
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div style={{
            alignSelf: 'flex-start', background: '#1a1a1a',
            padding: '10px 14px', borderRadius: '14px 14px 14px 4px',
            fontSize: '12px', color: t.faintText
          }}>
            <span style={{ display: 'inline-block', animation: 'pulse 1.4s infinite' }}>thinking…</span>
          </div>
        )}
      </div>

      {/* Quick prompts */}
      <div style={{
        padding: '8px 12px', borderTop: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', gap: '6px', overflowX: 'auto', flexShrink: 0
      }}>
        {QUICK_PROMPTS.map(p => (
          <button key={p.label} onClick={() => send(p.text)} disabled={loading} style={{
            background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.08)',
            color: t.text, padding: '6px 10px', borderRadius: '14px',
            fontSize: '10px', cursor: loading ? 'wait' : 'pointer',
            whiteSpace: 'nowrap', flexShrink: 0
          }}>
            {p.label}
          </button>
        ))}
      </div>

      {/* Input */}
      <div style={{
        padding: '10px 12px', borderTop: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', gap: '8px', alignItems: 'flex-end', flexShrink: 0
      }}>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);
            if (e.key === 'Enter' && !e.shiftKey && !isMobile) { e.preventDefault(); send(); }
          }}
          placeholder="Ask anything..."
          rows={1}
          style={{
            flex: 1, background: '#111', border: '1px solid rgba(255,255,255,0.1)',
            color: t.text, fontSize: '12px', padding: '10px 14px',
            borderRadius: '18px', resize: 'none', fontFamily: 'inherit',
            outline: 'none', minHeight: '40px', maxHeight: '120px',
            userSelect: 'text', WebkitUserSelect: 'text'
          }}
        />
        <button onClick={() => send()} disabled={loading || !input.trim()} style={{
          background: 'linear-gradient(135deg, #6366f1, #a855f7)',
          border: 'none', color: 'white', width: '40px', height: '40px',
          borderRadius: '50%', cursor: loading ? 'wait' : 'pointer',
          opacity: (loading || !input.trim()) ? 0.5 : 1,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
        }}>
          <Send size={16}/>
        </button>
      </div>
      <style>{`@keyframes pulse { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }`}</style>
    </div>
  );
}
