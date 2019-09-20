const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors')

const app = express();
const db = require('./config/keys').mongoURI;

//Database
mongoose.connect(db, {useNewUrlParser: true})
    .then( () => {console.info('Connected to database...')})
    .catch(err=> console.error(err));

// passport middleware
app.use(passport.initialize());

//enable cors for all requests
app.use(cors());

// passport config
require('./config/passport')(passport); 


// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

//Controllers
// const UserControl = require('./src/controllers/UserControl');

// Routes
const UserRoute = require('./src/routes/userRoute');
const OfficialRoute = require('./src/routes/officialRoute');
const VoterRoute = require('./src/routes/voterRoute');
const CountryRoute = require('./src/routes/countryRoute');
const StateRoute = require('./src/routes/stateRoute');
const LgaRoute = require('./src/routes/lgaRoute');
const PoolingUnitRoute = require('./src/routes/poolingUnitRoute');
const ElectionRoute = require('./src/routes/electionRoute');
const PartyRoute = require('./src/routes/partyRoute');
const VoteRoute = require('./src/routes/voteRoute');

app.use(UserRoute);
app.use(OfficialRoute);
app.use(VoterRoute);
app.use(CountryRoute);
app.use(StateRoute);
app.use(LgaRoute);
app.use(PoolingUnitRoute);
app.use(VoteRoute);
app.use(ElectionRoute);
app.use(PartyRoute);

//start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.info(`Server running on port ${PORT}...`));