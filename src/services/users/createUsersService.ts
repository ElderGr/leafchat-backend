import { Role } from "src/entities/sql/Role";
import { User } from "src/entities/sql/User";
import { getRepository } from "typeorm";
import { hash } from "bcryptjs";

interface IRequest {
  name: string;
  id_role: string;
  email: string;
  password: string;
}

export default async function createUserService({
  email,
  id_role,
  name,
  password
}: IRequest): Promise<User>{
  const userRepository = getRepository(User)
  const roleRepository = getRepository(Role)

  const roleExists = await roleRepository.findOne({
    where: {
      id: id_role
    }
  })

  if(!roleExists){
    throw new Error("Role not found")
  }

  const hashedPassword = await hash(password, 8)

  const createdUser = userRepository.create({
    email,
    name,
    id_role,
    password: hashedPassword
  })

  await userRepository.save(createdUser)

  return createdUser
}
