import { User } from "#mongoose/schemas/user.js";
import { users } from "#utils/constants.js";
import { hashPassword } from "#utils/helpers.js";
import { RequestHandler } from "express";

interface PostBody {
  name: string;
  password: string;
}

export const getUserByIdHandler: RequestHandler = (req, res) => {
  const userId = parseInt(req.params.id);
  if (isNaN(userId)) {
    res.status(400).json({ error: "Invalid ID format" });
    return;
  }

  const user = users.find((user) => user.id === userId);
  if (user) res.status(200).json(user);
  else res.status(404).json({ error: "user not found" });
};

export const createUserHandler: RequestHandler = async (req, res) => {
  const body = req.body as PostBody;
  body.password = hashPassword(body.password);
  const newUser = new User(body);
  try {
    const savedUser = await newUser.save();
    res.status(201).send(savedUser);
    return;
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
    return;
  }
};
