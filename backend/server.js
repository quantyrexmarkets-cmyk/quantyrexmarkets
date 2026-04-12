const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const dotenv = require('dotenv');
const path = require('path');
const rateLimit = require('express-rate-limit');

dotenv.config();

const processBotProfits = require('./utils/botCron');
const processCopyTradeProfits = require('./utils/copyTradeCron');
const processStakeProfits = require('./utils/stakeCron');
const processTrades = require('./utils/tradeCron');
const processInvestments = require('./utils/investmentCron');

const BOT_CRON_INTERVAL = 30 * 60 * 1000;
setInterval(processBotProfits, BOT_CRON_INTERVAL);
setInterval(processCopyTradeProfits, 4 * 60 * 60 * 1000);
setInterval(processStakeProfits, BOT_CRON_INTERVAL);
setInterval(processInvestments, 24 * 60 * 60 * 1000);
setTimeout(processInvestments, 10 * 1000);
setTimeout(processBotProfits, 60 * 1000);
setTimeout(processStakeProfits, 90 * 1000);
setInterval(processTrades, 15 * 1000);
setTimeout(processTrades, 5 * 1000);

const app = express();
app.set('trust proxy', 1);

app.use(helmet({ contentSecurityPolicy: false }));
app.use(mongoSanitize());
app.use(xss());
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || origin.includes('vercel.app') || origin.includes('localhost') || origin.includes('quantyrexmarkets')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/traders", require("./routes/traders"));

const globalLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100, message: { message: 'Too many requests, please try again later.' } });
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10, message: { message: 'Too many login attempts, please try again in 15 minutes.' } });
const adminLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 50, message: { message: 'Too many admin requests.' } });

let cachedDb = null;
async function connectDB() {
  if (cachedDb) return cachedDb;
  const db = await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000, socketTimeoutMS: 5000, connectTimeoutMS: 5000, bufferCommands: false });
  cachedDb = db;
  console.log('✅ MongoDB connected');
  return db;
}

app.use(async (req, res, next) => {
  try { await connectDB(); } catch(e) { return res.status(500).json({ message: 'DB connection failed' }); }
  next();
});

app.use('/api/', globalLimiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);
app.use('/api/admin', adminLimiter);

app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/deposit', require('./routes/deposit'));
app.use('/api/withdraw', require('./routes/withdraw'));
app.use('/api/trade', require('./routes/trade'));
app.use('/api/copy-trade', require('./routes/copyTrade'));
app.use('/api/packages', require('./routes/packages'));
app.use('/api/kyc', require('./routes/kyc'));
app.use('/api/stake', require('./routes/stake'));
app.use('/api/bots', require('./routes/bot'));
app.use('/api/referral', require('./routes/referral'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/push', require('./routes/push'));

app.get('/api/health', (req, res) => res.json({ status: 'OK', message: 'QuantyRex Markets API running' }));
app.get('/', (req, res) => res.json({ name: 'QuantyRex Markets API', status: 'running' }));

connectDB();

setInterval(() => {
  const https = require('https');
  https.get('https://quantyrexmarkets-backend.onrender.com/api/health', () => {}).on('error', () => {});
}, 5 * 60 * 1000);

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

// Serve email assets
app.use('/email-assets', express.static(path.join(__dirname, 'public/assets')));
app.use('/api', require('./routes/test-email'));
