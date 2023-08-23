import { ApplicationError } from '@/protocols';

export function missingBackendEnvError(): ApplicationError {
  return {
    name: 'MissingBackendEnvError',
    message: 'There is missing BACKEND_URL variable',
  };
}
