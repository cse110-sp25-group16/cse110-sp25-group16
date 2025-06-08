import { jest } from "@jest/globals";
import * as ExportButton from "../../source/frontend/components/ExportButton.js";

// Mock Card class
jest.mock("../../source/backend/Card.js", () => {
  return jest.fn().mockImplementation((id, faceup, upsideDown) => {
    return {
      id,
      faceup,
      upsideDown,
      getImg: () => `card-${id}.jpg`,
      getCardName: () => `Card ${id}`,
      getKeywords: () => ["keyword1", "keyword2"],
      isUpsideDown: () => upsideDown,
      getReversedMeaning: () => ["Reversed meaning A", "Reversed meaning B"],
      getUprightMeanings: () => ["Upright meaning A", "Upright meaning B"],
    };
  });
});

// Mock localStorage
beforeEach(() => {
  const currentDate = new Date().toISOString().split("T")[0];

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
      if (key === "dailyCards") {
        return JSON.stringify(dailyCardsMock);
      } else if (key === "tarotUserInfo") {
        return JSON.stringify({ name: "TestUser", dob: "2000-01-01" });
      }
    },
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  };
});

describe("getStoredCards", () => {
  it("parses and returns card metadata correctly", () => {
    const result = ExportButton.getStoredCards(3);

    expect(result).toHaveLength(4); // 3 cards + 1 date string
    const [card1, card2, card3, date] = result;

    expect(card1).toMatchObject({
      image: "m01.jpg",
      name: "The Magician",
      keywords: "capability, empowerment, activity",
      upsideDown: false,
      meaning: expect.stringContaining(
        "Taking appropriate action. Receiving guidance from a higher power. Becoming a channel of divine will. Expressing masculine energy in appropriate and constructive ways. Being yourself in every way"
      ),
    });

    expect(card2.upsideDown).toBe(true);
    expect(card2.meaning).toContain(
      "Being aloof. Obsessing on secrets and conspiracies. Rejecting guidance from spirit or intuition. Revealing all. Ignoring gut feelings. Refusing to become involved, even when involvement is appropriate"
    );

    expect(typeof card3).toBe("object");

    expect(typeof date).toBe("string");
  });
});
