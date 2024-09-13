import { GetCartQuery } from '../../__generated__/types';
import { Cart as CartModel } from '../models';

type Cart = NonNullable<GetCartQuery['cart']>;
declare const transformCart: (cart: Cart) => CartModel;
export { Cart, transformCart };
//# sourceMappingURL=transform-cart.d.ts.map