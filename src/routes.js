const { Router } = require('express');

const Contacts = require('./app/controllers/contactController');

const router = Router();

router.get('/contacts', Contacts.index);

module.exports = router;
