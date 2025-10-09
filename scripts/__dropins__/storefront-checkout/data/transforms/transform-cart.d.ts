import { Cart as CartModel } from '../models';
import { GetCartQuery } from '../../__generated__/types';

type Cart = GetCartQuery['cart'];
declare const transformCart: (data: Cart) => CartModel | undefined;
export { Cart, transformCart };
//# sourceMappingURL=transform-cart.d.ts.map