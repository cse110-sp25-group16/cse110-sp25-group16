# Tarot App Specifications

## Information We Need to Store

### User Profile Data:
- **Name**
- **Birth Date** (for astrological signs)
- **Personality Type (MBTI)**
- **Preferences** (Optional):
  - Favorite tarot spreads
  - History of divinations
  - Interaction tendencies (e.g., does the user prefer simple or detailed readings?)

---

### Card Information:

#### Basic Information:
- **name**: The name of the tarot card (e.g., "The Fool").
- **arcana**: Major or Minor Arcana classification.
- **suit**: If Minor Arcana, specify the suit (Wands, Cups, Pentacles, or Swords).

#### Symbolic Meanings:
- **uprightMeaning**: Description of the card's meaning when upright.
  - This is the default position for a tarot card. When a card is drawn upright, its traditional, more positive or direct meanings are interpreted (e.g., "The Fool" upright often means new beginnings, optimism).
- **reversedMeaning**: Description of the card's meaning when reversed.
  - This occurs if the card is pulled upside-down. Reversed cards usually signify the opposite or more challenging aspects of the card's meaning (e.g., "The Fool" reversed may suggest recklessness or poor judgment).
- **keywords**: List of keywords for quick reference.

#### Astrological:
- **astrologicalSign**: Associated astrological sign (if applicable).
  - [Reference](https://www.tarot.com/astrology/tarot-cards)

#### Imagery and Visual Data:
- **image**: URL or path to the card's visual representation.
- **symbolism**: Description of the main symbols and their meanings.

#### Metadata:
- **id**: Unique identifier for the card.
- **description**: Detailed explanation of the card's background and story.

#### User Interaction Data (Optional):
- **lastDrawn**: Date and time when the card was last pulled.
  - Users might want to see if they are repeatedly drawing the same card.
  - Analytical personas like *Analytical Anna* might appreciate seeing patterns over time.
- **notes**: User-specific notes or journal entries linked to this card.
  - Users can jot down personal reflections or insights during readings.
  - Allows them to remember how that card applied to their life at the time.

---

### Session History:
- History of previous readings, spread types, interpretations, and user notes.
- For *Analytical Anna*, this includes saving trends over time for analysis and export.

---

## How We Will Generate Readings:

### Algorithmic Tarot Spread Generation:
- For each draw (1, 3, 5, 10 card spreads), randomly select cards from the deck.
- Generate a layout and interpretation based on card position (past, present, future).
- In the future: Apply astrological and personality attributes to refine reading (e.g., fire signs might get more Wands cards).

---

### Inputs Needed to Generate Readings:

#### Basic Inputs:
- **User's date of birth** (for astrological sign).
- **Selected spread type** (1, 3, 5, or 10 card spread).
- **Specific question or theme for the reading** (optional).

---

## What Requires User Input vs. What Can Be Stored:

| Requires User Input             | Can Be Stored in the App          |
|---------------------------------|----------------------------------|
| Initial signup (birth date, preferences) | User preferences for daily notifications |
| Spread type selection per session       | History of tarot readings              |
| Specific questions for readings         | User notes and reflections             |
|                                     | Mood tracking logs for analysis         |
|                                     | Settings for notifications and reminders |

---

## Persona-Based Access Preferences:

### Vibes Valerie:
- Easy, daily horoscope access.
- One-click readings, no deep analysis required.
- Simple sharing options for social media.

### Partner Paul:
- Quick, summarized readings for easy understanding.
- One-click sharing with his partner, minimal depth.

### Mindful Mark:
- Deeper tarot insights and breakdowns.
- Journaling space for reflections and uploads of physical readings.

### Social Sarah:
- Sharing options for group chats and text.
- Compare & contrast views for social interactions.

### Analytical Anna:
- Historical data storage, analysis of past readings.
- Export options for further off-app analysis.
