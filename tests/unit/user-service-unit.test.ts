import { init } from 'app';

import * as userService from '@/services/user-service/index';
import { clearPostgreDb } from '../helpers';
import { createUser as createUserFactory } from '../factories/user-factory';
import { duplicatedEmailError } from 'errors/user-errors';
import { Faker, es } from '@faker-js/faker';
import { postgreClient } from '@/config/database';
import bcrypt from 'bcrypt';

beforeAll(async () => {
  await init();
  await clearPostgreDb();
});

describe('sign-in', () => {
  const faker = new Faker({ locale: [es] });

  it('should be throw duplicatedEmailError if there is a user with same email', async () => {
    const createdUser = await createUserFactory();

    try {
      await userService.createUser({
        avatar_url: createdUser.avatar_url,
        email: createdUser.email,
        name: createdUser.name,
        password: createdUser.password,
        roles: createdUser.roles,
      });

      fail('should throw a duplicateEmailError');
    } catch (error) {
      expect(error).toStrictEqual(duplicatedEmailError());
    }
  });

  it('should be able to create a user with a unique email', async () => {
    const mockerEmail = faker.internet.email();

    const user = await userService.createUser({
      avatar_url: faker.internet.avatar(),
      email: mockerEmail,
      name: faker.person.fullName(),
      password: faker.internet.password(),
      roles: faker.commerce.department(),
    });

    const createdUser = await postgreClient.user.findUnique({
      where: { id: user.id },
    });

    expect(user).toEqual(
      expect.objectContaining({
        id: createdUser?.id,
        avatar_url: createdUser?.avatar_url,
        email: createdUser?.email,
        name: createdUser?.name,
        password: createdUser?.password,
        roles: createdUser?.roles,
      }),
    );
  });

  it('should be able do crypt the password', async () => {
    const password = faker.internet.password(8);
    const email = faker.internet.email();

    const user = await userService.createUser({
      avatar_url: faker.internet.avatar(),
      email: email,
      name: faker.person.fullName(),
      password: password,
      roles: faker.commerce.department(),
    });

    const createdUser = await postgreClient.user.findUnique({
      where: { id: user.id },
    });

    if (!createdUser?.id) fail('should be find a user with a crypted password');

    expect(password).not.toBe(createdUser?.password);
    expect(await bcrypt.compare(password, createdUser.password)).toBe(true);
  });
});
