interface IOptions {
   value: string;
   displayValue: string;
}

export interface IElementConfig {
   type?: string;
   placeholder?: string;
   options?: IOptions[];
}

interface IOrderFormProperty {
   elementType: string;
   elementConfig: IElementConfig;
   value: string;
}

export interface IOrderForm {
   [index: string]: IOrderFormProperty;
}
