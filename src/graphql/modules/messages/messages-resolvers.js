import Message from '../../../models/Message';
import User from '../../../models/User';

export default {
    Message: {
        author: (message) => User.findById(message.author),
    },
    Query: {
        messages: () => Message.find(),
        message: (_, {id}) => Message.findById(id),
    },
    Mutation: {
        createMessage: (_, {data}) => Message.create(data),
        updateMessage: (_, {id, data}) => Message.findOneAndUpdate(id, data, { new: true }),
        deleteMessage: async (_, {id}) => {
            const deleted = await Message.findOneAndDelete(id);
            return !!deleted;  //Esse !! é para retornar em formato booleano
        },
    },
};