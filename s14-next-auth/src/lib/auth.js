import { compare, hash } from 'bcryptjs';

export async function hashPassword(pw) {
  const hashedpw = await hash(pw, 12);
  return hashedpw;
}

export async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}
