const {admin, db} = require('../firebase/admin')

const getAllTickets = async () => {
    try {
        const ticketsRef = db.collection('Tickets')
        const response = await ticketsRef.get()
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