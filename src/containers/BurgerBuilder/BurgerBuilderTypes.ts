export interface DisabledInfo {
   [index: string]: boolean;
   bacon: boolean;
   cheese: boolean;
   meat: boolean;
   salad: boolean;
}

export interface Ingredients {
   [index: string]: number;
   bacon: number;
   cheese: number;
   meat: number;
   salad: number;
}

export interface BBState {
   ingredients: Ingredients;
   totalPrice: number;
   purchasable: boolean;
   purchasing: boolean;
}
