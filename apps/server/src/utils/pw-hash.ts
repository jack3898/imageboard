import bcrypt from "bcryptjs";

export async function hash(input: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);

  return bcrypt.hash(input, salt);
}

export async function verifyHash(input: string, hash: string): Promise<boolean> {
  return bcrypt.compare(input, hash);
}
