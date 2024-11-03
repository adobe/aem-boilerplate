"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSummarySkeleton = exports.OrderProductListSkeleton = exports.DetailsSkeleton = exports.CardLoader = void 0;
const components_1 = require("@adobe/elsie/components");
require("@/order/components/OrderLoaders/OrderLoaders.css");
const lib_1 = require("@adobe/elsie/lib");
const CardLoader = ({ testId, withCard = true, }) => {
    const defaultSkeleton = (<components_1.Skeleton data-testid={testId ?? 'skeletonLoader'}>
      <components_1.SkeletonRow variant="heading" size="xlarge" fullWidth={false} lines={1}/>
      <components_1.SkeletonRow variant="heading" size="xlarge" fullWidth={true} lines={1}/>
      <components_1.SkeletonRow variant="heading" size="xlarge" fullWidth={true} lines={1}/>
    </components_1.Skeleton>);
    if (withCard) {
        return defaultSkeleton;
    }
    return (<components_1.Card variant="secondary" className={(0, lib_1.classes)([
            'order-order-loaders',
            'order-order-loaders--card-loader',
        ])}>
      {defaultSkeleton}
    </components_1.Card>);
};
exports.CardLoader = CardLoader;
const DetailsSkeleton = (props) => {
    return (<components_1.Card variant={'secondary'} {...props}>
      <components_1.Skeleton data-testid="order-details-skeleton">
        <components_1.SkeletonRow variant={'heading'} size="medium" fullWidth={true}/>
        <components_1.SkeletonRow size="medium"/>
        <components_1.SkeletonRow variant={'empty'} size="medium"/>
        <components_1.SkeletonRow size="xlarge"/>
        <components_1.SkeletonRow size="xlarge"/>
        <components_1.SkeletonRow size="xlarge"/>
        <components_1.SkeletonRow size="xlarge"/>
      </components_1.Skeleton>
    </components_1.Card>);
};
exports.DetailsSkeleton = DetailsSkeleton;
const OrderProductListSkeleton = () => {
    return (<components_1.Skeleton data-testid="order-product-list-skeleton" style={{ gridTemplateColumns: '1fr' }}>
      <components_1.SkeletonRow variant="heading" fullWidth={true} size="medium"/>
      <components_1.CartItemSkeleton />
      <components_1.CartItemSkeleton />
      <components_1.CartItemSkeleton />
      <components_1.CartItemSkeleton />
      <components_1.CartItemSkeleton />
    </components_1.Skeleton>);
};
exports.OrderProductListSkeleton = OrderProductListSkeleton;
const OrderSummarySkeleton = () => {
    return (<components_1.Skeleton data-testid="order-cost-summary-content-skeleton" className={'order-cost-summary-content'}>
      <components_1.SkeletonRow variant="heading" size="small"/>
      <components_1.SkeletonRow variant="empty" size="small"/>
      <components_1.SkeletonRow variant="empty" size="small"/>
      <components_1.SkeletonRow variant="empty" size="small"/>
      <components_1.SkeletonRow variant="heading" size="small" fullWidth={true} lines={3}/>
    </components_1.Skeleton>);
};
exports.OrderSummarySkeleton = OrderSummarySkeleton;
