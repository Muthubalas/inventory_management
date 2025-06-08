const express=require('express');
const jwt=require('jsonwebtoken');
const db=require('../db');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const dotenv=require('dotenv');
dotenv.config();
const router=express.Router();
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await db.execute(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, role]
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login',async(req,res)=>{
    const{email,password}=req.body;
  try {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) return res.status(401).json({ message: 'Invalid credentials' });
      const user = rows[0];

    
    const isMatch = await bcrypt.compare(password, user.password);
//Compare password
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
})

module.exports = router;