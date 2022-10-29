const ContactRepository = require("../repositories/contact-repository");
const ContactsRepository = require("../repositories/contact-repository");

class ContactController {

    async index(req,res){

        const {orderBy} = req.query;
        const contacts = await ContactsRepository.findAll(orderBy);
        res.json(contacts);
    }


    async show(req,res){

        const {id} = req.params;
        const contact = await ContactsRepository.findById(id);

        if(!contact) return res.status(404).json({
                error:"Usuário não encontrado!"
            });

        return res.json(contact);

    }


    async store(req,res){

        const {name,email,phone,category_id} = req.body;

        if(!name) return res.status(400).json({
                error:"É necessário um nome!"
            });

        const contactExists = await ContactsRepository.findByEmail(email);

        if(contactExists) return res.status(400).json(
            {error:"Este email já existe!"}
        );

        const contact = await ContactsRepository.create({
            name,email,phone,category_id
        })

        return res.json({
            contact:contact
        });
    }

   async update(req,res){

        const {id} = req.params;

        const {name,email,phone,category_id} = req.body;

        const contactExists = await ContactRepository.findById(id);

        if(!name) return res.status(400).json({
                error:"É necessário um nome!"
            });


        if(!contactExists) return res.status(404).json(
            {error:"Usuário não encontrado!"}
        );

        const contactByEmail = await ContactsRepository.findByEmail(email);

        if(contactByEmail) return res.status(400).json({
            error:"Este email já existe!"
        });

        const contact = await ContactRepository.update(id,{
            name,
            email,
            phone,
            category_id,
        })

        return res.json(contact);

    }

    async delete(req,res){

        const {id} = req.params;
        const contact = await ContactsRepository.findById(id);
        if(!contact) return res.status(404).json({
            error:"Usuário não encontrado!"
        });

        await ContactsRepository.delete(id);
        return res.sendStatus(204);
    }
}

//Singleton
module.exports = new ContactController();
