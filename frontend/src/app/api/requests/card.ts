export interface SwapCardsRequest {
  id: number;
  newPrevId: number | null;
  newNextId: number | null;
  newColumnId: number;
}

export interface AddCardRequest {
  title: string;
  description: string;
  tagId: number;
  columnId: number;
}
