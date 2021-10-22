const express = require('express');
const cors = require('cors');
const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('DB CONNECTED'))
.catch((err) => console.log('ERROR CONNECTED ', err));


// middlewares
app.use(cors());
app.use(express.json({ limit: "5mb" }));

// routes
fs.readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server on ${PORT}`));
