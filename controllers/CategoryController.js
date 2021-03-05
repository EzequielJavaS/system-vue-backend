import models from '../models'
import { model } from 'mongoose';

export default {
    add:async (req, res, next) =>{
        try {
            const reg = await models.User.create(req.body);
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);   
        }
    },  //para agregar una categoría
    query: async (req, res, next) =>{
        try {
            const reg = await models.User.findOne({_id:req.query._id});
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
    },  //Consultar una categoría
    list: async (req, res, next) =>{
        try {
            let value = req.query.value;
            const reg = await models.User.find({'name':new RegExp(value, 'i')},{createdAt:0})
            .sort({'createdAt':-1});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);   
        }

    },    //listar categoria
    update: async (req, res, next) =>{
        try {
            const reg = await models.User.findByIdAndUpdate({ _id:req.body._id},{
                name: req.body.name,
                description:req.body.description
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
            const reg = await models.User.findByIdAndDelete({_id:req.body._id});
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
            const reg = await models.User.findByIdAndUpdate({_id:req.body._id}, {state:1});
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
            const reg = await models.User.findByIdAndUpdate({_id:req.body._id}, {state:0});
            res.status(200).json(reg);
            
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);   
        }

    }
}