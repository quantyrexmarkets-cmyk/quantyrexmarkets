with open('src/App.jsx', 'r') as f:
    content = f.read()

old_private = '''const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div style={{color:'white',background:'#0e1628',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Loading...</div>;
  if (!user) {
    const token = localStorage.getItem('token');
    if (token) {
      return <div style={{color:'white',background:'#0e1628',minHeight:'100vh',padding:'20px',fontSize:'12px'}}>
        <p>Token exists but user is null.</p>
        <p>getMe() likely failed or returned no _id.</p>
        <p>Token preview: {token.substring(0,40)}...</p>
      </div>;
    }
    return <Navigate to="/signin" replace />;
  }
  return children;
};'''

new_private = '''const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div style={{color:'white',background:'#0e1628',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{textAlign:'center'}}>
          <div style={{width:'40px',height:'40px',border:'3px solid #6366f1',borderTop:'3px solid transparent',borderRadius:'50%',animation:'spin 1s linear infinite',margin:'0 auto 15px'}}></div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <p>Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    const token = localStorage.getItem('token');
    if (!token) {
      return <Navigate to="/signin" replace />;
    }
    // Token exists but user not loaded yet - show loading
    return (
      <div style={{color:'white',background:'#0e1628',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <p>Verifying session...</p>
      </div>
    );
  }
  
  return children;
};'''

if old_private in content:
    content = content.replace(old_private, new_private)
    print("Fixed PrivateRoute")
else:
    print("Pattern not found - manual fix needed")

with open('src/App.jsx', 'w') as f:
    f.write(content)
