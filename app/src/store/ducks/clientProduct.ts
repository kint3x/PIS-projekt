import { ClientModel } from "./client/types";
import { EmployeeModel } from "./employee/types";
import { ProductModel } from "./product/types";

export const clientProductToState = (
  data: { [key: number]: ClientProductModel },
  item: ClientProductModel
) => {
  return {
    ...data,
    [item.id]: {
      id: item.id,
      client: item.client,
      product: item.product,
      active: item.active,
      date: item.date,
      employee: item.employee
    }
  }
};

export interface ClientProductModel {
  id: number,
  client: ClientModel,
  employee: EmployeeModel,
  product: ProductModel,
  active: boolean,
  date: string
};
