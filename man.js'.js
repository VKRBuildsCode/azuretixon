// Import the express module
const express = require('express');
const serverless = require('serverless-http'); // Ensure you have node-fetch installed
const cors=require("cors")
// Create an instance of an Express application
const app = express();
const corsOptions = {
    origin: '*', // Replace with your client's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
var access_token="1000.6a3143214393e5174a1cdb76829fcf0a.e40c23e20dced0b0056869a51f407184"
app.options('*', cors());
app.use(cors(corsOptions));

// Set up a route for the root URL
app.get('/', async (req, res) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    });
    const url = 'https://zohoapis.in/backstage/v3/portals/60034551768/events';
    const response = await fetch(url,
        {
            headers:{
                'Authorization': 'Zoho-oauthtoken '+access_token,
            },
        }
    ); // Fetch data from the URL
    let events = await response.json();

    if(JSON.stringify(events)===JSON.stringify({"status_code":"401","message":"Please provide a valid OAuthScope"})){
        const response = await fetch("https://accounts.zoho.in/oauth/v2/token?client_id=1000.G5JKYIDEPYVOJG1I2P618NTBEZXKVV&client_secret=bf458d3bd3d88a0687d91b242f8043ca12c5da0504&grant_type=refresh_token&code=1000.c3da05e7d19d9cc7b8f5fcd9cc6ba1c0.9a834b3f4d9be4ffaae3a97b53d01f09&scope=zohobackstage.event.READ&refresh_token=1000.3dc4a084c322c71f37678a87c9e8858b.99472d094d3ade6926370e12d1c8f65f",
            {
                method: "POST"
            })
        const eventss = await response.json();
        access_token=eventss['access_token']
        const url = 'https://zohoapis.in/backstage/v3/portals/60034551768/events';
        const response2 = await fetch(url,
            {
                headers:{
                    'Authorization': 'Zoho-oauthtoken '+access_token,
                },
            }
        );
        res.set({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        });
        events = await response2.json();
    }
    res.send(events);
});
app.listen(4600)
// Export as serverless handler
// module.exports.handler = serverless(app);