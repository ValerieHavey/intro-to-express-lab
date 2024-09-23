const express = require('express');
const app = express();


app.listen(3000, () => {
    console.log('Listening on port 3000')
});


//Exercise 1//

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
  });

  app.get('/greetings/SEBTeachers', (req, res) => {
    res.send('<h1>Hello SEB Teachers!</h1>');
  });

//  http://localhost:3000/hello?name=SEB_Teachers
app.get('/hello', (req, res) => {
    const name = req.query.name;
    res.send(`Hello there, ${name}!`);
})


//Exercise 2:

app.get('/roll', (req, res) => {
    res.send('<h1>Rolling the Dice</h1>');
});

app.get('/roll/:rolledNumber', (req, res) => {
    const rolledNumber = parseInt(req.params.rolledNumber);

    if(isNaN(rolledNumber)) {
        res.status(400).send(`You must specify a number.`);
    } else {
        res.send(`You rolled a ${req.params.rolledNumber}`);
}});


//Exercise 3:

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

app.get('/collectibles', (req, res) => {
    res.send('<h1>I Want THAT One!</h1>');
});

app.get('/collectibles/:index', (req, res) => {
    const index = parseInt(req.params.index);

    if (isNaN(index)) {
        res.status(400).send('Please enter an item number.');
    } else if
        (index < 0 || index >= collectibles.length) {
            res.status(404).send('This item is not yet in stock. Check back soon!');
        } else {
            const item = collectibles[index];
            res.status(200).send(`So you want the ${item.name}? For ${item.price}, it can be yours!`);
        }
    });

//Exercise 4:


const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" },
];

app.get('/shoes', (req, res) => {
    const type = (req.query.type);
    const minPrice = parseInt(req.query.minPrice);
    const maxPrice = parseInt(req.query.maxPrice);

    let filteredShoes = shoes

    if (maxPrice) {
        filteredShoes = filteredShoes.filter(shoe => {
            return shoe.price <= maxPrice
        })  
    };

    if (minPrice) {
        filteredShoes = filteredShoes.filter(shoe => {
            return shoe.price >= minPrice
        })
    };

    if (type) {
        filteredShoes = filteredShoes.filter(shoe => {
            return shoe.type === type
        })
    };
    res.json(filteredShoes);
});