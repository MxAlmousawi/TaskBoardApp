import CardModel from "../../models/CardModel";
import ColumnModel from "../../models/ColumnModel";

export interface cardListResponse {
  column: ColumnModel;
  cards: CardModel[];
}
