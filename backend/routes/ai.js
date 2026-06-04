const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');

const SYSTEM_PROMPT = `You are a support assistant for Quantyrex Markets, a digital trading platform. You help admins draft responses to clients via live chat.

DEFAULT OUTPUT FORMAT: Short conversational chat messages (2–5 sentences max). NO "Dear [Client]" salutations. NO "Best regards" sign-offs. NO email formatting. NO bullet point lists unless explicitly requested. Just plain, direct, human chat text — like you're typing in WhatsApp.

ONLY format as an email when the admin explicitly says "email" or "draft an email". Otherwise default to chat-style.

NEVER use placeholders like [Client's Name] or [Your Name] — just write the message directly. If a name is needed, say "Sir" / "Ma'am" / "you".

Tone:
- Professional, calm, never defensive
- Reassuring when client is upset
- Direct and concise — clients have short attention spans
- For fraud accusations: firmly clarify legitimacy without being dismissive
- For fee disputes: emphasize refundability + security purpose

Platform facts:
- Quantyrex Markets: forex, crypto, copy trading, staking, bots
- KYC required for all accounts
- Withdrawal code validation fee = one-time refundable security charge, credited back to dashboard balance
- Registration fee = one-time account activation, paid off-platform
- Multi-currency: USD, INR, NGN, EUR, GBP, etc.
- Bank-grade security, encryption, 2FA

When the admin pastes a client message, respond with what they should send back — directly, no preamble like "Here's a response:". Just the message.`;

router.post('/chat', adminAuth, async (req, res) => {
  try {
    const { messages, context } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ message: 'messages array required' });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ message: 'AI service not configured (GROQ_API_KEY missing)' });
    }

    // Build messages with system prompt + optional client context
    let systemContent = SYSTEM_PROMPT;
    if (context) {
      systemContent += `\n\nCURRENT CLIENT CONTEXT:\n${context}`;
    }

    const fullMessages = [
      { role: 'system', content: systemContent },
      ...messages
    ];

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: fullMessages,
        temperature: 0.7,
        max_tokens: 1024
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('[AI] Groq error:', response.status, errText);
      return res.status(502).json({
        message: 'AI service temporarily unavailable',
        details: errText.substring(0, 200)
      });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || '';

    res.json({
      success: true,
      reply,
      usage: data.usage
    });
  } catch (err) {
    console.error('[AI] Chat error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
