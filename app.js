const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const productRoute = require('./routes/productRoutes.js');
const userRoutes = require('./routes/userRoutes.js')
const dotenv = require('dotenv')
const cors = require('cors')

app.use(express.json())
app.use(cors())

dotenv.config();

//routes
app.use('/api/product', productRoute);
app.use('/api/user', userRoutes);




app.get('/', (req, res) => {
    res.send('Hello Eziganto, how are you')
  })

  app.listen(process.env.PORT, () => {
    console.log('server is running in port 8080,');
  });
  
  mongoose
  .connect(
    process.env.mongodb_url)
  .then(() => {
    console.log('database connected');
  })
  .catch(() => {
    console.log('database not connected');
  });


  