import express from 'express';

const app = express();
const port = 3001;

app.get('/api', (req, res) => {
    res.json({ message: 'Hello from Express!' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

import cors from 'cors';
import bodyParser from 'body-parser';

app.use(cors());
app.use(bodyParser.json());