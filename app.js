require('dotenv').config();
const express = require('express');
const app = express();
const DbConnect = require('./config/db');

const cors = require('cors');


const corsOption = {
    credentials: true,
    origin: ['http://localhost:3000'],
};
app.use(cors(corsOption));

const PORT =4000;
DbConnect();
app.use(express.json({ limit: '8mb' }));


app.use("/auth", require("./routes/user-auth")); //register,login Route


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));