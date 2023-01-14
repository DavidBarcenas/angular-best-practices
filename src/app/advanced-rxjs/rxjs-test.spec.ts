import { filter, map } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

describe('getting started with RxJs testing with marbles', () => {
  // The TestScheduler class is part of the rxjs/testing module,
  // and enables synchronous testing of asynchronous, or synchronous, Observables.
  let testScheduler: TestScheduler;

  beforeEach(() => {
    // The constructor function accepts a assertDeepEqual argument,
    // which is a function that will be invoked to by the TestScheduler
    // instance to assert a deep equality check.
    testScheduler = new TestScheduler((current, expected) => expect(current).toEqual(expected));
  });

  it('say hello world when complete', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      // We define a values object whose property keys are the
      // character that represents the value in the marble string
      const values = {
        a: 'hello',
        b: 'world'
      };
      // Characters a and b represent each next notification.
      // The pipe (|) character represents a completion notification on frame 5.
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
      // (1000 milliseconds) every second emits a value
      const source = cold('1000ms a', values).pipe(map(value => value * 10));
      const expected = '1000ms b';
      expectObservable(source).toBe(expected, values);
    });
  });

  it('subscribe to a hot observable', () => {
    testScheduler.run(({ hot, expectObservable }) => {
      // object that represents the values of the next notifications
      // for the source Observable.
      const values = {
        a: 0,
        b: 1,
        c: 2
      };

      // We progress the time by 100ms and then emit the value represented by a.
      // The first value of '0' is emitted on frame 100. This is because the
      // first frame is frame 0, which is necessary for testing a synchronous Observable.
      // Then, we progress the time by 99ms, and then emit the value represented by b.
      // Again, we progress time by 99ms, and then emit the value represented by c.
      // Finally, the completion notification emits on frame 301.
      const source = hot('100ms a 99ms b 99ms c|', values);

      // After 200ms the Observer subscribes to the hot Observable.
      // Then, after an additional 100ms the Observer unsubscribes.
      const subscription1 = '200ms ^ 100ms !';

      // After 300ms the Observer subscribes to the hot Observable.
      // The second Observer next unsubscribes from the Observable.
      const subscription2 = '300ms ^';

      // On frame 200 we expect a next notification of the value represented by b.
      // Then, we progress virtual time by 99ms (or 99 frames),
      // and then emit the value represented by c
      const expected1 = '200ms b 99ms c';

      // Observable of the value represented by c. Finally,
      // on frame 301 we expect the Observer to receive the completion notification.
      const expected2 = '300ms c|';
      expectObservable(source, subscription1).toBe(expected1, values);
      expectObservable(source, subscription2).toBe(expected2, values);
    });
  });
});
