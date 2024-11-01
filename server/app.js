const express = require('express');
const cors = require('cors')

const router = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);

const PORT = 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
