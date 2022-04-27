const ContactsRepository = require("../repositories/ContactRepository");

class ContactController {

    //Listar todos os registros
    async index(req,res){

        try{
            const contacts = await ContactsRepository.findAll();
            res.json(contacts);

        }catch(err){

        }
    }
    //Obter um registro -> Pegar por ID
    show(){

    }
    //Criar um registro
    update(){

    }
    //Deletar um registro
    delete(){

    }
}

//Singleton
module.exports = new ContactController();
