const express = require('express'),
      router = express.Router();
    //   request = require('request');

// request({
//     method: 'get',
//     url: url,
//     headers: { "Authorization": 'Bearer ' + token }
// }, (err, response, body) => {
//     if (err || response.statusCode !== 200) {
//         res.status(response.statusCode || 500);
//     }
//     res.send(body);
// })

// GET LIST OF API CALLS
router.get('/api', function (req, res, next) {
    
});

module.exports = router;