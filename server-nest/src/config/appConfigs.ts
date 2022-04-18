// TOKENS

export function dayToMsec(days: number): number {
  return days * 24 * 60 * 60 * 1000;
}

export function minuteToMsec(minutes: number): number {
  return minutes * 60 * 1000;
}

export function msecToMinuteStr(mSec: number): string {
  return `${msecToMinute(mSec)}m`;
}

export function msecToSecondStr(mSec: number): string {
  return `${msecToSecond(mSec)}s`;
}

export function msecToMinute(mSec: number): number {
  return mSec / 1000 / 60;
}

export function msecToSecond(mSec: number): number {
  return mSec / 1000;
}

export const authTwoFactoring = false;

export const nameAccessToken = 'token';
export const nameRefreshToken = 'refreshToken';

export const expiresAccessToken = minuteToMsec(60);
export const expiresAccessTokenSrt = msecToSecondStr(expiresAccessToken);

export const expiresRefreshToken = minuteToMsec(24 * 60);
export const expiresRefreshTokenStr = msecToSecondStr(expiresRefreshToken);

// CORS

export const corsList = [
  'http://localhost:3007',
  'http://localhost:3000',
  'http://dev.api-nest.queuemy.com',
];
