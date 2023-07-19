import bcrypt from 'bcrypt';
import { Faker, es } from '@faker-js/faker';
import { User } from '@prisma_config/generated/postgresql';
import { postgreClient } from '@/config/database';

export async function createUser(params: Partial<User> = {}): Promise<User> {
  const customFaker = new Faker({ locale: [es] });

  const incomingPassword = params.password || customFaker.internet.password(6);
  const hashedPassword = await bcrypt.hash(incomingPassword, 10);

  return postgreClient.user.create({
    data: {
      name: customFaker.person.fullName(),
      avatar_url: customFaker.image.avatar(),
      roles: customFaker.commerce.department(),
      email: params.email || customFaker.internet.email(),
      password: hashedPassword,
    },
  });
}
