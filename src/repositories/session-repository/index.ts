import { postgreClient } from '@/config';

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
