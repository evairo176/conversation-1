import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'sonner';

interface OrderLineItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  productThumbnail: string;
  maxStock: number;
  withStock: boolean;
}

interface OrderLineItems {
  products: OrderLineItem[];
}
const isBrowser = typeof window !== 'undefined';

const getInitialOrderLineItems = (): OrderLineItem[] => {
  if (isBrowser) {
    try {
      const storedItems = localStorage.getItem('posItems');
      if (storedItems) {
        return JSON.parse(storedItems);
      }
    } catch (error) {
      console.error('Failed to parse pos items from localStorage', error);
    }
  }
  return [];
};

const saveItemsToLocalStorage = (items: OrderLineItem[]) => {
  localStorage.setItem('posItems', JSON.stringify(items));
};

const initialState: OrderLineItems = {
  products: getInitialOrderLineItems()
};

const pointOfSale = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProductToOrderLine: (state, action: PayloadAction<OrderLineItem>) => {
      if (action.payload.maxStock < 1 && action.payload.withStock === true) {
        const promise = () =>
          new Promise((resolve, error) =>
            setTimeout(() => error({ message: 'Out of stock' }), 600)
          );

        toast.promise(promise, {
          loading: 'Loading...',
          success: (data: any) => `${data?.message}`,
          error: (data: any) => `${data?.message}`
        });
        return;
      }
      action.payload.productThumbnail =
        action.payload.productThumbnail ?? '/image-not-found.jpg';
      state.products.push(action.payload);
      saveItemsToLocalStorage(state.products);

      const promise = () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ message: 'Item added successfully' }), 600)
        );

      toast.promise(promise, {
        loading: 'Loading...',
        success: (data: any) => {
          return `${data?.message}`;
        },
        error: (data: any) => {
          return `${data?.message}`;
        }
      });
    },
    removeProductFromOrderLine: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
      saveItemsToLocalStorage(state.products);

      const promise = () =>
        new Promise((resolve, error) =>
          setTimeout(() => error({ message: 'Item deleted successfully' }), 600)
        );

      toast.promise(promise, {
        loading: 'Loading...',
        success: (data: any) => {
          return `${data?.message}`;
        },
        error: (data: any) => {
          return `${data?.message}`;
        }
      });
    },
    incrementQty: (state, action: PayloadAction<string>) => {
      const item = state.products.find(
        (product) => product.id === action.payload
      );
      if (item) {
        if (item.qty < item.maxStock || item.withStock === false) {
          item.qty += 1;
          saveItemsToLocalStorage(state.products);

          const promise = () =>
            new Promise((resolve) =>
              setTimeout(
                () => resolve({ message: 'Item added successfully' }),
                600
              )
            );

          toast.promise(promise, {
            loading: 'Loading...',
            success: (data: any) => `${data?.message}`,
            error: (data: any) => `${data?.message}`
          });
        } else {
          const promise = () =>
            new Promise((resolve, error) =>
              setTimeout(() => error({ message: 'Out of stock' }), 600)
            );

          toast.promise(promise, {
            loading: 'Loading...',
            success: (data: any) => `${data?.message}`,
            error: (data: any) => `${data?.message}`
          });
        }
      }
    },
    decrementQty: (state, action: PayloadAction<string>) => {
      const item = state.products.find(
        (product) => product.id === action.payload
      );
      if (item && item.qty > 1) {
        item.qty -= 1;
        saveItemsToLocalStorage(state.products);
      } else {
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
        saveItemsToLocalStorage(state.products);

        const promise = () =>
          new Promise((resolve, error) =>
            setTimeout(
              () => error({ message: 'Item deleted successfully' }),
              600
            )
          );

        toast.promise(promise, {
          loading: 'Loading...',
          success: (data: any) => `${data?.message}`,
          error: (data: any) => `${data?.message}`
        });
      }
    },
    removeAllProductFromOrderLine: (state) => {
      state.products = [];
      saveItemsToLocalStorage(state.products);
    }
  }
});

export const {
  addProductToOrderLine,
  removeProductFromOrderLine,
  incrementQty,
  decrementQty,
  removeAllProductFromOrderLine
} = pointOfSale.actions;
export default pointOfSale.reducer;
