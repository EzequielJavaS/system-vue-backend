const jwt = require ('jsonwebtoken');
const models = require ('../models'); //Accede a todos los modelos
export default {
    encode: async (_id) => { //Con esta función crearé el token cuando el usuario se haya logeado.
        const token = jwt.sign({_id}, process.env.SECRET_JWT_SEED, {expiresIn: '2h'});
        return token;
    },

    decode: async (token) => { //Decodificará el token que reciba al hacer la petición. Para comprobar si es correcto. //Del token que que recibo, solo voy a destructurar el _id que trae.
         try {
             const {_id} = await jwt.verify(token, process.env.SECRET_JWT_SEE);
             const user = await models.User.findOne({_id, state:1});
             //La condición para que devuleva el usuario es que el _id corresponda al _id extraido del token y que el state tenga valor:1
             
         } catch (error) {
             
         }

     
       
        
    }
}
