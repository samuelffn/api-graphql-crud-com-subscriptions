import User from '../../../models/User';

export default {
    User: {
        fullName: (user) => `${user.firstName} ${user.lastName}` 
    },
    Query: {
        users: () => User.find(),
        user: (_, {id}) => User.findById(id),
    },
    Mutation: {
        createUser: (_, {data}) => User.create(data),
        updateUser: (_, {id, data}) => User.findOneAndUpdate(id, data, { new: true }),
        deleteUser: async (_, {id}) => {
            const deleted = await User.findOneAndDelete(id);
            return !!deleted; // O !! é para retornar em formato booleano
        },
    },
};

/*
No UpdataUser:
O método User.findOneAndUpdate(id, data, { new: true }), precisou dessa flag { new: true } para que ele retorne
os dados após a atualização.
*/