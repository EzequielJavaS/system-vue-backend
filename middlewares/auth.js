import tokenService from '../services/token';

export default {
    verifyUser: async (req, res, next) => {
        //Reviso si el token existe. Si no existe retorno el resultado
        if (!req.headers.token){
            return res.status(404).send({
                message: 'No Token'
            });
        }

        //Si si hay token, lo decodifico y extraigo el usuario
        const response=await tokenService.decode( req.headers.token ); //decode retorna un User. response=user
        //Reviso que tenga cualquier rol.
        if (response.rol == 'Administrador' || response.rol == 'Almacen'|| response.rol == 'Vendedor'){
            next();
        } else {
            return res.status(403).send({
                message: 'No autorizado'
            });
        }
    },
    verifyAdministrador: async (req, res, next) => {
        //Reviso si el token existe. Si no existe retorno el resultado
        if (!req.headers.token){
            return res.status(404).send({
                message: 'No Token'
            });
        }
        //Si si hay token, lo decodifico y extraigo el usuario
        const response=await tokenService.decode(req.headers.token); //decode retorna un User. response=user

        //Reviso que tenga rol administrador.
        if (response.rol == 'Administrador'){
            next();
        } else {
            return res.status(403).send({
                message: 'No autorizado'
            });
        }
    },
    verifyAlmacen: async (req, res, next) => {
        //Reviso si el token existe. Si no existe retorno el resultado
        if (!req.headers.token){
            return res.status(404).send({
                message: 'No Token'
            });
        }
        //Si si hay token, lo decodifico y extraigo el usuario
        const response=await tokenService.decode( req.headers.token ); //decode retorna un User. response=user

        //Reviso que tenga rol almacén o administrador.
        if (response.rol == 'Almacen' || response.rol == 'Almacen'){
            next();
        } else {
            return res.status(403).send({
                message: 'No autorizado'
            });
        }
    },
    verifyVendedor: async (req, res, next) => {
        //Reviso si el token existe. Si no existe retorno el resultado
        if (!req.headers.token){
            return res.status(404).send({
                message: 'No Token'
            });
        }
        //Si si hay token, lo decodifico y extraigo el usuario
        const response=await tokenService.decode( req.headers.token ); //decode retorna un User. response=user

        //Reviso que tenga rol vendedor.
        if (response.rol == 'Vendedor' || response.rol == 'Almacen'){
            next();
        } else {
            return res.status(403).send({
                message: 'No autorizado'
            });
        }
    }
}