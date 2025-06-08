import { jest } from '@jest/globals';
import * as ExportBtn from "../../../source/frontend/components/ExportButton.js";

// Mock Card class
jest.mock('../../source/backend/Card.js', () => {
  return jest.fn().mockImplementation((id, faceup, upsideDown) => {
    return {
      id,
      faceup,
      upsideDown,
      getImg: () => `card-${id}.jpg`,
      getCardName: () => `Card ${id}`,
      getKeywords: () => ['keyword1', 'keyword2'],
      isUpsideDown: () => upsideDown,
      getReversedMeaning: () => ['Reversed meaning A', 'Reversed meaning B'],
      getUprightMeanings: () => ['Upright meaning A', 'Upright meaning B'],
    };
  });
});

// Mock localStorage
beforeEach(() => {
  const currentDate = new Date().toISOString().split('T')[0];

  const fakeCardData = [
    { id: 1, faceup: true, upsideDown: false },
    { id: 2, faceup: true, upsideDown: true },
    { id: 3, faceup: true, upsideDown: false },
  ];

  const dailyCardsMock = {
    [currentDate]: {
      3: fakeCardData,
    },
  };

  global.localStorage = {
    getItem: (key) => {
      if (key === 'dailyCards') {
        return JSON.stringify(dailyCardsMock);
      } else if (key === 'tarotUserInfo') {
        return JSON.stringify({ name: 'TestUser', dob: '2000-01-01' });
      }
    },
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  };
});

describe('getStoredCards', () => {
  it('parses and returns card metadata correctly', () => {
    const result = ExportButton.getStoredCards(3);

    expect(result).toHaveLength(4); // 3 cards + 1 date string
    const [card1, card2, card3, date] = result;

    expect(card1).toMatchObject({
      image: 'm01.jpg',
      name: 'The Magician',
      keywords: 'capability, empowerment, activity',
      upsideDown: false,
      meaning: expect.stringContaining(
        'Taking appropriate action. Receiving guidance from a higher power. Becoming a channel of divine will. Expressing masculine energy in appropriate and constructive ways. Being yourself in every way'
      ),
    });

    expect(card2.upsideDown).toBe(true);
    expect(card2.meaning).toContain(
      'Being aloof. Obsessing on secrets and conspiracies. Rejecting guidance from spirit or intuition. Revealing all. Ignoring gut feelings. Refusing to become involved, even when involvement is appropriate'
    );

    expect(typeof card3).toBe('object');

    expect(typeof date).toBe('string');
  });
});



/**
 * @jest-environment jsdom
 */

import * as ExportBtn from "../ExportButton.js";
import Horoscope from "../../../backend/horoscope.js";
import Card from "../../../backend/Card.js";

