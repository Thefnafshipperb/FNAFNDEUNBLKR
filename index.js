const express = require('express');
const path = require('path');
const Unblocker = require('unblocker');

const app = express();

app.set('trust proxy', true);

app.use((req, res, next) => {
  if (req.headers['x-forwarded-host']) {
    req.headers.host = req.headers['x-forwarded-host'];
  }
  next();
});

const unblocker = new Unblocker({ prefix: '/proxy/' });

app.use(unblocker);
app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}).on('upgrade', unblocker.onUpgrade);
