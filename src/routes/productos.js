import {router} from 'express';
const router = routes();

router.get('/productos', (req, res)=>{ 
  res.json({productos: 'productos'});
});

export default router;