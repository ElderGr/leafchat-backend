import { getRepository } from "typeorm";
import {Role} from "../../entities/sql/Role";

interface IParams{
  name: string;
}

export default async function createRoleService({ name }: IParams): Promise<Role>{
  const roleRepository = getRepository(Role)

  const createdRole = roleRepository.create({
    name
  })

  await roleRepository.save(createdRole)

  return createdRole
}
