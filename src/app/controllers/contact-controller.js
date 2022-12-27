const ContactRepository = require("../repositories/contact-repository");
const ContactsRepository = require("../repositories/contact-repository");
const isValidUUID = require('../../utils/is-valid-uuid');

class ContactController {

    async index(req,res){

        const {orderBy} = req.query;
        const contacts = await ContactsRepository.findAll(orderBy);
        res.json(contacts);
    }


    async show(req,res){

        const {id} = req.params;

        if(!isValidUUID(id))
        return res.status(400).json({
            error: 'UUID inválido'
        });

        const contact = await ContactsRepository.findById(id);
        if(!contact) return res.status(404).json({
            error:"Usuário não encontrado!"
        });

        return res.json(contact);

    }


    async store(req,res){

        const {name,email,phone,category_id} = req.body;

        if( category_id && !isValidUUID(category_id))
        return res.status(400).json({
            error: 'UUID inválido'
        });

        if(!name)
        return res.status(400).json(
            {error:"É necessário um nome!"
        });

       if(email){
            const contactExists = await ContactsRepository.findByEmail(email.trim());
            if(contactExists) return res.status(400).json({
                error:"Este email já existe!"
            });
       }

        const contact = await ContactsRepository.create({
            name,email: email || null,phone,category_id: category_id || null,
        });
        return res.status(201).json(contact);
    }

   async update(req,res){

        const {id} = req.params;

        const {name,email,phone,category_id} = req.body;

        if(!name){

            return res.status(400).json({
                error:"É necessário um nome!"
            });

        }

        if(!isValidUUID(category_id || id)){

            return res.status(400).json({
                error: 'UUID inválido'
            });

        }

        const contactExists = await ContactRepository.findById(id);

        if(!contactExists){

            return res.status(404).json({
                error:"Usuário não encontrado!"
            });

        }

        if(email){

            const contactExists = await ContactsRepository.findByEmail(email.trim());

            if(contactExists && id != contactExists.id){

                return res.status(400).json({
                    error:"Este email já existe!"
                });

            }

       }

        const contact = await ContactRepository.update(id,{
            name,email: email || null,phone,category_id: category_id || null,
        });
        return res.json(contact);

    }

    async delete(req,res){

        const {id} = req.params;

        if(!isValidUUID(id))
        return res.status(400).json({
            error: 'UUID inválido'
        });

        const contact = await ContactsRepository.findById(id);
        if(!contact)
        return res.status(404).json({
            error:"Usuário não encontrado!"
        });

        await ContactsRepository.delete(id);
        return res.sendStatus(204);
    }
}

//Singleton
module.exports = new ContactController();
