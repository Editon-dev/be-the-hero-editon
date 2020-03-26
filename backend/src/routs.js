const express = require('express');
const OngControler = require('./database/controler/OngControler');
const IncidentControler = require('./database/controler/IncidentControler');
const ProfileControler = require('./database/controler/ProfileControler');
const SessionControler = require('./database/controler/SessionControler');
const routs = express.Router();

routs.get('/ongs', OngControler.index);
routs.post('/ongs', OngControler.create);

routs.post('/incidents', IncidentControler.create);
routs.get('/incidents', IncidentControler.index);
routs.delete('/incidents/:id', IncidentControler.delete);

routs.get('/profile', ProfileControler.index);

routs.post('/session', SessionControler.create);

module.exports = routs;