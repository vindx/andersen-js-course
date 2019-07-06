const mongoose = require('mongoose');

const OfficeSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  departmentId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Offices', OfficeSchema);
