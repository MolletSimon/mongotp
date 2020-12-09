const express = require('express');
const router = express.Router();
const mainCtrl = require('../controllers/main');

router.get('/bydate/:date', mainCtrl.getByDate);

router.get('/getpaginate/:page/:sort', mainCtrl.getByPaginate);

router.get('/:id', mainCtrl.getOne);

router.put('/modify/:id', mainCtrl.modify);

router.delete('/delete/:id', mainCtrl.delete);

module.exports = router;