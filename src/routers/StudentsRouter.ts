import express, { Router } from "express";
import { Controllers } from "../controller/productsController";
import { verifyToken } from "../middleware/auth.middleware";
import { allowRoles } from "../middleware/role.middleware";
import { attendanceValSchema } from "../config/attendance";
import { leaveValSchema } from "../config/leave";
import { validateUser } from "../middleware/attendanceMiddleware";

const controller = new Controllers();
const router: Router = express.Router();


router.post("/login", controller.login);

router.post("/users", controller.users);

router.post(
  "/usersadmin",
  verifyToken,
  allowRoles("admin"),
  controller.usersAdmin
);

router.get(
  "/profile",
  verifyToken,
  controller.profile
);

router.get(
  "/students",
  verifyToken,
  allowRoles("admin", "teacher"),
  controller.allProducts
);

router.post(
  "/attendance",
  verifyToken,
  allowRoles("teacher"),
  validateUser(attendanceValSchema, "body"),  
  controller.attendance
);

router.put(
  "/leaves",
  verifyToken,
  allowRoles("teacher", "admin"),
  validateUser(attendanceValSchema, "body"),
  controller.leave
);

router.post(
  "/leaves",
  verifyToken,
  allowRoles("admin"),
  validateUser(leaveValSchema, "body"), 
  controller.setLeave
);

export { router };

