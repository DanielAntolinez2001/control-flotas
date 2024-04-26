import express from 'express';

console.log("Hello via Bun!");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const port = 3000;

app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!');
});

app.listen(3002, () => {
    console.log("Server is running on http://localhost:3000");
});