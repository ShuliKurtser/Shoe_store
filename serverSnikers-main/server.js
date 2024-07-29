// server.js

const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());
const cors = require('cors'); 
app.use(cors());

const shoesRouter = require('./routes/shoesRoutes');
const cartRouter = require('./routes/cartRoutes');
const favoritesRouter = require('./routes/favoritesRoutes');
const ordersRouter = require('./routes/ordersRoutes');
// הוספת נתיב עבור הנתיב הראשי


app.use('/shoes', shoesRouter);
app.use('/cart', cartRouter);
app.use('/favorites', favoritesRouter);
app.use('/orders',ordersRouter);

app.listen(port, () => {

  console.log(`port listen in port- http://localhost:${port}`);
});
