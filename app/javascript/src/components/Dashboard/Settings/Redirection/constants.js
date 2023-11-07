export const FROM_PATH_TRUNCATE_LENGTH = 32;
export const TO_PATH_TRUNCATE_LENGTH = 32;

export const VALID_FROM_PATH_REGEX = /^\/[/.a-zA-Z0-9-/]+$/;
export const VALID_TO_PATH_URL_REGEX = /^\/[/.a-zA-Z0-9-/]*$/;
export const VALID_TO_FULL_URL_REGEX =
  /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?/i;
