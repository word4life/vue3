export default function handler(req, res) {
    res.status(200).json({ message: "Hello, World!", random_number: Math.random() });
  }

// import express from 'express';
// import cors from 'cors';
// import bodyParser from 'body-parser';

// const app = express();
// const port = 3001;


// app.get("/", (req, res) => res.send("Express on Vercel"));

// app.listen(3001, () => console.log("Server ready on port 3000."));





// app.use(cors({
//     origin: '*',  // You can also use '*' to allow any origin, but it's less secure
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow the methods you need
//     allowedHeaders: ['Content-Type', 'Authorization'],  // Allow specific headers
// }));

// app.use(bodyParser.json());
// app.get('/api', (req, res) => {
//     res.json({ message: 'Hello from Express!', random_number: Math.random() });
// });

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
