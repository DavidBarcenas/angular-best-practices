import { filter, map } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

describe('getting started with RxJs testing with marbles', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((current, expected) => expect(current).toEqual(expected));
  });

  it('say hello world when complete', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const values = {
        a: 'hello',
        b: 'world'
      };
      const source = cold('-a-b-|', values);
      const expected = '   -a-b-|';
      expectObservable(source).toBe(expected, values);
    });
  });

  it('filter odd values', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const values = {
        a: 0,
        b: 1,
        c: 2,
        d: 3,
        e: 4,
        f: 5
      };
      const source = cold('abcdef|', values).pipe(filter(value => value % 2 === 0));
      const expected = 'a-c-e-|';
      expectObservable(source).toBe(expected, values);
    });
  });

  it('map values for the 10x developer', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const values = {
        a: 10,
        b: 100
      };
      const source = cold('1000ms a', values).pipe(map(value => value * 10));
      const expected = '1000ms b';
      expectObservable(source).toBe(expected, values);
    });
  });
});
