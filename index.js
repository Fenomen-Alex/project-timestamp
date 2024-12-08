// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

function isValidDate(date) {
  return !isNaN(new Date(date).getTime());
}

app.get('/api/:date?', (req, res) => {
  const { date } = req.params;

  let inputDate;
  if (!date) {
    // If no date provided, return the current date
    inputDate = new Date();
  } else {
    // If the date is numeric, treat it as a Unix timestamp
    if (!isNaN(date)) {
      inputDate = new Date(parseInt(date));
    } else {
      inputDate = new Date(date);
    }
  }

  if (isValidDate(inputDate)) {
    const unixTimestamp = inputDate.getTime();
    const utcString = inputDate.toUTCString();

    res.json({
      unix: unixTimestamp,
      utc: utcString
    });
  } else {
    res.json({ error: "Invalid Date" });
  }
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
