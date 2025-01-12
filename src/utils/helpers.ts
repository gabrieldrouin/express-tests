import bcrypt from "bcrypt";

const saltRounds = 10;

export function comparePassword(plain: string, hashed: string) {
  return bcrypt.compareSync(plain, hashed);
}

export function hashPassword(password: string) {
  const salt = bcrypt.genSaltSync(saltRounds);
  console.log(salt);
  return bcrypt.hashSync(password, salt);
}
