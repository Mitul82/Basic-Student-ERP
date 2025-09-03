const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  subject: { 
    type: String, 
    required: true 
  },
  employeeId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  phone: { 
    type: String 
  },
  email: { 
    type: String, 
    unique: true 
  },
  assignedClasses: {
    type: [
      {
        type: String
      }
    ],
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model('Teacher', TeacherSchema);