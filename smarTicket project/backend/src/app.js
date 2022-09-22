const express = require('express')
const app = express()

const admin = require('firebase-admin')
const credentials = require('../key.json')
const {isEmailValid} = require('./utils/serverUtils')
app.use(express.json())

app.unsubscribe(express.urlencoded({extended:true}))

admin.initializeApp({
    credential: admin.credential.cert(credentials),
    databaseURL: 'https://smarticket-16464-default-rtdb.europe-west1.firebasedatabase.app'
})

app.post('/users/create', async ({body}, res) => {
    try {
        if(!(isEmailValid(body.user.email))){
            res.status(400).send('email isnt valid')
        }
        const userJson = {
            ...req.body.user, 
            creditCard: {
                ...body.user.creditCard,
                cardValid: admin.firestore.Timestamp.fromDate(new Date(body.user.creditCard.cardValid))
            }
        }
        const response = db.collection('Users').add(userJson)
        res.status(201).send(response)
    }catch(e) {
        res.status(500).send(e)
    }
})

app.get('/users/all', async (req, res) => {
    try {
        const usersRef = db.collection('Users')
        const response = await usersRef.get()
        let responseArr = []
        response.forEach((doc) => {
            responseArr.push(doc.data())
        })
        res.status(200).send(responseArr)
    } catch(e) {
        res.status(500).send(e)
    }
})

app.get('/users/:id', async (req,res) => {
    try {
        const usersRef = db.collection('Users').doc(req.params.id)
        const response = await usersRef.get()
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

app.patch('/users/update', async ({body},res) => {
    try {
        const id = body.id
        const update = {
            ...body.updates,
            updates: {
                creditCard : {
                    cardValid: admin.firestore.Timestamp.fromDate(new Date(body.updates.creditCard.cardValid)) 
                }
            }
        }
        const response = await db.collection('Users').doc(id)
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

app.delete('/users/:id', async (req,res) => {
    try {
        const response = await db.collection('Users').doc(req.params.id)
        .delete()
        res.send(response)
    } catch(e) {
        res.status(500).send(e)
    }
})

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

app.post('/trains/create', async ({body},res) => {
    try{ 
        const trainJson = {
            ...body.train,
            leavingTime: admin.firestore.Timestamp.fromDate(new Date(body.train.leavingTime))
        }
        
        const response = db.collection('Trains').add(trainJson)
        res.status(201).send(response)
    }catch(e) {
        res.status(500).send(e)
    }
})

app.patch('/trains/update', async ({body},res) => {
    try {
        const id = body.id
        const update = {
            ...body.updates,
            leavingTime: admin.firestore.Timestamp.fromDate(new Date(body.updates.leavingTime))  

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

app.get('/tickets/all', async (req,res) => {
    try {
        const ticketsRef = db.collection('Tickets')
        const response = await ticketsRef.get()
        let responseArr = []
        response.forEach((doc) => {
            responseArr.push(doc.data())
        })
        res.status(200).send(responseArr)
    } catch(e) {
        res.status(500).send(e)
    }
})

app.get('/tickets/:id', async (req,res) => {
    try {
        const id = req.params.id
        const ticketsRef = db.collection('Tickets').doc(id)
        const response = await ticketsRef.get()
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

app.post('/tickets/create', async ({body},res) => {
    try{ 
        const ticketJson = {
            ...body.ticket,
            validUntil: admin.firestore.Timestamp.fromDate(new Date(body.ticket.validUntil))
        }
        
        const response = await db.collection('Tickets').add(ticketJson)
        res.status(201).send(response)
    }catch(e) {
        res.status(500).send(e)
    }
})

app.patch('/tickets/update', async ({body},res) => {
    try{
        const id = body.id
        const update = {
            ...body.updates 
        }
        const response = await db.collection('Tickets').doc(id).update(update)
        res.status(200).send(response)
    }catch(e) {
        res.status(500).send(e)
    }
})

app.delete('/tickets/:id', async (req, res) => {
    try{
        const id = req.params.id
        const response = await db.collection('Tickets').doc(id).delete()
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