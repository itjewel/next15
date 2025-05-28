// Generic item type
export type BaseItem = {
  id: number;
  text: string;
};

// Generic actions
export type GenericAction<T extends BaseItem> =
  | { type: "added"; id: number; text: string }
  | { type: "changed"; item: T }
  | { type: "deleted"; id: number };
