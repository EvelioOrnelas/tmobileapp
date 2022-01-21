const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors());

app.use('/overview', (req, res) => {
  res.send({
    token: 'QIvtmmjeBLQCtbtr'
  });
});

app.listen(8080, () => console.log('API is running on http://localhost:8080/overview'));