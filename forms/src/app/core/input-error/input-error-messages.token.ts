import { InjectionToken } from '@angular/core';

export const ERROR_MESSAGES: { [key: string]: string } = {
  required: `This field is required`,
  requiredTrue: `This field is required`,
  email: `It should be a valid email`,
  minlength: `The value length is too short`,
  banWord: `This word is not allowed`,
  appBanWord: `This word is not allowed`,
  passwordShouldMatch: `Password should match`,
  appPasswordShouldMatch: `Password should match`,
  pattern: `Wrong format`,
  uniqueName: `Nickname is taken`,
  appUniqueName: `Nickname is taken`,
};

export const VALIDATION_ERROR_MESSAGES = new InjectionToken(`Validation Messages`, {
  providedIn: 'root',
  factory: () => ERROR_MESSAGES,
});
