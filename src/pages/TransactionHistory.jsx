import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { formatAmount } from '../utils/currency';
import PageHeader from '../components/PageHeader';
import { getDeposits, getWithdrawals } from '../services/api';
import { DollarSign, ArrowUpDown, Clock } from 'lucide-react';

export default function TransactionHistory() {
  const { user } = useAuth();
  const { current: t } = useTheme();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [show, setShow] = useState(10);
  const perPage = show;
  const [filter, setFilter] = useState('All');
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [deposits, withdrawals] = await Promise.all([getDeposits(), getWithdrawals()]);
        const deps = Array.isArray(deposits) ? deposits.map(d => ({ ...d, txnType: 'Deposit' })) : [];
        const withs = Array.isArray(withdrawals) ? withdrawals.map(w => ({ ...w, txnType: 'Withdrawal' })) : [];
        const all = [...deps, ...withs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setTransactions(all);
      } catch (err) {
        console.error('Failed to fetch transactions:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const filtered = transactions.filter(txn => {
    const matchSearch =
      t._id?.toLowerCase().includes(search.toLowerCase()) ||
      txn.method?.toLowerCase().includes(search.toLowerCase()) ||
      txn.txnType?.toLowerCase().includes(search.toLowerCase()) ||
      txn.status?.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === 'All' ||
      (filter === 'Deposit' && txn.txnType === 'Deposit') ||
      (filter === 'Withdrawal' && txn.txnType === 'Withdrawal') ||
      (filter === 'Completed' && txn.status === 'approved') ||
      (filter === 'Pending' && txn.status === 'pending') ||
      (filter === 'Failed' && txn.status === 'rejected');
    return matchSearch && matchFilter;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const statusLabel = s => s === 'approved' ? 'Completed' : s === 'rejected' ? 'Failed' : 'Pending';
  const statusColor = s => s === 'approved' ? '#22c55e' : s === 'rejected' ? '#ef4444' : '#f59e0b';
  const typeColor = t => t === 'Deposit' ? '#22c55e' : '#ec4899';

  const totalDeposits = transactions.filter(txn => txn.txnType === 'Deposit' && txn.status === 'approved').reduce((s, txn) => s + txn.amount, 0);
  const totalWithdrawals = transactions.filter(txn => txn.txnType === 'Withdrawal' && txn.status === 'approved').reduce((s, txn) => s + txn.amount, 0);
  const pendingCount = transactions.filter(txn => txn.status === 'pending').length;

  return (
    <div style={{ minHeight: '100vh', background: t.bg, fontFamily: "'Segoe UI', sans-serif", color: t.text }}>
      <PageHeader title="Transaction History" />
      <div style={{ padding: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
          <div style={{ width: '4px', height: '16px', background: '#6366f1' }}/>
          <span style={{ color: t.text, fontSize: '11px', fontWeight: '700' }}>Transaction History</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
          <div style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,41,59,0.8))', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '12px', padding: '6px', flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', boxShadow: '0 4px 24px rgba(99,102,241,0.1)' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(34,197,94,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><DollarSign size={14} color="#22c55e"/></div>
            <div style={{ color: t.subText, fontSize: '7px' }}>Total Deposits</div>
            <div style={{ color: '#22c55e', fontSize: '10px', fontWeight: '700' }}>{formatAmount(totalDeposits, user?.currency)}</div>
          </div>
          <div style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,41,59,0.8))', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '12px', padding: '6px', flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', boxShadow: '0 4px 24px rgba(99,102,241,0.1)' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(236,72,153,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ArrowUpDown size={14} color="#ec4899"/></div>
            <div style={{ color: t.subText, fontSize: '7px' }}>Total Withdrawals</div>
            <div style={{ color: '#ec4899', fontSize: '10px', fontWeight: '700' }}>{formatAmount(totalWithdrawals, user?.currency)}</div>
          </div>
          <div style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,41,59,0.8))', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '12px', padding: '6px', flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', boxShadow: '0 4px 24px rgba(99,102,241,0.1)' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(245,158,11,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Clock size={14} color="#f59e0b"/></div>
            <div style={{ color: t.subText, fontSize: '7px' }}>Pending</div>
            <div style={{ color: '#f59e0b', fontSize: '10px', fontWeight: '700' }}>{pendingCount}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', flexWrap: 'wrap' }}>
          {['All', 'Deposit', 'Withdrawal', 'Completed', 'Pending', 'Failed'].map(f => (
            <button key={f} onClick={() => { setFilter(f); setPage(1); }} style={{ padding: '4px 10px', background: filter === f ? '#6366f1' : t.subtleBg, border: 'none', color: filter === f ? 'white' : t.subText, fontSize: '8px', fontWeight: '600', cursor: 'pointer' }}>{f}</button>
          ))}
        </div>
        <div style={{ background: t.cardBg, border: `1px solid ${t.subtleBorder}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', borderBottom: `1px solid ${t.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ color: t.subText, fontSize: '8px' }}>Show</span>
              <select value={show} onChange={e => { setShow(Number(e.target.value)); setPage(1); }} style={{ background: t.border, border: `1px solid ${t.border}`, color: t.text, fontSize: '8px', padding: '2px 5px', outline: 'none' }}>
                <option>10</option><option>25</option><option>50</option>
              </select>
              <span style={{ color: t.subText, fontSize: '8px' }}>entries</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ color: t.subText, fontSize: '8px' }}>Search:</span>
              <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} style={{ background: t.border, border: `1px solid ${t.border}`, color: t.text, fontSize: '8px', padding: '3px 8px', outline: 'none', width: '90px' }} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.4fr 1.2fr 0.8fr 0.8fr 0.8fr', background: t.tableHeaderBg, borderBottom: `1px solid ${t.border}` }}>
            {['Txn ID', 'Date', 'Method', 'Type', 'Amount', 'Status'].map((h, i) => (
              <span key={i} style={{ color: t.subText, fontSize: '7px', fontWeight: '700', borderRight: '1px solid #6366f1', borderBottom: '1px solid #6366f1', padding: '7px 8px', display: 'block' }}>{h} ↕</span>
            ))}
          </div>
          {loading ? (
            <div style={{ padding: '24px', textAlign: 'center', color: t.faintText, fontSize: '8px' }}>Loading...</div>
          ) : paginated.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: t.faintText, fontSize: '8px' }}>No transactions found</div>
          ) : paginated.map((txn, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.4fr 1.2fr 0.8fr 0.8fr 0.8fr', padding: '8px 10px', borderBottom: `1px solid ${t.tableRowBorder}`, background: i % 2 === 0 ? 'transparent' : t.subtleBg }}>
              <span style={{ color: '#818cf8', fontSize: '7px' }}>#{t._id?.slice(-8).toUpperCase()}</span>
              <span style={{ color: t.subText, fontSize: '7px' }}>{new Date(txn.createdAt).toLocaleString()}</span>
              <span style={{ color: t.subText, fontSize: '7px' }}>{txn.method || '—'}</span>
              <span style={{ color: typeColor(txn.txnType), fontSize: '7px', fontWeight: '600' }}>{txn.txnType}</span>
              <span style={{ color: typeColor(txn.txnType), fontSize: '7px', fontWeight: '700' }}>{txn.txnType === 'Deposit' ? '+' : '-'}{formatAmount(txn.amount || 0, user?.currency)}</span>
              <span style={{ background: statusColor(txn.status) + '20', color: statusColor(txn.status), fontSize: '6px', fontWeight: '700', padding: '2px 5px', display: 'inline-block' }}>{statusLabel(txn.status)}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 10px', borderTop: `1px solid ${t.tableRowBorder}` }}>
            <span style={{ color: t.faintText, fontSize: '8px' }}>Showing {filtered.length === 0 ? 0 : (page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)} of {filtered.length} entries</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button onClick={() => setPage(1)} disabled={page === 1} style={{ background: t.border, border: `1px solid ${t.border}`, color: page === 1 ? t.faintText : t.paginationText, fontSize: '8px', padding: '2px 6px', cursor: page === 1 ? 'default' : 'pointer' }}>«</button>
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ background: t.border, border: `1px solid ${t.border}`, color: page === 1 ? t.faintText : t.paginationText, fontSize: '10px', padding: '2px 8px', cursor: page === 1 ? 'default' : 'pointer' }}>‹</button>
              <span style={{ color: t.subText, fontSize: '8px' }}>Page {page} of {totalPages || 1}</span>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages} style={{ background: t.border, border: `1px solid ${t.border}`, color: page >= totalPages ? t.faintText : t.paginationText, fontSize: '10px', padding: '2px 8px', cursor: page >= totalPages ? 'default' : 'pointer' }}>›</button>
              <button onClick={() => setPage(totalPages)} disabled={page >= totalPages} style={{ background: t.border, border: `1px solid ${t.border}`, color: page >= totalPages ? t.faintText : t.paginationText, fontSize: '8px', padding: '2px 6px', cursor: page >= totalPages ? 'default' : 'pointer' }}>»</button>
            </div>
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center", padding: "16px", color: t.faintText, fontSize: "7px", borderTop: `1px solid ${t.tableRowBorder}`, marginTop: "16px" }}>2020-2026 &copy; Quantyrex Markets</div>

    </div>
  );
}