const express = require('express');
const router = express.Router();

const doctorsController=require('../controllers/doctorsController.js');

router.get("/",doctorsController.getAllDoctors);
router.get("/:id",doctorsController.getDoctorById);
router.post("/",doctorsController.addDoctor);
router.put("/:id",doctorsController.updateDoctor);

module.exports = router;