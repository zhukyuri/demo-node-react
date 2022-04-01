import {
  dayToMsec,
  minuteToMsec,
  msecToMinute,
  msecToMinuteStr,
  msecToSecond,
  msecToSecondStr,
} from './appConfigs';

describe('appConfigs.ts', () => {
  it('dayToMsec', () => {
    expect(dayToMsec(1)).toEqual(86400000);
  });

  it('minuteToMsec', () => {
    expect(minuteToMsec(2)).toEqual(120000);
  });

  it('msecToMinuteStr', () => {
    expect(msecToMinuteStr(120000)).toEqual('2m');
  });

  it('msecToSecondStr', () => {
    expect(msecToSecondStr(120000)).toEqual('120s');
  });

  it('msecToMinute', () => {
    expect(msecToMinute(120000)).toEqual(2);
  });

  it('msecToSecond', () => {
    expect(msecToSecond(120000)).toEqual(120);
  });
});
