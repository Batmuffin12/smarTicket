const {isEmailValid} = require('../utils/serverUtils')
const  {admin, db} = require('../firebase/admin')

const createUser =  async (body) => {
    try {
        if(!(isEmailValid(body.user.email))){
            res.status(400).send('email isnt valid')
        }
        const userJson = {
            ...body.user, 
            creditCard: {
                ...req.body.user.creditCard,
                cardValid: admin.firestore.Timestamp.fromDate(new Date(req.body.user.creditCard.cardValid))
            }
        }
        const response = db.collection('Users').add(userJson)
        return {
            status: 201,
            response
        }
    }catch(e) {
        return {
            status: 500,
            response: e
        }
    }
}

const getAllUsers = async () => {
    try {
        const usersRef = db.collection('Users')
        const response = await usersRef.get()
        let responseArr = []
        response.forEach((doc) => {
            responseArr.push(doc.data())
        })
        return {
            status: 200,
            response: responseArr
        }
    } catch(e) {
        return {
            status: 500,
            response: e
        }
    }
}

const getSingularUser = async (id) => {
    try {
        const usersRef = db.collection('Users').doc(id)
        const response = await usersRef.get()
        if(response.data){
            return{
                status: 200,
                response: response.data
            }
        } 
        else{
            return {
                status: 400,
                response: 'no matched user found'
            }
        }
    } catch(e) {
       return {
        status: 500,
        response: e
       }
    }
}

const deleteUser = async (id) => {
    try {
        const response = await db.collection('Users').doc(id)
        .delete()
        return{
            status:200,
            response: response
        }
    } catch(e) {
        return {
            status: 500,
            response: e
           }
    }
}

const patchUser = async ({id, updates}) => {
    try {
        const response = await db.collection('Users').doc(id)
        .update(updates)
        if(response){
            return {
                status: 200,
                response
            }
        } 
        else{
            return {
                status: 400,
                response: 'no user found'
            }
        }
    } catch(e) {
        return {
            status: 500,
            response: e
        }
    }
}