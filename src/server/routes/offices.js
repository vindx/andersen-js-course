const express = require('express');

const router = express.Router();
const Office = require('../models/Office');

router.get('/', async (req, res) => {
  try {
    const offices = await Office.find();
    res.json(offices);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post('/', async (req, res) => {
  const office = new Office({
    title: req.body.title,
    departmentId: req.body.departmentId,
  });
  try {
    const savedOffice = await office.save();
    res.json(savedOffice);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get('/:departmentId', async (req, res) => {
  try {
    const offices = await Office.find({ departmentId: req.params.departmentId });
    res.json(offices);
  } catch (err) {
    res.json({ message: err });
  }
});

// if client delete whole department
router.delete('/:departmentId', async (req, res) => {
  try {
    const removedOffices = await Office.deleteMany({ departmentId: req.params.departmentId });
    res.json(removedOffices);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete('/:departmentId/:officeId', async (req, res) => {
  try {
    const removedOffice = await Office.deleteOne({ _id: req.params.officeId });
    res.json(removedOffice);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch('/:departmentId/:officeId', async (req, res) => {
  try {
    const updatedOffice = await Office.updateOne(
      { _id: req.params.officeId },
      { $set: { title: req.body.title } }
    );
    res.json(updatedOffice);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
