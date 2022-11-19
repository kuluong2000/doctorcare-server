const express = require('express');
const router = express.Router();

//import controller
const adminController = require('./../controller/adminController');
const doctorController = require('./../controller/doctorController');
const departmentController = require('./../controller/departmentController');
const diseasesController = require('./../controller/diseasesController');
const positionController = require('./../controller/positionController');
const bookingController = require('./../controller/bookingController');
//role
router.post('/role', adminController.createRole);

//booking
router.get('/booking', bookingController.getAllBooking);
router.get('/booking/:id', bookingController.getAllBookingByDoctor);
router.patch('/booking/:id', bookingController.updateBooking);
//Doctor
router
  .route('/doctor')
  .get(doctorController.getAllDoctor)
  .post(doctorController.createDoctor);

router.route('/doctor/:id').patch(doctorController.updateDoctor);

router.route('/doctor/locked/:id').patch(doctorController.lockAccountDoctor);
//department
router
  .route('/department')
  .get(departmentController.getAllDepartment)
  .post(departmentController.createDepartment);

router
  .route('/department/:id')

  .get(departmentController.getOneDepartment)
  .patch(departmentController.updateDepartment)
  .delete(departmentController.deleteDepartment);

//Diseases

router
  .route('/diseases')
  .get(diseasesController.getAllDiseases)
  .post(diseasesController.createDiseases);

router
  .route('/diseases/:id')
  .get(diseasesController.getALLDiseasesOfDepartment)
  .patch(diseasesController.updateDiseases)
  .delete(diseasesController.deleteDiseases);
module.exports = router;

//Position

router
  .route('/position')
  .get(positionController.getAllPosition)
  .post(positionController.createPosition);

router
  .route('/position/:id')
  .patch(positionController.updatePosition)
  .delete(positionController.deletePosition);
