import typeorm from 'typeorm';

const User = new typeorm.EntitySchema({
  name: 'User',
  columns: {
    id: {
      primary: true,
      type: 'integer',
      generated: 'increment'
    },
    email: {
      type: String,
      unique: true,
    },
    name:{
      type:String,
      default:"momo"
    },
    firstname: { type: String },
    lastname: { type: String },
    password:{
      type:String
    },
    loginStatus:{
      type:Boolean,
      default: false,
    }
  },
});

export default User;
