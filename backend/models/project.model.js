const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://ayandutta2005:sandipdutta37@codeide.2vvgw.mongodb.net/?retryWrites=true&w=majority&appName=codeIDE', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// Define the project schema
const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'], // Ensures title is required
    trim: true, // Removes whitespace from both ends
  },
  createdBy: {
    type: String,
    required: [true, 'Creator information is required'], // Ensures the project has an owner
    trim: true // Ensures createdBy is formatted
  },
  date: {
    type: Date,
    default: Date.now // Default value to current date
  },
  htmlCode: {
    type: String,
    default: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
    
    </body>
    </html>`
  },
  cssCode: {
    type: String,
    default: `
    body {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }`
  },
  jsCode: {
    type: String,
    default: 'console.log("Hello World");' // Added semicolon for cleaner syntax
  }
});

// Create the Project model
const Project = mongoose.model('Project', projectSchema);

// Export the Project model
module.exports = Project;
