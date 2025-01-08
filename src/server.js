import express from 'express';

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

app.get('/', (req, res) => {
    res.json('success')
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})