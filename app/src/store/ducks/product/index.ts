import { ProductModel } from './types';

export const productModelToState = (
  data: { [key: number]: ProductModel },
  item: ProductModel
) => {
  return {
    ...data,
    [item.id]: {
      id: item.id,
      name: item.name
    }
  }
}
