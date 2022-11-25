const CategoryRepository = require("../repositories/category-repository");
const isValidUuid = require("../../utils/is-valid-uuid");

class CategoryController {

    async index(req,res){

        const categories = await CategoryRepository.findAll();
        return res.json(categories);
    }

    async show(req,res){

        const {id} = req.params;

        if(!id)
        return res.status(200).json({
            error:'Nenhum ID enviado.'
        });

        if(!isValidUuid(id))
        return res.status(401).json({
            error:'UUID inválido'
        });

        const findCategory = await CategoryRepository.findById(id);
        if(!findCategory)
        return res.status(400).json({
            error:'Categoria não existente'
        });

        const category = await CategoryRepository.findById(id);
        return res.json(category);
    }

    async store(req,res){

        const {category_name} = req.body;

        if(!category_name)
        return res.status(401).json({
            error:'É necessário a inserção de um nome para a categoria !'
        });

        const categoryAlreadyExists = await CategoryRepository.findByName(category_name);

        if(categoryAlreadyExists)
        return res.status(401).json({
            error:`A categoria ${category_name} já existe`
        });


        const category = await CategoryRepository.create(category_name);
        return res.status(201).json(category).status(200);
    }

    async delete(req,res){

        const {id} = req.params;

        if(!id)
        return res.status(400).json({
            error:'Nenhum ID enviado'
        });

        if(!isValidUuid(id))
        return res.status(401).json({
            error:'UUID inválido'
        });

        await CategoryRepository.delete(id);
        return res.sendStatus(204);

    }

    async update(req,res){

        const {id} = req.params;

        const {categoryName} = req.body;

        if(!id) return res.status(400).json({
            error:'Nenhum ID informado'
        });

        if(!isValidUuid(id))
        return res.status(401).json({
            error:'UUID inválido'
        });

        const findCategory = await CategoryRepository.findById(id);
        if(!findCategory)
        return res.status(400).json({
            error:'Categoria não existente'
        });

        const category = await CategoryRepository.update(id,{
            categoryName
        });
        return res.json(category);

    }


}

module.exports = new CategoryController();
