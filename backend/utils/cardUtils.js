export const isConnectedCards = (prevCard, nextCard) => {
  console.log(prevCard)
  console.log(nextCard)
  if (!prevCard && !nextCard) {
    return false;
  }
  if (
    prevCard &&
    nextCard &&
    (prevCard.nextCardId !== nextCard.id ||
      nextCard.prevCardId !== prevCard.id)
  ) {
    return false;
  }
  if (prevCard && !nextCard && prevCard.nextCardId !== null) {
    return false;
  }
  if (!prevCard && nextCard && nextCard.prevCardId !== null) {
    return false;
  }
  return true;
};
