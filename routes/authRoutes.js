// import express from "express";
import { Router } from 'express';
import {loginController, registerController,testController} from '../controller/authController.js';
import { isAdmin, requreSignIn } from '../middleware/authMiddleware.js';
// router object
 const router = Router()

//routing
// REGISTER || METHOD POST
router.post('/register',registerController)

//LOGIN || POST
router.post('/login',loginController)


// test routes
router.get('test',requreSignIn,isAdmin, testController)

 export default router;
