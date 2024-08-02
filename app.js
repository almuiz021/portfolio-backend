const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    status: 'success',
    data: 'THIS IS GOING ON',
  });
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server is Running on ${port}`);
});
