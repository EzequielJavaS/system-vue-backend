import models from '../models'
import { model } from 'mongoose';
import bcrypt from 'bcryptjs'
import token from '../services/token';

export default {
    add: async (req, res, next) =>{
        try {
            req.body.password = await bcrypt.hash(req.body.password, 10);
            const reg = await models.User.create(req.body);
            res.status(201).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error en al crear usuario'
            });
            next(error);   
        }
    },  //para agregar un usuario
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
                message: 'Ocurrió un error en query'
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
            //Solo encripto el password si el usuario lo ha modificado
            let pas = req.body.password; //Tomo el valor del password que me están enviando
            const reg0 = await models.User.findOne({_id:req.body._id}) //reg0 es todo el usuario. Filtro el usuario cuyo _id estoy recibiendo en el body
            (pas != reg0.password) || (req.body.password = bcrypt.hash(req.body.password, 10)); 
            
            const reg = await models.User.findByIdAndUpdate({ _id:req.body._id},{
                rol: req.body.rol,
                name: req.body.name,
                document_type: req.body.document_type,
                document_number: req.body.document_number,
                address: req.body.address,
                phone_number: req.body.phone_number,
                email: req.body.email,
                password: req.body.password
            });
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error en update'
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
                message: 'Ocurrió un error en activate'
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
                message: 'Ocurrió un error en deactivate'
            });
            next(error);   
        }

    },
    login: async (req, res, next)=>{
        try {
            // Consulto si el mail del usuario existe y el usuario es activo
            let user = await models.User.findOne({email:req.body.email, activate:1});
            if (user){
                //Compruebo que los password concuerdan
                let match = await bcrypt.compare(req.body.password, user.password);
                if (match){
                    //Si el usuario es correcto, genera el token y lo muestra
                    let tokenReturn = await token.encode(user._id);
                    res.status(200).json({user, tokenReturn})
                }else{
                    res.status(404).send({
                        message: 'Password Incorrecto'
                    });
                }
            }else{
                res.status(404).send({
                    message: 'No existe usuario'
                });
            }           
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error en login'
            });
            next(e); 
        }
    }
}