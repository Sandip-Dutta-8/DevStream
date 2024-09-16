const mongoose = require('mongoose');

// Connecting to the MongoDB database
mongoose.connect('mongodb+srv://ayandutta2005:sandipdutta37@codeide.2vvgw.mongodb.net/?retryWrites=true&w=majority&appName=codeIDE', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Defining the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'], // Validation: name must be present
    trim: true, // Remove extra spaces
  },
  username: {
    type: String,
    required: [true, 'Username is required'], // Validation: username must be present
    unique: true, // Ensure username is unique
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'], // Validation: email must be present
    unique: true, // Ensure email is unique
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'] // Validation for email format
  },
  password: {
    type: String,
    required: [true, 'Password is required'], // Validation: password must be present
    minlength: [6, 'Password must be at least 6 characters long'], // Minimum length validation
  },
  date: {
    type: Date,
    default: Date.now // Default value for date
  },
  isBlocked: {
    type: Boolean,
    default: false // Default value for isBlocked
  },
  isAdmin: {
    type: Boolean,
    default: false // Default value for isAdmin
  }
});

// Creating the User model
const User = mongoose.model('User', userSchema);

// Exporting the model
module.exports = User;
