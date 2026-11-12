const express = require('express');
const Unblocker = require('unblocker');

const app = express();
const unblocker = new Unblocker({ prefix: '/proxy/' });

app.use(unblocker);

app.get('/', (req, res) => {
  res.send('Node Unblocker is running. Append /proxy/https://example.com to the URL.');
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}).on('upgrade', unblocker.onUpgrade);
