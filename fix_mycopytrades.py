with open('src/pages/MyCopyTrades.jsx', 'r') as f:
    content = f.read()

# Fix stats cards
old_stats = """        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px', marginBottom: '20px' }}>
          <div style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,41,59,0.8))', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
            <TrendingUp size={16} color='#6366f1' style={{ marginBottom: '6px' }}/>
            <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.5)', marginBottom: '4px' }}>Total Invested</div>
            <div style={{ fontSize: '12px', fontWeight: '800', color: '#6366f1' }}>{formatAmountWithCode(totalInvested, currency)}</div>
          </div>
          <div style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,41,59,0.8))', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
            <DollarSign size={16} color={totalReturns >= 0 ? '#22c55e' : '#ef4444'} style={{ marginBottom: '6px' }}/>
            <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.5)', marginBottom: '4px' }}>Total Returns</div>
            <div style={{ fontSize: '12px', fontWeight: '800', color: totalReturns >= 0 ? '#22c55e' : '#ef4444' }}>{formatAmountWithCode(Math.abs(totalReturns), currency)}</div>
          </div>
          <div style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,41,59,0.8))', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
            <Clock size={16} color='#f59e0b' style={{ marginBottom: '6px' }}/>
            <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.5)', marginBottom: '4px' }}>Active Trades</div>
            <div style={{ fontSize: '12px', fontWeight: '800', color: '#f59e0b' }}>{copyTrades.length}</div>
          </div>
        </div>"""

new_stats = """        {/* Stats */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
          <div style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,41,59,0.8))', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '12px', padding: '6px', flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', boxShadow: '0 4px 24px rgba(99,102,241,0.1)' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(99,102,241,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><TrendingUp size={14} color="#6366f1"/></div>
            <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '7px' }}>Total Invested</div>
            <div style={{ color: '#6366f1', fontSize: '10px', fontWeight: '700' }}>{formatAmountWithCode(totalInvested, currency)}</div>
          </div>
          <div style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,41,59,0.8))', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '12px', padding: '6px', flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', boxShadow: '0 4px 24px rgba(99,102,241,0.1)' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: totalReturns >= 0 ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><DollarSign size={14} color={totalReturns >= 0 ? '#22c55e' : '#ef4444'}/></div>
            <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '7px' }}>Total Returns</div>
            <div style={{ color: totalReturns >= 0 ? '#22c55e' : '#ef4444', fontSize: '10px', fontWeight: '700' }}>{formatAmountWithCode(Math.abs(totalReturns), currency)}</div>
          </div>
          <div style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,41,59,0.8))', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '12px', padding: '6px', flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', boxShadow: '0 4px 24px rgba(99,102,241,0.1)' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(245,158,11,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Clock size={14} color="#f59e0b"/></div>
            <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '7px' }}>Active Trades</div>
            <div style={{ color: '#f59e0b', fontSize: '10px', fontWeight: '700' }}>{copyTrades.length}</div>
          </div>
        </div>"""

if old_stats in content:
    content = content.replace(old_stats, new_stats)
    print("✅ Stats cards fixed!")
else:
    print("❌ Stats pattern not found")

with open('src/pages/MyCopyTrades.jsx', 'w') as f:
    f.write(content)
