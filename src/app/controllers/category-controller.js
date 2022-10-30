const CategoryRepository = require("../repositories/category-repository");

class CategoryController {

    async index(req,res){

        const categories = await CategoryRepository.findAll();
        return res.json(categories);
    }

    async show(req,res){

        const {id} = req.params;
        if(!id) return res.status(200).json({error:'Nenhum ID enviado.'});
        const findCategory = await CategoryRepository.findById(id);
        if(!findCategory) return res.status(400).json({error:'Categoria não existente'});
        const category = await CategoryRepository.findById(id);
        return res.json(category);
    }

    async store(req,res){

        const {categoryName} = req.body;
        if(!categoryName) return res.json({error:'É necessário a inserção de um nome para a categoria !'}).status(400);
        const category = await CategoryRepository.create(categoryName);
        return res.status(201).json(category).status(200);
    }

    async delete(req,res){

        const {id} = req.params;
        if(!id) return res.status(400).json({error:'Nenhum ID enviado'});
        await CategoryRepository.delete(id);
        return res.sendStatus(204);

    }

    async update(req,res){

        const {id} = req.params;
        const {categoryName} = req.body;
        if(!id) return res.status(400).json({error:'Nenhum ID informado'});
        const findCategory = await CategoryRepository.findById(id);
        if(!findCategory) return res.status(400).json({error:'Categoria não existente'});
        const category = await CategoryRepository.update(id,{
            categoryName
        });
        return res.json(category);

    }


}

module.exports = new CategoryController();
