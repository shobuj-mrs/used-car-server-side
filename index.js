const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();

// middleware 
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.szoixno.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {

        //  database collection
        const categoriesCollection = client.db('carResale').collection('categories');
        const allCarsCollection = client.db('carResale').collection('allCars');
        const usersCollection = client.db('carResale').collection('allUsers');
        const bookingCollection = client.db('carResale').collection('booking');

        // create an user and get users 
        app.post('/users', async (req, res) => {
            const user = req.body;
            // console.log(user);
            const result = await usersCollection.insertOne(user);
            res.send(result);
        });
        app.get('/users', async (req, res) => {
            const query = {};
            const result = await usersCollection.find(query).toArray();
            res.send(result);
        })

        app.get('/users/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const result = await usersCollection.findOne(query);
            res.send(result);
        })

        app.get('/users/allbuyers/:role', async (req, res) => {
            const role = req.params.role;
            const query = { role: role };
            const result = await usersCollection.find(query).toArray();
            res.send(result);
        })



        //  car api create part 

        app.post('/allcars', async (req, res) => {
            const car = req.body;
            const result = await allCarsCollection.insertOne(car);
            res.send(result);
        });
        app.get('/allcars/category/:categoryid', async (req, res) => {
            const categoryid = req.params.categoryid;
            const query = { carCategory: categoryid };
            const result = await allCarsCollection.find(query).toArray();
            res.send(result);
        });

        app.get('/allcars/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const result = await allCarsCollection.find(query).toArray();
            res.send(result);
        });


        app.get('/categories', async (req, res) => {
            // const email = req.params.email;
            const query = {};
            const result = await categoriesCollection.find(query).toArray();
            res.send(result);
        });

        // car booking 

        app.post('/bookings', async (req, res) => {
            const booking = req.body;
            const result = await bookingCollection.insertOne(booking);
            res.send(result);
        })
        app.get('/bookings', async (req, res) => {

            const query = {};
            const result = await bookingCollection.find(query).toArray();
            res.send(result);
        });


    }

    finally {

    }
}
run().catch(console.log)



app.get('/', async (req, res) => {
    res.send('User resale product server is running...')
})

app.listen(port, () => {
    console.log(`user resale product running on this ${port}`);
})


