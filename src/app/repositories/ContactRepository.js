const {v4} = require("uuid");

let contacts = [

    {
        id:v4(),
        name:"Luis Fernando",
        email:"luisfernandogvv@gmail.com",
        phone:"1234567",
        category_id:v4(),
    },
    {
        id:v4(),
        name:"Rafael Gustavo",
        email:"rafaelgustavo@gmail.com",
        phone:"1234567",
        category_id:v4(),
    },
]

class ContactRepository {

    findAll(){
        return new Promise((resolve)=>resolve(contacts));
    }

    findById(id){
        return new Promise((resolve)=>resolve(
            contacts.find((contact)=>contact.id === id),
        ));
    }

    delete(id){
        return new Promise((resolve)=>resolve(

            contacts = contacts.filter((contact)=>contact != id),
            resolve(),
        ));
    }
}

module.exports  = new ContactRepository();
