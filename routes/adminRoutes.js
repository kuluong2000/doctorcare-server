const express = require('express');
const router = express.Router();

//import controller
const accountController = require('./../controller/accountController');
const adminController = require('./../controller/adminController');
const doctorController = require('./../controller/doctorController');
const departmentController = require('./../controller/departmentController');
const diseasesController = require('./../controller/diseasesController');
const positionController = require('./../controller/positionController');
const bookingController = require('./../controller/bookingController');
const medicineController = require('./../controller/medicineController');
const statisticController = require('./../controller/statisticController');
//role
router.post('/role', adminController.createRole);

router.get('/account', accountController.getAllAccount);
router.patch('/account/:id', accountController.updateAccount);
router.patch(
  '/account/lockOrUnlock/:id',
  accountController.lockOrUnlockAccount
);

//booking
router.get('/booking', bookingController.getAllBooking);
router.get('/booking/:id', bookingController.getAllBookingByDoctor);
router.patch('/booking/:id', bookingController.updateBooking);
//Doctor
router
  .route('/doctor')
  .get(doctorController.getAllDoctor)
  .post(doctorController.createDoctor);

router.get('/doctor/:id', doctorController.getAllDoctorOfDepartment);

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

//get All department of diseases
router.get(
  '/departmentOfDiseases',
  departmentController.getAllDepartmentOfDiseases
);

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

//Medicine

router
  .route('/medicine')
  .get(medicineController.getAllMedicine)
  .post(medicineController.createMedicine);
router
  .route('/medicine/:id')
  .patch(medicineController.UpdateMedicine)
  .delete(medicineController.deleteMedicine);

//Statistic

router.get('/statistic', statisticController.statisPatientByMonth);
