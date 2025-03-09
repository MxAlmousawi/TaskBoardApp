import TagModel, { ITag } from "./TagModel";

export interface ICard {
  id: number;
  title: string;
  description?: string;
  tag?: ITag;
  prevCardId?: number;
  nextCardId?: number;
  columnId: number;
  isPlaceholder?: boolean;
}

class CardModel implements ICard {
  id: number;
  title: string;
  description?: string;
  tag?: TagModel;
  prevCardId?: number;
  nextCardId?: number;
  columnId: number;
  isPlaceholder?: boolean = false;

  constructor({
    id,
    title,
    description,
    tag,
    prevCardId,
    nextCardId,
    columnId,
    isPlaceholder = false,
  }: ICard) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.tag = tag ? new TagModel(tag) : undefined;
    this.prevCardId = prevCardId;
    this.nextCardId = nextCardId;
    this.columnId = columnId;
    this.isPlaceholder = isPlaceholder;
  }
}

export default CardModel;
