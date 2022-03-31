function day(days: number): number {
  return days * 24 * 60 * 60 * 1000;
}

function minute(minutes: number): number {
  return minutes * 60 * 1000;
}

function minuteStr(mSec: number): string {
  return `${msecToMinute(mSec)}m`;
}

export function msecToMinute(mSec: number): number {
  return mSec / 1000 / 60;
}

export const authTwoFactoring = false;

export const nameAccessToken = 'token';
export const nameRefreshToken = 'refreshToken';

export const expiresAccessToken = minute(1);
export const expiresAccessTokenSrt = minuteStr(expiresAccessToken);

export const expiresRefreshToken = minute(10);
export const expiresRefreshTokenStr = minuteStr(expiresRefreshToken);
