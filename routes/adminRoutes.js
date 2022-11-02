const express = require("express");
const router = express.Router();

//import controller
const adminController = require("./../controller/adminController");

const departmentController = require("./../controller/departmentController");

//role
router.post("/role", adminController.createRole);

//department
router.get("/department", departmentController.getAllDepartment);
router.post("/department", departmentController.createDepartment);

router.route("/department/:id").get(departmentController.getOneDepartment).patch(departmentController.updateDepartment).delete(departmentController.deleteDepartment);
module.exports = router;
