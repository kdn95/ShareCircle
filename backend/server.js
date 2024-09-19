const express = require('express');
const app = express();
const PORT = process.env.PORT || 5002;
app.get('/', (req, res) => res.send('Hello from the backend!'));
app.listen(PORT, () => console.log('Server running on port ' + PORT));
