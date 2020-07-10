import User from '../../../models/User';
import { USER_ADDED, USER_UPDATE, USER_DELETED } from './channels';

export default {
    User: {
        fullName: (user) => `${user.firstName} ${user.lastName}` 
    },
    Query: {
        users: () => User.find(),
        user: (_, {id}) => User.findById(id),
    },
    Mutation: {
        createUser: async (_, {data}, { pubsub }) => {
            const user = await User.create(data); //Salvando o usuário na base

            pubsub.publish(USER_ADDED, {  //Passando o meu evendo de add um usuário: USER_ADDED
                userAdded: user,          //Passando um objeto com o nome do meu canal (userAdded) recebendo o user
            });

            return user; //Retorna o User salvo

        },
        updateUser: async (_, {id, data}, { pubsub }) => {
            const user = await User.findOneAndUpdate(id, data, { new: true });

            pubsub.publish(USER_UPDATE, {
                userUpdate: user,
            });

            return user;
        },
        deleteUser: async (_, {id}, { pubsub }) => {
            const deleted = await User.findOneAndDelete(id);

            pubsub.publish(USER_DELETED, {
                userDeleted: `Usuário Deletado! ID: ${id}`,
            });

            return !!deleted; // O !! é para retornar em formato booleano
        },
    },
    Subscription: {
      userAdded: {
        subscribe: (obj, args, { pubsub }) => pubsub.asyncIterator(USER_ADDED), //Ação que foi feita de add um usuário USER_ADDED
      },
      userUpdate: {
        subscribe: (obj, args, { pubsub }) => pubsub.asyncIterator(USER_UPDATE),
      },
      userDeleted: {
        subscribe: (obj, args, { pubsub }) => pubsub.asyncIterator(USER_DELETED),
      },
    },
};

/*
No UpdataUser:
O método User.findOneAndUpdate(id, data, { new: true }), precisou dessa flag { new: true } para que ele retorne
os dados após a atualização.

O terceiro parâmetro Contex:
- Esse terceiro parâmetro context dentro de Subscription é uma forma que temos de compartilhar informações entre 
todos os resolvers da nossa aplicação.
- O context não é algo exclusivo da Subscription, podemos utilizar ele nas Mutations, Query, nos nossos 
objetos, como o User.
- Tudo o que for resulver na aplicação tem acessar o context.
- Para adicionar informções na variável context precisamos passar valores no new ApolloServer, que no nosso caso
está em startServer.js, na raíz do projeto.  É passado no terceiro parâmetro context: {pubsub}.

*/