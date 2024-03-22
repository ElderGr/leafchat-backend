import { Faker, faker, pt_BR } from '@faker-js/faker';
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

  let post = await postgre.post.findFirst();
  const createdPost = [];
  if (!post) {
    for (let i = 0; i < 40; i++) {
      post = await postgre.post.create({
        data: {
          title: faker.lorem.word(),
          description: faker.lorem.text(),
          user_id: user?.id ? user.id : createdUsers[0].id,
          Comments: {
            createMany: {
              data: [
                { body: faker.lorem.paragraphs(), user_id: createdUsers[0].id },
                { body: faker.lorem.paragraphs(), user_id: createdUsers[0].id },
                { body: faker.lorem.paragraphs(), user_id: createdUsers[0].id },
              ],
            },
          },
        },
      });

      createdPost.push(post);
    }
  }

  console.log({
    users: createdUsers,
    // createdPost,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await postgre.$disconnect();
  });
