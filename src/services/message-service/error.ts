import { ApplicationError } from '@/protocols';

export function chatNotFoundError(): ApplicationError {
  return {
    name: 'ChatNotFoundError',
    message: 'chat not found',
  };
}

export function noAudioFileSendError(): ApplicationError {
  return {
    name: 'NoAudioFileSendError',
    message: 'audio file not found',
  };
}
