// index.js

// Initialize the project
var express = require('express');
var app = express();

// Enable CORS (for remote testing by FreeCodeCamp)
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// Serve static files (if needed)
app.use(express.static('public'));

// API endpoint for the home page
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Helper function to validate date
function isValidDate(date) {
  return !isNaN(new Date(date).getTime());
}

// API endpoint for the timestamp conversion
app.get('/api/:date?', (req, res) => {
  const { date } = req.params;

  let inputDate;

  // If no date provided, return current date and time
  if (!date) {
    inputDate = new Date();
  } else {
    // If the date is numeric, it's a Unix timestamp
    if (/^\d+$/.test(date)) {
      inputDate = new Date(parseInt(date));
    } else {
      // Otherwise, treat the input as a date string
      inputDate = new Date(date);
    }
  }

  // Check if the date is valid
  if (isValidDate(inputDate)) {
    const unixTimestamp = inputDate.getTime();
    const utcString = inputDate.toUTCString();

    res.json({
      unix: unixTimestamp,
      utc: utcString
    });
  } else {
    res.json({ error: "Invalid Date" }); // Ensure that "error" key is correctly set
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
