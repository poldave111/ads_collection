const express = require('express');
const router = express.Router();
const AdsController = require('../controllers/ads.controller');
const imageUpload = require('../utils/imageUpload');

router.get('/ads', AdsController.getAll);

router.get('/ads/:id', AdsController.getById);

router.get('/ads/search/:searchPhrase', AdsController.search);

router.post('/ads', imageUpload.single('image'), AdsController.post);

router.delete('/ads/:id', AdsController.delete)

router.put('/ads/:id', AdsController.put);

module.exports = router; 