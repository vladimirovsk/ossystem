const
    express = require('express'),
    normalizePort = require('normalize-port');
    app = express(),
    cors = require('cors'),
    conf = require('./config'),
    http = require('http'),
    path = require('path');
    api_router = require('./api/v1/api.js')

    global.conf = conf;

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    app.use((error, req, res, next) => {
    res.status(500).json({"error": {"status": error.status, "message": error.message}})
    })
    app.use('/api/' + conf.version + '/', api_router);

    app.set('view engine', 'ejs');
    app.use(express.static(__dirname + '/client/build'));

    const httpServer = http.createServer(app);
    let port  = normalizePort(conf.port || 9030)
    httpServer.listen(port);
    console.log(`Worker ${process.pid} started port: ` + port);
    require('./application/app.js')

