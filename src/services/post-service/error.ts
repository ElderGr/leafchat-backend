import { ApplicationError } from '@/protocols';

export function postNotFoundError(): ApplicationError {
  return {
    name: 'PostNotFoundError',
    message: 'Post not found',
  };
}
