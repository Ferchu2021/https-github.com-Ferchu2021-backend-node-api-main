import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import axios from 'axios';

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': 'El email debe tener un formato válido',
      'any.required': 'El email es requerido'
    }),
  contrasena: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'La contraseña debe tener al menos 6 caracteres',
      'any.required': 'La contraseña es requerida'
    })
});

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(loginSchema)
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3001/api/usuarios/login', {
        email: data.email,
        contrasena: data.contrasena
      });

      if (response.data.success) {
        onLogin(response.data.token, response.data.usuario);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
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

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              📧 Email
            </label>
            <input
              type="email"
              id="email"
              className={`form-control ${errors.email ? 'error' : ''}`}
              placeholder="tu@email.com"
              {...register('email')}
            />
            {errors.email && (
              <div className="form-error">{errors.email.message}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="contrasena" className="form-label">
              🔒 Contraseña
            </label>
            <input
              type="password"
              id="contrasena"
              className={`form-control ${errors.contrasena ? 'error' : ''}`}
              placeholder="Tu contraseña"
              {...register('contrasena')}
            />
            {errors.contrasena && (
              <div className="form-error">{errors.contrasena.message}</div>
            )}
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
            ¿No tienes una cuenta? Contacta al administrador
          </p>
          <p style={{ fontSize: '0.875rem', color: '#999' }}>
            💡 Credenciales de prueba: admin@techstore.com / admin123
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login; 