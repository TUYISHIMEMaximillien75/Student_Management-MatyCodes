import express, { Router } from "express";
import { Controllers } from "../controller/productsController";
import { verifyToken } from "../middleware/auth.middleware";
import { allowRoles } from "../middleware/role.middleware";
import { attendanceValSchema } from "../config/attendance";
import { leaveValSchema } from "../config/leave";
import { validateUser } from "../middleware/attendanceMiddleware";

const controller = new Controllers();
const router: Router = express.Router();


// ✅ Public route
router.post("/login", controller.login);

// ✅ Public signup
router.post("/users", controller.users);

// 🔐 Only ADMIN can create admin users
router.post(
  "/usersadmin",
  verifyToken,
  allowRoles("admin"),
  controller.usersAdmin
);

// 🔐 Any authenticated user
router.get(
  "/profile",
  verifyToken,
  controller.profile
);

// 🔐 Teacher or Admin can view students
router.get(
  "/students",
  verifyToken,
  allowRoles("admin", "teacher"),
  controller.allProducts
);

// 🔐 Teacher can mark attendance
router.post(
  "/attendance",
  verifyToken,
  allowRoles("teacher"),
  validateUser(attendanceValSchema, "body"), // ✅ Joi here
  controller.attendance
);

// 🔐 Teacher or Admin can update leave (PUT)
router.put(
  "/leaves",
  verifyToken,
  allowRoles("teacher", "admin"),
  validateUser(attendanceValSchema, "body"), // example reuse
  controller.leave
);

// 🔐 Admin creates leave
router.post(
  "/leaves",
  verifyToken,
  allowRoles("admin"),
  validateUser(leaveValSchema, "body"), // ✅ Joi here
  controller.setLeave
);

export { router };

