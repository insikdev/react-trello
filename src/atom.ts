import { atom } from "recoil";

export const saveItem = (item: IBoard) =>
  localStorage.setItem("ITEM", JSON.stringify(item));

export const LoadItem = (): IBoard | null => {
  const item = localStorage.getItem("ITEM");
  if (item) return JSON.parse(item);
  return null;
};

export const saveOrder = (order: string[]) =>
  localStorage.setItem("ORDER", JSON.stringify(order));

export const loadOrder = () => {
  const order = localStorage.getItem("ORDER");
  if (order) return JSON.parse(order);
  return null;
};

export interface IBoardItem {
  id: string;
  text: string;
}

interface IBoard {
  [key: string]: IBoardItem[];
}

export const board_item = atom<IBoard>({
  key: "boardList",
  default: LoadItem() ?? {},
});

export const board_order = atom<string[]>({
  key: "order",
  default: loadOrder() ?? [],
});
