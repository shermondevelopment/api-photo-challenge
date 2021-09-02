import moongose, { Mongoose } from 'mongoose'



export default {
  connect: async () => {
    return await moongose.connect('mongodb://admin:admin@localhost:27017');
  }
}