import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = 3001;

// Middleware to parse JSON requests
app.use(express.json());

app.use(
  cors({
    origin: "*", // You can also use '*' to allow any origin, but it's less secure
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow the methods you need
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  })
);

// Route to call external API
app.get("/npi-api", async (req, res) => {
  try {
    // Replace with your external API URL
    const externalApiUrl =
      "https://npiregistry.cms.hhs.gov/api/?number=&enumeration_type=NPI-1&taxonomy_description=&name_purpose=PROVIDER&first_name=JO*&use_first_name_alias=&last_name=SM*&organization_name=&address_purpose=&city=&state=&postal_code=&country_code=&limit=&skip=&pretty=&version=2.1";

    // Making the GET request to the external API
    const response = await axios.get(externalApiUrl);

    // Send the data received from the external API to the client
    res.json({
      message: "Data fetched successfully",
      data: response.data,
    });
  } catch (error) {
    console.error("Error fetching data from external API:", error.message);

    res.status(500).json({
      message: "Failed to fetch data from external API",
      error: error.message,
    });
  }
});

//     // Route to call external API
// app.get('/humana-provider-api', async (req, res) => {
//     try {
//         // Replace with your external API URL
//         const externalApiUrl = 'https://fhir.humana.com/api/Practitioner';

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
//     });

import { supabase } from "../src/lib/supabase.js";
import { v4 as uuidv4 } from "uuid";
import { id } from "vuetify/locale";

// Initialize Supabase client

app.get("/humana-provider-api", async (req, res) => {
  try {
    const externalApiUrl = "https://fhir.humana.com/api/Practitioner";

    // Fetch data from the external API
    const { data } = await axios.get(externalApiUrl, { timeout: 1000000 });

    // const bundleId = uuidv4(); // Generate a unique ID for the Bundle

    // // Save to Bundle table
    // const { error: bundleError } = await supabase.from("bundle").insert([
    //   {
    //     id: bundleId,
    //     version_id: data.meta?.versionId,
    //     last_updated: data.meta?.lastUpdated,
    //     type: data.type,
    //     timestamp: data.timestamp,
    //     total: data.total,
    //   },
    // ]);
    // if (bundleError) throw new Error(bundleError.message);

    // // Save entries (Practitioner and related data)
    // for (const entry of data.entry || []) {
    //   const resource = entry.resource;

    //   if (resource.resourceType === "Practitioner") {
    //     const practitionerId = uuidv4();

    //     // Insert into Practitioner table
    //     const { error: practitionerError } = await supabase
    //       .from("practitioner")
    //       .insert([
    //         {
    //           id: practitionerId,
    //           bundle_id: bundleId,
    //           version_id: resource.meta?.versionId,
    //           last_updated: resource.meta?.lastUpdated,
    //           npi: resource.identifier?.[0]?.value,
    //           active: resource.active,
    //           gender: resource.gender,
    //         },
    //       ]);
    //     if (practitionerError) throw new Error(practitionerError.message);

    //     // Insert into PractitionerName table
    //     for (const name of resource.name || []) {

    //       const { error: nameError } = await supabase
    //         .from("practitioner_name")
    //         .insert([
    //           {
    //             practitioner_id: practitionerId,
    //             family_name: name.family,
    //             given_name: name.given?.join(" "),
    //           },
    //         ]);
    //       if (nameError) throw new Error(nameError.message);
    //     }

    //       // Insert into practitioner_telecom table
    //       for (const telecom of resource.telecom || []) {
    //         const { error: telecomError } = await supabase
    //           .from('practitioner_telecom')
    //           .insert([
    //             {
    //               practitioner_id: practitionerId,
    //               system: telecom.system,
    //               value: telecom.value,
    //               use: telecom.use,
    //             },
    //           ]);
    //         if (telecomError) throw new Error(telecomError.message);
    //       }

    //       // Insert into practitioner_communication table
    //       for (const communication of resource.communication || []) {
    //         const { error: communicationError } = await supabase
    //           .from('practitioner_communication')
    //           .insert([
    //             {
    //               practitioner_id: practitionerId,
    //               language: communication.coding?.[0]?.display,
    //             },
    //           ]);
    //         if (communicationError) throw new Error(communicationError.message);
    //       }
    //   }
    // }

    res.json({
      message: "Data fetched and saved successfully",
      data: data,
    });
  } catch (error) {
    console.error("Error fetching or saving data:", error);

    res.status(500).json({
      message: "Failed to fetch or save data",
      error: error.message,
    });
  }
});

// Route to call external API
app.get("/random-number-api", async (req, res) => {
  res.json({ message: "Hello from Express!", random_number: Math.random() });
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
