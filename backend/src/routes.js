const express = require('express');
const OngControler = require('./database/controler/OngControler');
const IncidentControler = require('./database/controler/IncidentControler');
const ProfileControler = require('./database/controler/ProfileControler');
const SessionControler = require('./database/controler/SessionControler');
const routes = express.Router();
const {celebrate, Segments, Joi} = require('celebrate');

routes.get('/ongs', OngControler.index);

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required().integer(),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngControler.create);

routes.post('/incidents', celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        descrition: Joi.string().required(),
        value: Joi.number().required()}),
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), IncidentControler.create);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), IncidentControler.index);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), IncidentControler.delete);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileControler.index);

routes.post('/session', SessionControler.create);

module.exports = routes;