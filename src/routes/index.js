import {router} from 'express';
const router = routes();
router.get('/usuario', (req, res)=>{
    res.json({usuario: 'usuario'})
});

router("/producto", (req, res)=>{
    res.json({producto: 'Producto'})
});

router("/categoria", (req, res)=>{
    res.json({categoria: 'Categoria'})
});

router("/venta", (req, res)=>{
export default router;