import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import axios from 'axios';

const productoSchema = Joi.object({
  nombre: Joi.string().min(3).required().messages({
    'string.min': 'El nombre debe tener al menos 3 caracteres',
    'any.required': 'El nombre es requerido'
  }),
  precio: Joi.number().positive().required().messages({
    'number.positive': 'El precio debe ser positivo',
    'any.required': 'El precio es requerido'
  }),
  descripcion: Joi.string().min(10).required().messages({
    'string.min': 'La descripción debe tener al menos 10 caracteres',
    'any.required': 'La descripción es requerida'
  }),
  categoria: Joi.string().required().messages({
    'any.required': 'La categoría es requerida'
  }),
  stock: Joi.number().integer().min(0).required().messages({
    'number.integer': 'El stock debe ser un número entero',
    'number.min': 'El stock no puede ser negativo',
    'any.required': 'El stock es requerido'
  })
});

const Productos = ({ user }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(productoSchema)
  });

  // Productos de ejemplo
  const productosEjemplo = [
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
  ];

  useEffect(() => {
    // Simular carga de productos
    setTimeout(() => {
      setProductos(productosEjemplo);
      setLoading(false);
    }, 1000);
  }, []);

  const onSubmit = (data) => {
    if (editingProduct) {
      // Editar producto
      setProductos(productos.map(p => 
        p.id === editingProduct.id 
          ? { ...p, ...data }
          : p
      ));
    } else {
      // Crear nuevo producto
      const nuevoProducto = {
        id: Date.now(),
        ...data,
        imagen: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400'
      };
      setProductos([...productos, nuevoProducto]);
    }
    
    setShowModal(false);
    setEditingProduct(null);
    reset();
  };

  const handleEdit = (producto) => {
    setEditingProduct(producto);
    reset(producto);
    setShowModal(true);
  };

  const handleDelete = (producto) => {
    setProductToDelete(producto);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setProductos(productos.filter(p => p.id !== productToDelete.id));
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const openCreateModal = () => {
    setEditingProduct(null);
    reset();
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

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
          <button onClick={openCreateModal} className="btn btn-primary">
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
                    onClick={() => handleEdit(producto)}
                    className="btn btn-secondary"
                    style={{ flex: 1 }}
                  >
                    ✏️ Editar
                  </button>
                  <button 
                    onClick={() => handleDelete(producto)}
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

      {/* Modal para Crear/Editar Producto */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">
                {editingProduct ? '✏️ Editar Producto' : '➕ Nuevo Producto'}
              </h3>
              <button 
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label className="form-label">📝 Nombre del Producto</label>
                <input
                  type="text"
                  className={`form-control ${errors.nombre ? 'error' : ''}`}
                  placeholder="Ej: Laptop Gaming Pro"
                  {...register('nombre')}
                />
                {errors.nombre && (
                  <div className="form-error">{errors.nombre.message}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">💰 Precio</label>
                <input
                  type="number"
                  step="0.01"
                  className={`form-control ${errors.precio ? 'error' : ''}`}
                  placeholder="0.00"
                  {...register('precio')}
                />
                {errors.precio && (
                  <div className="form-error">{errors.precio.message}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">📂 Categoría</label>
                <select
                  className={`form-control ${errors.categoria ? 'error' : ''}`}
                  {...register('categoria')}
                >
                  <option value="">Seleccionar categoría</option>
                  <option value="Laptops">💻 Laptops</option>
                  <option value="Desktops">🖥️ Desktops</option>
                  <option value="Monitores">🖥️ Monitores</option>
                  <option value="Periféricos">⌨️ Periféricos</option>
                  <option value="Accesorios">🔌 Accesorios</option>
                </select>
                {errors.categoria && (
                  <div className="form-error">{errors.categoria.message}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">📦 Stock</label>
                <input
                  type="number"
                  className={`form-control ${errors.stock ? 'error' : ''}`}
                  placeholder="0"
                  {...register('stock')}
                />
                {errors.stock && (
                  <div className="form-error">{errors.stock.message}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">📄 Descripción</label>
                <textarea
                  className={`form-control ${errors.descripcion ? 'error' : ''}`}
                  rows="3"
                  placeholder="Describe las características del producto..."
                  {...register('descripcion')}
                />
                {errors.descripcion && (
                  <div className="form-error">{errors.descripcion.message}</div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  {editingProduct ? '💾 Guardar Cambios' : '➕ Crear Producto'}
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  style={{ flex: 1 }}
                  onClick={() => setShowModal(false)}
                >
                  ❌ Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Confirmación de Eliminación */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">🗑️ Confirmar Eliminación</h3>
              <button 
                className="modal-close"
                onClick={() => setShowDeleteModal(false)}
              >
                ×
              </button>
            </div>
            
            <div style={{ marginBottom: '2rem' }}>
              <p>¿Estás seguro de que quieres eliminar el producto:</p>
              <h4 style={{ color: '#dc3545', margin: '1rem 0' }}>
                "{productToDelete?.nombre}"?
              </h4>
              <p style={{ color: '#666', fontSize: '0.875rem' }}>
                Esta acción no se puede deshacer.
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                onClick={confirmDelete}
                className="btn btn-danger" 
                style={{ flex: 1 }}
              >
                🗑️ Eliminar
              </button>
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="btn btn-secondary" 
                style={{ flex: 1 }}
              >
                ❌ Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Productos; 