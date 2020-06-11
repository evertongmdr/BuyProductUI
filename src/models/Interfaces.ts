export interface IProduct {
    id?: string
    name: string;
    descrition?: string;
    quantity?: string;
    price?: string;
  }
  
  export interface IUser {
    id?: string;
    firstName: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }

  export interface IItensOrder{
    idProduct: string
    idOrder: string,
    quantity: string,
    price: string,
  }

  export interface IOrder {
    // user: IUser,
    date: Date,
    itesOrder: IItensOrder[]
    total: number
    
  }
  
  