import { Router } from "express";
import { getEmployees, CreateEmployees, UpdateEmployees, DeleteEmployees,getEmployee} from "../controllers/employees.controllers.js";

const router = Router()

router.get('/employees', getEmployees)

router.get('/employees/:id', getEmployee)

router.post('/employees', CreateEmployees)

router.patch('/employees/:id', UpdateEmployees)

router.delete('/employees/:id', DeleteEmployees)

export default router

