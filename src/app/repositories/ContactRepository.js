const {uuid} = require("uuidv4");

const contacts = [

    {
        id:uuid(),
        name:"Luis Fernando",
        email:"luisfernandogvv@gmail.com",
        phone:"1234567",
        category_id:uuid(),
    },
]

class ContactRepository {
    findAll(){
        return new Promise((resolve)=>resolve(contacts));
    }
}

module.exports  = new ContactRepository();
