const express = require('express'),
      router = express.Router(),
      Promise = require('es6-promise'),
      scrap   = require('../config/webscrapping');

let elPaisData, elMundoData;
scrap.getFeedNews('https://elpais.com/', scrap.elPais).then(function (data) {
    elPaisData = data;
})


scrap.getFeedNews('https://www.elmundo.es/', scrap.elMundo).then(function (data) {
    elMundoData = data;
})
router.get('/list', function (req, res, next) {
    let data  = [ ...elPaisData, ...elMundoData];
    res.send(data);
});

module.exports = router;