import { AsyncStorage } from "react-native";

export async function getDecks() {
  try {
    const result = await AsyncStorage.getItem("decks");
    const decks = JSON.parse(result);
    return decks;

  } catch (err) {
    console.log(err);
  }
}

export async function setSelectedDeck(title) {
    try {
      await AsyncStorage.setItem("selectedDeck", JSON.stringify(title));
    } catch (e) {
      console.log(e);
    }
  }
export async function saveDeckTitle(title) {
  const decks = await getDecks();
  const newDecks = JSON.stringify({
    ...decks,
    [title]: {
      title: title,
      questions: []
    }
  });
  AsyncStorage.setItem("decks", newDecks);
}
export async function updateDecks(decks) {
  AsyncStorage.setItem("decks", JSON.stringify(decks));
}
export async function getDeck() {
  const decks = await getDecks();
  const result = await AsyncStorage.getItem("selectedDeck");
  const selectedDeck = await JSON.parse(result);
  const deck = await decks[selectedDeck];
  return deck;
}

export async function addCardToDeck(card) {
  const decks = await getDecks();
  const deck = await getDeck();
  decks[deck.title] = {
    title: deck.title,
    questions: [
      ...deck.questions,
      {
        question: card.question,
        answer: card.answer
      }
    ]
  };
  updateDecks(decks);
}
