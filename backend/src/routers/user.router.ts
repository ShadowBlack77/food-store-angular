import { Router } from "express"; 
import jwt from 'jsonwebtoken';
import { sample_foods, sample_users } from "../data";
import asyncHandler from 'express-async-handler';
import { User, UserModel } from "../models/user.model";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import bcrypt from 'bcryptjs';

const router = Router();

router.get("/seed", asyncHandler(
  async (req, res) => {
    const usersCount = await UserModel.countDocuments();
    if (usersCount>0) {
      res.send("Seed is already done");
      return;
    }

    await UserModel.create(sample_users);
    res.send('Seed is Done!');
  }
));

router.post('/login', asyncHandler(
  async (req, res) => {
    const {email, password} = req.body;
    const user = await UserModel.findOne({ email, password })
  
    if (user) {
      res.send(generateTokenResponse(user));
    } else {
      res.status(HTTP_BAD_REQUEST).send("User name or password is not valid!");
    }
  }
));

router.post('/register', asyncHandler(
  async (req, res) => {
    const {name, email, password, address} = req.body;
    const user = await UserModel.findOne({email});

    if (user) {
      res.status(HTTP_BAD_REQUEST).send("User is already exist, please login");
      return;
    }
    
    const ecryptedPassowrd = await bcrypt.hash(password, 10);

    const newUser: User = {
      id: '',
      name,
      email: email.toLowerCase(),
      password: ecryptedPassowrd,
      address,
      isAdmin: false
    }

    const dbUser = await UserModel.create(newUser);
    res.send(generateTokenResponse(dbUser));
  }
))

const generateTokenResponse = (user: any) => {
  const token = jwt.sign({
    email: user.email, isAdmin: user.isAdmin
  },"SomeRandomTest", {
    expiresIn: "30d"
  });

  user.token = token;
  return user;
};

export default router;