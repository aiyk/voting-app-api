const express = require('express');
const mongoose = require('mongoose');

const app = express();

//Database
mongoose.connect('mongodb://127.0.0.1:27017/voting-app', {useNewUrlParser: true})
    .then( () => {console.log('Connected to database...')})
    .catch(err=> console.error(err));


// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//Controllers
// const UserControl = require('./src/controllers/UserControl');

// Routes
const UserRoute = require('./src/routes/userRoute');
const VoterRoute = require('./src/routes/voterRoute');
const CountryRoute = require('./src/routes/countryRoute');
const StateRoute = require('./src/routes/stateRoute');
const LgaRoute = require('./src/routes/lgaRoute');

app.use(UserRoute);
app.use(VoterRoute);
app.use(CountryRoute);
app.use(StateRoute);
app.use(LgaRoute);

//start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.info(`Server starteed on port ${PORT}...`));