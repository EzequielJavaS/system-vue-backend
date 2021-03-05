import models from '../models'
import { model } from 'mongoose';

export default {
    add:async (req, res, next) =>{
        try {
            const reg = await models.Article.create(req.body);
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);   
        }
    },  //para agregar
    query: async (req, res, next) =>{
        try {
            const reg = await models.Article.findOne({_id:req.query._id})
            .populate('category', {name:1} );
            if (!reg){
                res.status(404).send({
                    message: 'El registro no existe'
                });
            }else{
                res.status(200).json(reg);
            }
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);   
        }
    },  //Consultar
    list: async (req, res, next) =>{
        try {
            let value = req.query.value;
            const reg = await models.Article.find({'name':new RegExp(value, 'i')},{createdAt:0})
            .populate('category', {name:1} )
            .sort({'createdAt':-1});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);   
        }

    },    //listar
    update: async (req, res, next) =>{
        try {
            const reg = await models.Article.findByIdAndUpdate({ _id:req.body._id},{
                category: req.body.category,
                code: req.body.code,
                name: req.body.name, 
                description:req.body.description,
                sale_price: req.body.sale_price,
                stock: req.body.stock
            });
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);   
        }

    },   //Actualizar datos de una categoría
    remove: async (req, res, next) =>{
        try {
            const reg = await models.Article.findByIdAndDelete({_id:req.body._id});
            res.status(200).json(reg);
            
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);   
        }

    },    //Eliminar una categoría
    activate:async (req, res, next) =>{
        try {
            const reg = await models.Article.findByIdAndUpdate({_id:req.body._id}, {state:1});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);   
        }

    },     //Activar una categoría
    deactivate: async (req, res, next) =>{
        try {
            const reg = await models.Article.findByIdAndUpdate({_id:req.body._id}, {state:0});
            res.status(200).json(reg);
            
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);   
        }

    }
}