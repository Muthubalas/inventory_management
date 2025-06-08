const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const { login } = require('./middleware/auth');

dotenv.config();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', login, productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));