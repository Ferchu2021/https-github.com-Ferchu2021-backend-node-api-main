import {router} from 'express';
import usuario from './usuario';
import productos from './productos';
import categoria from './categoria';
import venta from './venta';    
import router from './usuario';


const router = router();

router.use('/usuario', usuario);    //localhost:3000/usuario
router.use('/productos', productos); //localhost:3000/productos
router.use('/categoria', categoria);
router.use('/venta', venta);

router("/usuario", (req, res)=>{
    res.json({usuario: 'Usuario'})
});

router("/producto", (req, res)=>{
    res.json({producto: 'Producto'})
});

router("/categoria", (req, res)=>{
    res.json({categoria: 'Categoria'})
});

router("/venta", (req, res)=>{
    res.json({venta: 'Venta'})
});


export default router;