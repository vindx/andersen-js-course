const express = require('express');

const router = express.Router();
const Department = require('../models/Department');

router.get('/', async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post('/', async (req, res) => {
  const department = new Department({
    title: req.body.title,
  });
  try {
    const savedDepartment = await department.save();
    res.json(savedDepartment);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get('/:departmentId', async (req, res) => {
  try {
    const department = await Department.findById(req.params.departmentId);
    res.json(department);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete('/:departmentId', async (req, res) => {
  try {
    const removedDepartment = await Department.deleteOne({ _id: req.params.departmentId });
    res.json(removedDepartment);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch('/:departmentId', async (req, res) => {
  try {
    const updatedDepartment = await Department.updateOne(
      { _id: req.params.departmentId },
      { $set: { title: req.body.title } }
    );
    res.json(updatedDepartment);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
