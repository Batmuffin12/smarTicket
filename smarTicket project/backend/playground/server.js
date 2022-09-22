const express = require('express')
const app = express()

const admin = require('firebase-admin')



const usersRouter = require('./routers/users')
const ticketsRouter = require('./routers/tickets')


app.use(express.json())


app.unsubscribe(express.urlencoded({extended:true}))

admin.initializeApp({
    credential: admin.credential.cert(credentials),
    databaseURL: 'https://smarticket-16464-default-rtdb.europe-west1.firebasedatabase.app'
})

app.use('/tickets',ticketsRouter)
app.use('/users',usersRouter)

app.get('/trains/all', async (req ,res) => {
    try{
        const trainsRef = db.collection('Trains')
        const response = await trainsRef.get()
        let responseArr = []
        response.forEach((doc) => {
            responseArr.push(doc.data())
        })
        res.status(200).send(responseArr)
    }catch(e) {
        res.status(500).send(e)
    }
})

app.get('/trains/:id', async (req,res) => {
    try {
        const id = req.params.id
        const trainRef = db.collection('Trains').doc(id)
        const response = await trainRef.get()
        if(response.data){
            res.status(200).send(response.data())
        } 
        else{
            throw new Error('no data found')
        }
    } catch(e) {
        res.status(500).send(e)
    }
})

app.post('/trains/create', async (req,res) => {
    try{ 
    //    res.send(firebase.firestore.Timestamp.fromDate(new Date().valueOf(req.body.train.leavingTime)))
    //    res.send(firebase.firestore.Timestamp.fromDate(new Date().valueOf(req.body.train.leavingTime)))
        const trainJson = {
            ...req.body.train,
            leavingTime: admin.firestore.Timestamp.fromDate(new Date(req.body.train.leavingTime))
        }
        
        const response = db.collection('Trains').add(trainJson)
        res.status(201).send(response)
    }catch(e) {
        res.status(500).send(e)
    }
})

app.patch('/trains/update', async (req,res) => {
    try {
        const id = req.body.id
        const update = {
            ...req.body.updates
        }
        const response = await db.collection('Trains').doc(id)
        .update(update)
        if(response){
            res.status(200).send(response)
        } 
        else{
            throw new Error('no data found')
        }
    } catch(e) {
        res.status(500).send(e)
    }
})

app.delete('/trains/:id', async (req, res) => {
    try{
        const id = req.params.id
        const response = await db.collection('Trains').doc(id).delete()
        res.status(200).send(response)
    }catch(e){
        res.status(500).send(e)
    }
})


const db = admin.firestore() 

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`server is runnig on PORT ${PORT}`)
})