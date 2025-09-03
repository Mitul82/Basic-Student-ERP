const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  fatherName: { 
    type: String, 
    required: true 
  },
  className: { 
    type: String, 
    required: true 
  },
  rollNo: { 
    type: Number, 
    required: true, 
    unique: true 
  },
  attendance: {
    type: [
      {
        date: { type: Date },
        status: { type: String, enum: ["Present", "Absent", "Late"] }
      }
    ],
    default: []
  },
  grades: {
    type: [
      {
        subject: { type: String },
        score: { type: Number, min: 0, max: 100 },
        grade: { type: String }
      }
    ],
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);