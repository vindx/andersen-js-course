const mongoose = require('mongoose');

const DepartmentSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Departments', DepartmentSchema);
