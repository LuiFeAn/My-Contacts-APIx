const ContactsRepository = require("../repositories/ContactRepository");

class ContactController {

    async index(req,res){

        try{
            const contacts = await ContactsRepository.findAll();
            res.json(contacts);

        }catch(err){

        }
    }


    async show(req,res){

        const {id} = req.params;
        const contact = await ContactsRepository.findById(id);

        if(!contact){
            return res.status(404).json({error:"Usuário não encontrado!"});
        }

        res.json(contact);
    }

    update(){

    }

    async delete(req,res){

        const {id} = req.params;
        const contact = await ContactsRepository.findById(id);

        if(!contact){

            //Not Found
            return res.status(404).json({error:"Usuário não encontrado!"});
        }

        await ContactsRepository.delete(id);

        //No Content -> Deu certo, mas não possui corpo!
        res.sendStatus(204);
    }
}

//Singleton
module.exports = new ContactController();
