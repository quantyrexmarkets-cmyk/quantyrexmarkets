const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');

const SYSTEM_PROMPT = `You are an expert customer support assistant for Quantyrex Markets, a digital trading and investment platform.

Your role: Help the admin craft professional, calm, reassuring responses to clients. Generate emails, explain policies, handle objections, translate, and provide tactical advice.

Tone guidelines:
- Always professional, never defensive
- Calm and reassuring when clients are upset
- Clear and concise — clients have short attention spans
- Use the client's name when given
- Address concerns directly, then explain solution
- For fraud accusations: firmly clarify legitimacy without being dismissive
- For fee disputes: emphasize refundability and security purpose

Platform context:
- Quantyrex Markets offers forex, crypto, copy trading, staking, bots
- KYC verification required for all accounts
- Withdrawal code validation fee = one-time refundable security charge (credited back to dashboard)
- Registration fee = one-time account activation, paid off-platform
- Supports multiple currencies (USD, INR, NGN, EUR, GBP, etc.)
- Bank-grade security, end-to-end encryption, 2FA

When drafting responses: be ready to format as plain message, email, or short reply. Always end with a professional sign-off when drafting full messages.`;

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
