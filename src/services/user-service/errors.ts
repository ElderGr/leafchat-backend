import { ApplicationError } from '@protocols';

export function duplicatedEmailError(): ApplicationError {
  return {
    name: 'DuplicatedEmailError',
    message: 'There is already an user with given email',
  };
}

export function nonExistentUserError(): ApplicationError {
  return {
    name: 'nonExistentUserError',
    message: 'There is not an user with this id',
  };
}
