var express = require('express');
var app = express();
var path = require('path');
var moment = require('moment');

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/:date', function (req, res) {
    var date = req.params.date;
    if (+date >= 0) {
        res.json({
            unix: date,
            natural: moment.unix(+date).format('MMMM DD, YYYY')
        });
    } else {
        if (moment(date, 'MMMM DD, YYYY').isValid()) {
            res.json({
                unix: moment(date).format('X'),
                natural: date
            });
        } else {
            res.json({
                unix: null,
                natural: null
            });
        }
    }
});

app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});