describe("ExportButton extra coverage", () => {
  beforeEach(() => {
    jest
      .useFakeTimers()
      .setSystemTime(new Date("2025-06-10T00:00:00Z"));
    // reset localStorage
    localStorage.clear();
  });

  describe("getStoredCards", () => {
    it("picks reversed meaning when upsideDown=true", () => {
      const date = "2025-06-10";
      const payload = {
        [date]: {
          3: [
            JSON.stringify({ id: 1, faceup: true, upsideDown: true }),
          ],
        },
      };
      localStorage.setItem("dailyCards", JSON.stringify(payload));

      const cards = ExportBtn.getStoredCards(3);
      expect(cards).toHaveLength(2);           // one card + date
      const first = cards[0];
      expect(first.upsideDown).toBe(true);
      expect(first.meaning).toContain("reversed");
      const last = cards[1];
      expect(last).toMatch(/\d{4}-\d{2}-\d{2}/);
    });

    it("throws if no dailyCards in storage", () => {
      expect(() => ExportBtn.getStoredCards(3)).toThrow();
    });
  });

  describe("wrapText", () => {
    let ctx;
    beforeEach(() => {
      ctx = {
        fillText: jest.fn(),
        measureText: jest.fn((str) => ({ width: str.length * 5 })),
      };
    });

    it("applies both lineStart and lineEnd", () => {
      ExportBtn.wrapText(ctx, "hello world", 10, 20, 50, 10, "[", "]");
      const lastCall = ctx.fillText.mock.calls.slice(-1)[0][0];
      expect(lastCall.startsWith("[")).toBe(true);
      expect(lastCall.endsWith("]")).toBe(true);
    });
  });

  describe("loadImage", () => {
    it("rejects on img.onerror", async () => {
      global.Image = class {
        constructor() {
          this.onload = null;
          this.onerror = null;
        }
        set src(_) {
          setTimeout(() => this.onerror(new Error("fail")), 0);
        }
      };
      await expect(ExportBtn.loadImage("bad.png")).rejects.toThrow("fail");
    });
  });

  describe("generateImageCards", () => {
    it("uses the upsideDown drawing branch", async () => {
      const data = [
        { image: "one.png", name: "One", keywords: "a", upsideDown: true, meaning: "m1" },
        "2025-06-10",
      ];
      const make = jest.spyOn(document, "createElement");
      const canvas = document.createElement("canvas");
      const ctx = {
        drawImage: jest.fn(),
        save: jest.fn(),
        translate: jest.fn(),
        scale: jest.fn(),
        restore: jest.fn(),
        strokeRect: jest.fn(),
        fillText: jest.fn(),
        beginPath: jest.fn(),
        moveTo: jest.fn(),
        lineTo: jest.fn(),
        stroke: jest.fn(),
        measureText: () => ({ width: 10 }),
      };
      jest.spyOn(canvas, "getContext").mockReturnValue(ctx);
      make.mockImplementation((tag) => tag === "canvas" ? canvas : document.createElement(tag));
      jest.spyOn(ExportBtn, "loadImage").mockResolvedValueOnce(new Image());
      jest.spyOn(ExportBtn, "loadImage").mockResolvedValueOnce(new Image());
      jest.spyOn(ExportBtn, "loadImage").mockResolvedValueOnce(new Image());
      await ExportBtn.generateImageCards(data);
      expect(ctx.save).toHaveBeenCalled();
      expect(ctx.translate).toHaveBeenCalled();
      expect(ctx.scale).toHaveBeenCalledWith(1, -1);
      expect(ctx.restore).toHaveBeenCalled();
    });
  });

  describe("generateImageHoroscope", () => {
    it("draws the username, sign, and advice items", async () => {
      localStorage.setItem("tarotUserInfo", JSON.stringify({ name: "Zoe", dob: "01/01/2000" }));
      jest.spyOn(Horoscope, "getHoroscope").mockReturnValue("Libra");
      jest.spyOn(Horoscope, "generateReadingFromCurrentUser").mockReturnValue(["theme", "mood", "advice"]);
      const canvas = document.createElement("canvas");
      const ctx = {
        drawImage: jest.fn(),
        fillText: jest.fn(),
        beginPath: jest.fn(),
        arc: jest.fn(),
        stroke: jest.fn(),
        createLinearGradient: () => ({ addColorStop: jest.fn() }),
        measureText: () => ({ width: 10 }),
      };
      jest.spyOn(canvas, "getContext").mockReturnValue(ctx);
      jest.spyOn(document, "createElement").mockImplementation((tag) =>
        tag === "canvas" ? canvas : document.createElement(tag)
      );
      jest.spyOn(ExportBtn, "loadImage").mockResolvedValue(new Image());
      await ExportBtn.generateImageHoroscope();
      expect(ctx.fillText).toHaveBeenCalledWith("Zoe's Horoscope", expect.any(Number), expect.any(Number));
      expect(ctx.fillText).toHaveBeenCalledWith("Libra", expect.any(Number), expect.any(Number));
      expect(ctx.fillText).toHaveBeenCalledWith("theme", expect.any(Number), expect.any(Number));
      expect(ctx.fillText).toHaveBeenCalledWith("mood", expect.any(Number), expect.any(Number));
      expect(ctx.fillText).toHaveBeenCalledWith("advice", expect.any(Number), expect.any(Number));
    });
  });
});
