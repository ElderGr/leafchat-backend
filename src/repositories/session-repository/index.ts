import { postgreClient } from '@/config';
import { Prisma, Session } from '@prisma_config/generated/postgresql';

type ICreateSessionParams = {
  userId: string;
  token: string;
};

async function create(createSession: ICreateSessionParams) {
  return postgreClient.session.create({
    data: {
      token: createSession.token,
      user_id: createSession.userId,
    },
  });
}

const sessionRepository = {
  create,
};

export default sessionRepository;
