import { createContext } from "react";
import {IProduct, IUser} from '../models/Interfaces';

interface Form {
  type: string;
  content: {}
}
const FormContext = createContext<Form>({
  type: "Register",
  content: {}
});

export default FormContext;
