import { atom } from "recoil";

export interface IBoardItem {
  id: string;
  text: string;
}

interface IBoard {
  [key: string]: IBoardItem[];
}

export const board_item = atom<IBoard>({
  key: "boardList",
  default: {},
});

export const board_order = atom<string[]>({
  key: "order",
  default: [],
});
