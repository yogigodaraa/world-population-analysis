const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { analyzePopulation } = require('./analysis');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

app.post('/analyze', upload.single('csvfile'), (req, res) => {
    const { region } = req.body;
    const csvfile = req.file.path;

    try {
        const result = analyzePopulation(csvfile, region);
        fs.unlinkSync(csvfile); // Clean up uploaded file
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});