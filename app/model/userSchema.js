const { default: mongoose } = require('mongoose');
const { clientMongo } = require('../../service/mongoDBconnection');

const { Schema } = mongoose;
// const bcrypt = require('bcrypt');
// const Model = mongoose.model;

const validateEmail = (email) => {
  const re =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return re.test(email);
};

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Username is required'],
    validate: {
      validator(v) {
        return typeof v === 'string' && v.length > 2;
      },
      message: (props) =>
        props.length === 0
          ? 'Name is required'
          : 'Name must be longer than 2 characters and must be a string',
    },
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
    validate: [validateEmail, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
});

userSchema.set('toJSON', {
  transform: (document, returnedObjet) => {
    returnedObjet.id = returnedObjet._id;
    delete returnedObjet._id;
    delete returnedObjet.__v;
    delete returnedObjet.password;
  },
});

// const validateUser = (user) => {
//   const schema = Joi.object({
//     username: Joi.string().min(3).max(30).required(),
//     email: Joi.string().min(6).max(255).required().email(),
//     password: Joi.string().min(8).max(255).required(),
//   });
//   return schema.validate(user);
// };

const User = mongoose.model('User', userSchema);
const UserModel = clientMongo.model('User', userSchema);
module.exports = { User, UserModel };
