const express = require('express');
const path = require('path');
const apiRoutes = require('.');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use("/api/notes", apiRoutes);

app.get('/notes', (req,res)=> {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.listen(PORT, () => console.log(`Your app is running at http://localhost:${PORT}`))