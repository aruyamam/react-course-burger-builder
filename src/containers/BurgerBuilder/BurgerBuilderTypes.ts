export interface IDisabledInfo {
   [index: string]: boolean;
   bacon: boolean;
   cheese: boolean;
   meat: boolean;
   salad: boolean;
}

export interface IIngredients {
   [index: string]: number;
   bacon: number;
   cheese: number;
   meat: number;
   salad: number;
}

export interface IBBState {
   ingredients: IIngredients;
   totalPrice: number;
   purchasable: boolean;
   purchasing: boolean;
}
