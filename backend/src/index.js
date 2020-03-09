const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
mongoose.connect('mongodb+srv://mongo:mongodb@omnistack10-jvggi.mongodb.net/week10?retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useUnifiedTopology: true
});
app.use(express.json());
// MUST BE AFTER app.use(express.json())
app.use(routes);

app.listen(4200);
