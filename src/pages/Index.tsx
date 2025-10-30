export default function Index() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#141414', 
      color: 'white',
      padding: '40px',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontSize: '48px', 
          marginBottom: '24px',
          background: 'linear-gradient(to right, #E21B24, #FFB300)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Welcome to Love Directory
        </h1>
        <p style={{ 
          fontSize: '20px', 
          color: '#AAAAAA',
          marginBottom: '32px'
        }}>
          Discover and connect with verified professionals
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <a href="/auth?mode=signup" style={{
            padding: '12px 32px',
            background: '#E21B24',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: '600'
          }}>
            Get Started
          </a>
          <a href="/pricing" style={{
            padding: '12px 32px',
            border: '1px solid #E21B24',
            color: '#E21B24',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: '600'
          }}>
            View Pricing
          </a>
        </div>
      </div>
    </div>
  );
}
