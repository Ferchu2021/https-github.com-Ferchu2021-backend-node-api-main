import { useState } from 'react';

const Productos = ({ user }) => {
  const [productos] = useState([
    {
      id: 1,
      nombre: 'Laptop Gaming Pro',
      precio: 1299.99,
      descripcion: 'Laptop de alto rendimiento para gaming y trabajo profesional con RTX 4060',
      categoria: 'Laptops',
      stock: 15,
      imagen: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400'
    },
    {
      id: 2,
      nombre: 'Monitor 4K Ultra HD',
      precio: 599.99,
      descripcion: 'Monitor de 27" con resolución 4K para una experiencia visual excepcional',
      categoria: 'Monitores',
      stock: 8,
      imagen: 'https://images.unsplash.com/photo-1544866092-1677b00f868b?w=400'
    },
    {
      id: 3,
      nombre: 'Teclado Mecánico RGB',
      precio: 149.99,
      descripcion: 'Teclado mecánico con switches Cherry MX y iluminación RGB personalizable',
      categoria: 'Periféricos',
      stock: 25,
      imagen: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400'
    },
    {
      id: 4,
      nombre: 'Mouse Gaming Wireless',
      precio: 89.99,
      descripcion: 'Mouse inalámbrico de alta precisión con 25,600 DPI para gaming profesional',
      categoria: 'Periféricos',
      stock: 30,
      imagen: 'https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?w=400'
    }
  ]);

  return (
    <div className="fade-in">
      {/* Header */}
      <div className="card" style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
              🛒 Gestión de Productos
            </h1>
            <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
              Administra el catálogo de equipos informáticos
            </p>
          </div>
          <button className="btn btn-primary">
            ➕ Agregar Producto
          </button>
        </div>
      </div>

      {/* Lista de Productos */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">📦 Productos ({productos.length})</h2>
        </div>
        
        <div className="grid grid-4">
          {productos.map(producto => (
            <div key={producto.id} className="product-card">
              <img 
                src={producto.imagen} 
                alt={producto.nombre} 
                className="product-image"
              />
              <div className="product-info">
                <h3 className="product-title">{producto.nombre}</h3>
                <div className="product-price">${producto.precio}</div>
                <p className="product-description">{producto.descripcion}</p>
                
                <div style={{ marginBottom: '1rem' }}>
                  <span style={{ 
                    background: '#e9ecef', 
                    padding: '0.25rem 0.5rem', 
                    borderRadius: '3px',
                    fontSize: '0.875rem'
                  }}>
                    📂 {producto.categoria}
                  </span>
                  <span style={{ 
                    background: producto.stock > 10 ? '#d4edda' : '#f8d7da',
                    color: producto.stock > 10 ? '#155724' : '#721c24',
                    padding: '0.25rem 0.5rem', 
                    borderRadius: '3px',
                    fontSize: '0.875rem',
                    marginLeft: '0.5rem'
                  }}>
                    📦 Stock: {producto.stock}
                  </span>
                </div>
                
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    className="btn btn-secondary"
                    style={{ flex: 1 }}
                  >
                    ✏️ Editar
                  </button>
                  <button 
                    className="btn btn-danger"
                    style={{ flex: 1 }}
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Productos; 