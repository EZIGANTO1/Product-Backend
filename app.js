const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const productRoute = require('./routes/productRoutes.js');
const userRoutes = require('./routes/userRoutes.js')
const cors = require('cors')

app.use(express.json())


//routes
app.use('/api/product', productRoute);
app.use('/api/user', userRoutes);




app.get('/', (req, res) => {
    res.send('Hello Eziganto, how are you')
  })

  app.listen(8080, () => {
    console.log('server is running in port 8080,');
  });
  
  mongoose.connect(
    'mongodb+srv://anthonyezigbo91:ucbvRHvRX9gBcbGN@cluster0.o54y5.mongodb.net/'
  ).then(() => {
    console.log('database connected');
  })
  .catch(() => {
    console.log('database not connected');
  });


  