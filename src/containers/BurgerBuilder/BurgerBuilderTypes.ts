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
   loading: boolean;
   totalPrice: number;
   purchasable: boolean;
   purchasing: boolean;
   isError: boolean;
}

export interface ICustomer {
   name: string;
   address: {
      street: string;
      zipCode: string;
      country: string;
   };
   email: string;
}

export interface IOrder {
   ingredients: IIngredients;
   price: number;
   customer: ICustomer;
   deliverMethod: string;
}
