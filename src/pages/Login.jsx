import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simular login exitoso
    setTimeout(() => {
      const mockUser = {
        _id: '1',
        nombre: 'Admin',
        email: 'admin@techstore.com',
        activo: true
      };
      const mockToken = 'mock-jwt-token';
      
      onLogin(mockToken, mockUser);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="fade-in" style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem' }}>
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">🔐 Iniciar Sesión - TechStore</h2>
          <p style={{ color: '#666', margin: 0 }}>
            Accede a tu cuenta para gestionar productos y pedidos
          </p>
        </div>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              📧 Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="tu@email.com"
              defaultValue="admin@techstore.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contrasena" className="form-label">
              🔒 Contraseña
            </label>
            <input
              type="password"
              id="contrasena"
              className="form-control"
              placeholder="Tu contraseña"
              defaultValue="admin123"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%' }}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="spinner" style={{ 
                  width: '20px', 
                  height: '20px', 
                  borderWidth: '2px',
                  display: 'inline-block',
                  marginRight: '0.5rem'
                }}></div>
                Iniciando sesión...
              </>
            ) : (
              '🔐 Iniciar Sesión'
            )}
          </button>
        </form>

        <div style={{ 
          marginTop: '2rem', 
          paddingTop: '1rem', 
          borderTop: '1px solid #eee',
          textAlign: 'center'
        }}>
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            💡 Credenciales de prueba: admin@techstore.com / admin123
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login; 