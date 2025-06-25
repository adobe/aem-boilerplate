import { GetCartQuery } from '../../__generated__/types';
import { Cart as CartModel } from '../models';

type Cart = GetCartQuery['cart'];
declare const transformCart: (data: Cart) => CartModel | undefined;
export { Cart, transformCart };
//# sourceMappingURL=transform-cart.d.ts.map