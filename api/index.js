import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Middleware to parse JSON requests
app.use(express.json());

app.use(cors({
    origin: '*',  // You can also use '*' to allow any origin, but it's less secure
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow the methods you need
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allow specific headers
}));

// Route to call external API
app.get('/npi-api', async (req, res) => {
    try {
        // Replace with your external API URL
        const externalApiUrl = 'https://npiregistry.cms.hhs.gov/api/?number=&enumeration_type=NPI-1&taxonomy_description=&name_purpose=PROVIDER&first_name=JO*&use_first_name_alias=&last_name=SM*&organization_name=&address_purpose=&city=&state=&postal_code=&country_code=&limit=&skip=&pretty=&version=2.1';
        
        // Making the GET request to the external API
        const response = await axios.get(externalApiUrl);

        // Send the data received from the external API to the client
        res.json({
            message: 'Data fetched successfully',
            data: response.data,
        });
    } catch (error) {
        console.error('Error fetching data from external API:', error.message);


        res.status(500).json({
            message: 'Failed to fetch data from external API',
            error: error.message,
        });
    }
});

// Route to call external API
app.get('/humana-provider-api', async (req, res) => {
  try {
      // Replace with your external API URL
      const externalApiUrl = 'https://fhir.humana.com/api/Practitioner';

      // Making the GET request to the external API
      const response = await axios.get(externalApiUrl);

      // Send the data received from the external API to the client
      res.json({
          message: 'Data fetched successfully',
          data: response.data,
      });
  } catch (error) {
      console.error('Error fetching data from external API:', error.message);


      res.status(500).json({
          message: 'Failed to fetch data from external API',
          error: error.message,
      });
  }
});

// Route to call external API
app.get('/random-number-api', async (req, res) => {
  res.json({ message: 'Hello from Express!', random_number: Math.random() });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


// const express = require('express');
// const axios = require('axios');

// const app = express();
// const PORT = 3001;

// // Middleware to parse JSON requests
// app.use(express.json());


// // Route to call external API
// app.get('/external-api', async (req, res) => {
//     try {
//         // Replace with your external API URL
//         const externalApiUrl = 'https://npiregistry.cms.hhs.gov/api/?number=&enumeration_type=NPI-1&taxonomy_description=&name_purpose=PROVIDER&first_name=JO*&use_first_name_alias=&last_name=SM*&organization_name=&address_purpose=&city=&state=&postal_code=&country_code=&limit=&skip=&pretty=&version=2.1';
        
//         // Making the GET request to the external API
//         const response = await axios.get(externalApiUrl);

//         // Send the data received from the external API to the client
//         res.json({
//             message: 'Data fetched successfully',
//             data: response.data,
//         });
//     } catch (error) {
//         console.error('Error fetching data from external API:', error.message);

//         res.status(500).json({
//             message: 'Failed to fetch data from external API',
//             error: error.message,
//         });
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });


// export default function handler(req, res) {
//     res.status(200).json({ message: "Hello, World!", random_number: Math.random() });
//   }

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
