const express = require('express');
const db = require('../db');
const { authorizeRoles } = require('../middleware/auth');
const router = express.Router();

//Get all products
router.get('/',async(req,res)=>{
    try{
const[rows]=await db.execute('SELECT * FROM  products');
res.json(rows);
    }
    catch(err){
res.status(500).json({message:'Error fetching products'});
    }
});

//Create product and access only for admin

router.post('/',authorizeRoles('admin'),async (req,res)=>{
     const { name, product_code, quantity, price, description } = req.body;
       const userId = req.user?.id; 
    try{
   await db.execute(
      'INSERT INTO products (name, product_code, quantity, price, description, created_by, updated_by) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, product_code, quantity, price, description || '', userId, userId]
    );
    res.sendStatus(201);
    }
    catch(err){
      res.status(500).json({message:'Error creating products'});  
    }
});

//Update product and access only for admin

router.put('/:id',authorizeRoles('admin'),async (req,res)=>{
       const { name, quantity, price, description } = req.body;
  const updated_by = req.user.id;
  const productId = req.params.id;
    try{
   await db.execute(
      'UPDATE products SET name=?, quantity=?, price=?, description=?, updated_at=CURRENT_TIMESTAMP, updated_by=? WHERE id=?',
      [name, quantity, price, description, updated_by,productId]
    );
    res.sendStatus(200);
    }
    catch(err){
      res.status(500).json({message:'Error updating products'});  
    }
});

//Delete product and access only for admin

router.delete('/:id',authorizeRoles('admin'),async (req,res)=>{
   
    try{
   await db.execute(
      'DELETE FROM products WHERE id=?',
      [req.params.id]
    );
    res.sendStatus(200);
    }
    catch(err){
      res.status(500).json({message:'Error updating products'});  
    }
});

module.exports = router;