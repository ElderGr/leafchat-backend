import { Faker, pt_BR } from '@faker-js/faker';
import { PrismaClient as PostgreClient } from './generated/postgresql';
import bcrypt from 'bcrypt';

const postgre = new PostgreClient();

async function main() {
  const customFaker = new Faker({ locale: [pt_BR] });

  let user = await postgre.user.findFirst();
  const createdUsers = [];
  if (!user) {
    for (let i = 0; i < 3; i++) {
      const seedPassword = customFaker.internet.password();
      const hashedPassword = await bcrypt.hash(seedPassword, 10);

      user = await postgre.user.create({
        data: {
          name: customFaker.person.fullName(),
          avatar_url: customFaker.image.avatar(),
          roles: customFaker.commerce.department(),
          email: customFaker.internet.email(),
          password: hashedPassword,
        },
      });

      user.password = seedPassword;

      createdUsers.push(user);
    }
  }

  console.log({ users: createdUsers });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await postgre.$disconnect();
  });
