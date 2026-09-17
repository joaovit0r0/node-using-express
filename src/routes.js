const { Router } = require('express');

const ContactsController = require('./app/controllers/contactController');
const CategoryController = require('./app/controllers/categoryController');

const router = Router();

router.get('/contacts', ContactsController.index);
router.get('/contacts/:id', ContactsController.show);
router.post('/contacts', ContactsController.store);
router.put('/contacts/:id', ContactsController.update);
router.delete('/contacts/:id', ContactsController.delete);

router.get('/categories', CategoryController.index);
router.get('/categories/:id', CategoryController.show);
router.post('/categories', CategoryController.store);
router.put('/categories/:id', CategoryController.update);
router.delete('/categories/:id', CategoryController.delete);

module.exports = router;
