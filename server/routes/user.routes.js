const express = require('express');
const router = express.Router();

const user = require('../controllers/user.controllers');

router.get('/', user.getUsers);
router.get('/:id', user.getUser);
router.post('/', user.postUser);
router.put('/:id', user.putUser);
router.delete('/:id', user.deleteUser);

module.exports = router;