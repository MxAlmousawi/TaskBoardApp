import CardModel, { ICard } from "./CardModel";

export interface IColumn {
  id: number;
  name: string;
  cards: ICard[];
}

class ColumnModel implements IColumn {
  id: number;
  name: string;
  cards: CardModel[];

  constructor({ id, name, cards }: IColumn) {
    this.id = id;
    this.name = name;
    this.cards = cards.map((card) => new CardModel(card));
  }
}

export default ColumnModel;
