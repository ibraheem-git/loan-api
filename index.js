const express = require('express'),
    logger = require('morgan');

const data = [
    {
        "name": "Test User",
        "email": "test@test.com",
        "phone": "0700000",
        "loans": []
    }
];

const app = express();

app.use(logger('dev'));
app.use(express.json());

app.get('/', (req, res) => {
    res.json(data);
});

app.post('/user/add', (req, res) => {

    const { name, email, phone } = req.body;

    if(!name || !email || !phone) res.send('Invalid request');

    let user = {
         name,
        email,
        phone,
        loans: []
    };

    data.push(user);
    res.send('User created');

});

app.post('/user/login', (req, res) => {
    const { email} = req.body;
    if(!email) res.send('Invalid email');

    data.filter(row => {
        if(row.email == email) {
          return res.send(row);
        }
       res.send("User not found");
 });

    

});

app.post('/user/loan', (req, res) => {

    const { amount, duration, email } = req.body;
    if(!amount || !duration) res.send('Invalid request');

    let loan = {
        amount,
        duration
    }

    data.map(row => {
        if(row.email == email) {
            row.loans.push(loan)
        }
    });

    res.send(data);

});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});