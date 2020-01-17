// MAIN CONFIGURATION FILE
'use strict';
const https = require("https"),
    path = require('path'),
    express = require('express'),
    app = express(),
    cors = require('cors'),
    helmet = require('helmet'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    port = process.env.PORT || 3000;

// MIDDLEWARES: PERFOMANCE
app.use(cors());
app.use(compression());
app.use(cookieParser());

// MIDDLEWARES: SECURITY
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false, limit: '5mb' }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// Static content
app.use(express.static(path.join(__dirname, '/app')));

// Routing
app.use('/api/daily', require('./routes/daily'));

// Private calls should stay fake 404 error instead 401 ( access denied )
app.use('/:url(api)*', function (req, res, next) {
    res.redirect('/404');
});

// All internal server errors should redirect to error 500 from angular
app.use(function (err, req, res, next) {
    if (err) {
        res.status(err.status).redirect('/500');
    }
});

// All other routes should delegate to Angular
app.route('/*').get((req, res) => {
    res.sendFile(__dirname + '/app/index.html');
});

app.listen(port, function () {
    console.log("Server is running on " + port + " port");
});