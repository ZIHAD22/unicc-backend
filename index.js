const express = require('express')
const path = require('path');
const fs = require('fs');
const app = express()
const port = 4050

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/submit-form', (req, res) => {
    // Extract form data from request body
    const formData = req.body;

    const fs = require('fs').promises; // Use promises with fs
    const path = require('path');
    
    // Define the path to the JSON file
    const filePath = path.join(__dirname, 'data.json');
    
    // Function to read existing data from the JSON file
    async function readData() {
        try {
            const data = await fs.readFile(filePath, 'utf8');
            return JSON.parse(data); // Parse the JSON data
        } catch (error) {
            // Return an empty array if file not found or parsing error
            if (error.code === 'ENOENT') return []; // File not found
            throw new Error('Error reading or parsing data: ' + error.message);
        }
    }
    
    // Function to write data back to the JSON file
    async function writeData(data) {
        try {
            await fs.writeFile(filePath, JSON.stringify(data, null, 2));
            console.log('Data appended successfully.');
        } catch (error) {
            throw new Error('Error writing data: ' + error.message);
        }
    }
    
    // Main function to append new data
    async function appendData(newData) {
        try {
            const jsonData = await readData(); // Read existing data
            jsonData.push(newData); // Append new data
            await writeData(jsonData); // Write updated data
        } catch (error) {
            console.error(error.message);
        }
    }

    
    // Call the function to append new data
    appendData(formData);
    
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
