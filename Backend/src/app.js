// Importacion de los modulos
const express = require('express')
const cors = require("cors")
const bodyParser=require('body-parser');
const app = express();
const PORT= process.env.PORT || 3000;


const authRoutes = require('./routes/auth')
const dbRoutes = require('./routes/db')
const superVisorRoutes = require('./routes/supervisor')
const employeeRoutes = require('./routes/employee')
const productRoutes = require('./routes/product')
const bookRoutes = require('./routes/book')



app.use(cors({
    origin: '*', // Permitir cualquier origen
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
}));


app.use(express.json())
app.use(bodyParser.json());

app.use('/auth',authRoutes);
app.use('/dbroute',dbRoutes);
app.use('/supervisor',superVisorRoutes);
app.use('/employee',employeeRoutes);
app.use('/product',productRoutes);
app.use('/book',bookRoutes);

app.use(bodyParser.json({limit: '15mb'}));

//app.use(cors());

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
  });

module.exports= app;