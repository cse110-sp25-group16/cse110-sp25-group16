import Horoscope from '../../source/backend/horoscope.js';

global.localStorage = {
  _data: {},
  setItem: function (key, value) {
    this._data[key] = value;
  },
  getItem: function (key) {
    return this._data[key] || null;
  },
  removeItem: function (key) {
    delete this._data[key];
  },
  clear: function () {
    this._data = {};
  },
};

describe('Horoscope (Unit Tests)', () => {
  describe('hashCode()', () => {
    it('should return consistent hash for same string', () => {
      const hash1 = Horoscope.hashCode('GeminiMon Jun 10 2024');
      const hash2 = Horoscope.hashCode('GeminiMon Jun 10 2024');
      expect(hash1).toBe(hash2);
    });

    it('should return different hashes for different strings', () => {
      const hash1 = Horoscope.hashCode('GeminiMon Jun 10 2024');
      const hash2 = Horoscope.hashCode('GeminiTue Jun 11 2024');
      expect(hash1).not.toBe(hash2);
    });
  });

  describe('generateReadingFromCurrentUser()', () => {
    beforeEach(() => {
      localStorage.setItem(
        'tarotUserInfo',
        JSON.stringify({ name: 'UnitTest', dob: '25-03-2000' }) // Aries
      );
    });

    it('should return 3 reading elements for valid user info', () => {
      const reading = Horoscope.generateReadingFromCurrentUser();
      expect(reading.length).toBe(3);
      reading.forEach((item) => {
        expect(typeof item).toBe('string');
      });
    });
  });

  describe('expandedReading()', () => {
    it('should return expanded theme, mood, and advice', () => {
      const date = new Date(2024, 5, 7);
      const result = Horoscope.expandedReading('Gemini', date);
      expect(result.length).toBe(3);
      result.forEach((item) => {
        expect(typeof item).toBe('string');
      });
    });

    it('should be deterministic for same input', () => {
      const date = new Date(2024, 5, 7);
      const r1 = Horoscope.expandedReading('Gemini', date);
      const r2 = Horoscope.expandedReading('Gemini', date);
      expect(r1).toEqual(r2);
    });
  });

  describe('expandedReadingFromCurrentUser()', () => {
    beforeEach(() => {
      localStorage.setItem(
        'tarotUserInfo',
        JSON.stringify({ name: 'UnitTest', dob: '25-03-2000' })
      );
    });

    it('should return 3 expanded reading elements', () => {
      const result = Horoscope.expandedReadingFromCurrentUser();
      expect(result.length).toBe(3);
      result.forEach((item) => {
        expect(typeof item).toBe('string');
      });
    });
  });

  describe('getHoroscope() - Branch Coverage', () => {
    const zodiacCases = [
      { date: new Date(2023, 0, 19), expected: 'Capricorn' }, // Jan 19
      { date: new Date(2023, 0, 20), expected: 'Aquarius' }, // Jan 20
      { date: new Date(2023, 1, 18), expected: 'Aquarius' }, // Feb 18
      { date: new Date(2023, 1, 19), expected: 'Pisces' }, // Feb 19
      { date: new Date(2023, 2, 20), expected: 'Pisces' }, // Mar 20
      { date: new Date(2023, 2, 21), expected: 'Aries' }, // Mar 21
      { date: new Date(2023, 3, 19), expected: 'Aries' }, // Apr 19
      { date: new Date(2023, 3, 20), expected: 'Taurus' }, // Apr 20
      { date: new Date(2023, 4, 20), expected: 'Taurus' }, // May 20
      { date: new Date(2023, 4, 21), expected: 'Gemini' }, // May 21
      { date: new Date(2023, 5, 20), expected: 'Gemini' }, // Jun 20
      { date: new Date(2023, 5, 21), expected: 'Cancer' }, // Jun 21
      { date: new Date(2023, 6, 22), expected: 'Cancer' }, // Jul 22
      { date: new Date(2023, 6, 23), expected: 'Leo' }, // Jul 23
      { date: new Date(2023, 7, 22), expected: 'Leo' }, // Aug 22
      { date: new Date(2023, 7, 23), expected: 'Virgo' }, // Aug 23
      { date: new Date(2023, 8, 22), expected: 'Virgo' }, // Sep 22
      { date: new Date(2023, 8, 23), expected: 'Libra' }, // Sep 23
      { date: new Date(2023, 9, 22), expected: 'Libra' }, // Oct 22
      { date: new Date(2023, 9, 23), expected: 'Scorpio' }, // Oct 23
      { date: new Date(2023, 10, 21), expected: 'Scorpio' }, // Nov 21
      { date: new Date(2023, 10, 22), expected: 'Sagittarius' }, // Nov 22
      { date: new Date(2023, 11, 21), expected: 'Sagittarius' }, // Dec 21
      { date: new Date(2023, 11, 22), expected: 'Capricorn' }, // Dec 22
    ];

    zodiacCases.forEach(({ date, expected }) => {
      it(`returns "${expected}" for ${date.toDateString()}`, () => {
        const result = Horoscope.getHoroscope(date);
        expect(result).toBe(expected);
      });
    });

    it('returns null for invalid month', () => {
      const badDate = new Date('invalid');
      const result = Horoscope.getHoroscope(badDate);
      expect(result).toBe(null);
    });
  });
});
