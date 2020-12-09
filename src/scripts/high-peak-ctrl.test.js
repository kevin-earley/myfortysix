import { HighPeak, HighPeaksCtrl } from "./high-peaks-ctrl";

// todo: test the highpeak class
describe('HighPeak', () => {
  describe('constructor', () => {
    const highPeak = new HighPeak("Test Peak", 1000);

    test('name and elevaton get assigned', () => {
      expect(highPeak.name).toBe("Test Peak");
      expect(highPeak.elevation).toBe(1000);
    });

    test('status set to resonable defaults', () => {
      expect(highPeak.status.isCompleted).toBe(false);
      expect(highPeak.status.dateCompleted).toBeNull();
    });
  });

  describe('markComplete', () => {
    const highPeak = new HighPeak("Test Peak", 1000);

    test('update status to completed values', () => {
      highPeak.markComplete('01/01/21');

      expect(highPeak.status.isCompleted).toBe(true);
      expect(highPeak.status.dateCompleted).toBe('01/01/21');
    });
  });

  describe('markIncomplete', () => {
    const highPeak = new HighPeak("Test Peak", 1000);

    test('update status to incompleted values', () => {
      highPeak.markComplete('01/01/21');
      highPeak.markIncomplete();
      
      expect(highPeak.status.isCompleted).toBe(false);
      expect(highPeak.status.dateCompleted).toBeNull();
    });
  });
});

describe('getData', () => {
  test('the getData function exists', () => {
    expect(HighPeaksCtrl.getData).toBeDefined();
  });

  test('currentHighPeak starts at null', () => {
    expect(HighPeaksCtrl.getData().currentHighPeak).toBeNull();
  });

  test('totalCompleted starts at 0', () => {
    expect(HighPeaksCtrl.getData().totalCompleted).toBe(0);
  });

  test('highPeaks should have 46 items', () => {
    expect(HighPeaksCtrl.getData().highPeaks.length).toBe(46);
  });

  test('highPeaks should all be HighPeak class', () => {
    const highPeaks = HighPeaksCtrl.getData().highPeaks;

    highPeaks.forEach(highPeak => {
      expect(highPeak instanceof HighPeak).toBe(true);
    });
  });
});