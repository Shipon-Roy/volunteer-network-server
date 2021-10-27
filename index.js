const { MongoClient } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mhhgc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run () {
    try{
        await client.connect();
        const database = client.db('volunteer_network');
        const servicesCollection = database.collection('services');
        const registerCollection = database.collection('register');

        // GET services API 
        app.get('/services', async (req, res) => {
            const cursor = servicesCollection.find({});
            const services = await cursor.toArray();
            res.send(services);
        })

        //POST Register API
        app.post('/register', async (req, res) => {
            const register = req.body;
            const submit = await registerCollection.insertOne(register);
            res.json(submit);
        })

    }
    finally{
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Volunteer Network Server Running')
});

app.get('hello', (req, res) => {
    res.send('Hello world')
});

app.listen(port, () => {
    console.log('Volunteer network at port', port);
});


/* 
one time 
1. heroku acount open
2. hroku software install

Every projects
1. git init
2. .gitignore (node_modules, .env)
3. push everythinf to git 
4. make sure you have this script ("start": "node index.js",)
5. make sure : put proces.env.PORT in front your port number
6. hroku login
7. heroku create (only one time for a projects)
8. command: git push heroku main

-----------

Update
1. save everything check localy
2. git add. , git commit -m "", git push
3. git push heroku main


*/