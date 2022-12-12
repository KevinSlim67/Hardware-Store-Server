const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI);

//connect to database
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log("Connected to database"));

//allows communication between server and frontend
app.use(cors());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'https://flourishing-starship-7a1082.netlify.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
    });

//allow express server to use json
app.use(express.json());

//set up / route
app.get('/', async (req, res) => {
    try {
        res.json('Route / Handled');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//creating the route to the subscriber model
const productsRouter = require('./routes/products');
app.use('/products', productsRouter);


//start the sever
app.listen(process.env.PORT || 5000, () => console.log("Server Started"));

//ping the server every 5 minutes to prevent it from sleeping
setInterval(() => {
    console.log("ping");
}, 60000);



// const product = new Product({
//     description: " Samsung Galaxy Watch4",
//     category: 'smartwatch',
//     brand: 'apple',
//     OS: 'ios',
//     price: 499,
//     releaseDate: new Date(),
//     color: 'pink',
//     ram: '4gb',
//     cpu: 'amd',
//     disk: {storage: '32GB', category: 'hdd'},
//     numberSold: 2364,
//     stock: 1714,
//     image: 'https://i.ibb.co/tQqJ4v2/samsung-galaxy-watch4-smartwatch-removebg-preview.png'

//  });
//  product.save().then(() => console.log('Product Added')); 
