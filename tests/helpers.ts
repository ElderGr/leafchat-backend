import { postgreClient } from '@/config/database';

export async function clearPostgreDb() {
  await postgreClient.comments.deleteMany({});
  await postgreClient.comments_files.deleteMany({});
  await postgreClient.post.deleteMany({});
  await postgreClient.post_files.deleteMany({});
  await postgreClient.session.deleteMany({});
  await postgreClient.user.deleteMany({});
}

// export async function clearMongoDb(){
//   await mongoClient.chat.deleteMany({});
//   await mongoClient.participant.deleteMany({});
//   await mongoClient.message.deleteMany({});
// }
