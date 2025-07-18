require('dotenv').config();

const express = require('express');
const cors = require('cors');
const dbConfig = require('./config/dbConfig');
const userRoute = require('./routes/userRoute');
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/user', userRoute);


console.log(process.env.M0NGO_URL);
app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});

