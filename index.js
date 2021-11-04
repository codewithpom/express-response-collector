// Here we will create an express app to collect responses from a response and save them in a csv file using the csv-append module

const express = require('express');
const app = express();
const fs = require('fs');
const mailer = require('./send_email'); 
const PORT = process.env.PORT || 3000;
// add body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/pages/index.html');
});

// create a post route to collect the responses at /submit in the response.csv file with time according to India's timezone in formatted date and time
app.post('/submit', async (req, res) => {
    const time = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    console.log(
        req.body
    );
    const data = [
        `"${req.body.name}"`,
        `"${req.body.email}"`,
        `"${req.body.message}"`,
        `"${time}"`
    ];
    res.send('Thank you for your response!');

    // append the data to the csv file
    fs.appendFile('response.csv', data.join(',') + '\n', (err) => {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
    });
    mailer.send_mail(req.body.email, "Thanks For Response", "Thanks for sending us a response we will be with you shortly.")

});

// start the server on port 3000
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

