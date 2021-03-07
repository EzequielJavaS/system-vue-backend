const jwt = require ('jsonwebtoken');
const models = require ('../models'); //Puedo acceder a todos los modelos.

//la función checkToken no la vamos a exportar. Servirá para generar un nuevo Token cuando el antiguo haya expeirado.
async function checkToken( token ){
    let __id = null;
    try {
        //Recibiré un token del cual voy a extraer el _id del user.
        const {_id} = await jwt.decode(token);
        //Igualo las variables
        __id = _id;
    } catch (error) {
        //Si el token no es válido:
        return false; 
    }
    //Ahora busco el user que ha enviado este token
    const user = await models.User.findOne({_id:__id, state:1});
    //Genero un nuevo token si el usuario existe
    if( user ){
        const token = jwt.sign({_id}, process.env.SECRET_JWT_SEED, {expiresIn: '2h'});
        //Retorno el user y su rol
        return {token, rol:user.rol};
    }else{
        return false;
    }
}



export default {
    encode: async (_id) => { //Con esta función crearé el token cuando el usuario se haya logeado.
        const token = jwt.sign({_id}, process.env.SECRET_JWT_SEED, {expiresIn: '2h'});
        return token;
    },

    decode: async (token) => { //Decodificará el token que reciba al hacer la petición. Para comprobar si es correcto. //Del token que que recibo, solo voy a destructurar el _id que trae.
         try {
             const {_id} = await jwt.verify(token, process.env.SECRET_JWT_SEE);
             const user = await models.User.findOne({_id, state:1});
             //La condición para que devuleva el usuario es que el _id corresponda al _id extraido del token y que el state tenga valor:1 Por esto necesitamos tener acces a models.
             return user || false;
         } catch (error) {
             const newToken = await checkToken( token );
             return newToken;
         }
    }
}
