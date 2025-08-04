import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="fade-in">
      {/* Hero Section */}
      <div className="card" style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        textAlign: 'center',
        padding: '4rem 2rem'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          🖥️ TechStore
        </h1>
        <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
          Tu tienda de confianza para equipos de informática de alta calidad
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/login" className="btn btn-primary">
            🔐 Acceder al Sistema
          </Link>
        </div>
      </div>

      {/* Información de la Empresa */}
      <div className="card">
        <h3 className="card-title">🏢 Sobre TechStore</h3>
        <p>
          Somos una empresa especializada en la venta de equipos de informática de alta calidad. 
          Ofrecemos laptops, desktops, monitores, periféricos y accesorios de las mejores marcas 
          del mercado.
        </p>
        <p>
          Nuestro compromiso es brindar productos de calidad con el mejor servicio al cliente 
          y soporte técnico especializado.
        </p>
      </div>
    </div>
  );
};

export default Home; 