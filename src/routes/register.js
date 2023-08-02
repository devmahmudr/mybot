import { Router } from "express";
import Io from "../helper/Io.js";
import users from "../../db/users.json" assert { type: "json" };
import { tokenHelper } from "../utils/token.js";
import myBot from "../bot.js";

const registerRoute = Router();

registerRoute.post("/register", async (req, res) => {
  try {
    //reading users
    const db = new Io("./db/users.json");
    const writer = await db.read();

    //creating new user
    const newUser = {
      id: users.length + 1 || 999,
      username: req.body.username,
      password: req.body.password,
    };

    //push new user to json file
    writer.push(newUser);
    
    //sending new user to tg channel
    // await myBot(newUser)

    //creating new token
    const token = tokenHelper.sign(newUser, process.env.SECRET_KEY);
    await db.write(writer);

    // sending response
    res.status(201).json({ message: "successfully created new user", token });
  } catch (error) {
    console.log(error.message);
  }
});

export default registerRoute;
