const express = require('express');
const app = express();
const path = require('path');

const mongoose = require('mongoose');

const PORT = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/fire_calculator', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

fireRouter = require('./routes/api');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', fireRouter);

app.post('/api/load_user', fireRouter);

app.post('/api/update_user', fireRouter);

app.delete('/api/delete_user/:username', fireRouter);

app.get('/api/calculate_target', fireRouter);

app.listen(3000, () => console.log('app is running')); //listens on port 3000 -> http://localhost:3000/
