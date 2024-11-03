"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartSummaryItem = void 0;
const components_1 = require("@adobe/elsie/components");
const hooks_1 = require("preact/hooks");
const icons_1 = require("@adobe/elsie/icons");
const lib_1 = require("@adobe/elsie/lib");
const CartSummaryItem = ({ loading, product, itemType, taxConfig, translations, showConfigurableOptions, routeProductDetails, }) => {
    const { taxExcluded, taxIncluded } = taxConfig;
    const renderDefaultPrice = (0, hooks_1.useCallback)((amount, currency, configs) => {
        return (<components_1.Price amount={amount} currency={currency} weight="normal" {...configs}/>);
    }, []);
    let configPrice = {};
    const isCancelled = itemType === 'cancelled';
    const inStock = product?.product?.stockStatus?.includes('IN_STOCK');
    const giftCard = product?.giftCard || {};
    const priceIncludingTax = product?.itemPrices?.priceIncludingTax;
    const originalPrice = product?.itemPrices?.originalPrice;
    const price = product?.itemPrices?.price;
    const isDiscounted = product.discounted &&
        product.price?.value !== originalPrice?.value * product?.totalQuantity;
    const configurations = {
        ...('configurableOptions' in product ? product.configurableOptions : {}),
        ...('bundleOptions' in product ? product.bundleOptions : {}),
        ...('senderName' in giftCard && giftCard?.senderName
            ? { [translations.sender]: giftCard?.senderName }
            : {}),
        ...('senderEmail' in giftCard && giftCard?.senderEmail
            ? { [translations.sender]: giftCard?.senderEmail }
            : {}),
        ...('recipientName' in giftCard && giftCard?.recipientName
            ? { [translations.recipient]: giftCard?.recipientName }
            : {}),
        ...('recipientEmail' in giftCard && giftCard?.recipientEmail
            ? { [translations.recipient]: giftCard?.recipientEmail }
            : {}),
        ...('message' in giftCard && giftCard?.message
            ? { [translations.message]: giftCard?.message }
            : {}),
        ...('downloadableLinks' in product && product?.downloadableLinks
            ? {
                [`${product?.downloadableLinks?.count} ${translations.downloadableCount}`]: product?.downloadableLinks?.result,
            }
            : {}),
    };
    if (taxIncluded && taxExcluded) {
        const totalValue = isDiscounted
            ? originalPrice?.value
            : priceIncludingTax?.value * product?.totalQuantity;
        configPrice = {
            taxExcluded: true,
            taxIncluded: undefined,
            price: renderDefaultPrice(originalPrice?.value, originalPrice?.currency),
            total: (<>
          {renderDefaultPrice(totalValue, originalPrice?.currency, {
                    variant: product.discounted && priceIncludingTax?.value !== totalValue
                        ? 'strikethrough'
                        : 'default',
                })}

          {product.discounted && priceIncludingTax?.value !== totalValue
                    ? renderDefaultPrice(priceIncludingTax?.value, priceIncludingTax?.currency, { sale: true, weight: 'bold' })
                    : null}
        </>),
            totalExcludingTax: renderDefaultPrice(price?.value * product.totalQuantity, price?.currency),
        };
    }
    else if (!taxIncluded && taxExcluded) {
        configPrice = {
            taxExcluded: undefined,
            taxIncluded: undefined,
            price: renderDefaultPrice(originalPrice?.value, originalPrice?.currency),
            total: (<>
          {renderDefaultPrice(originalPrice?.value * product?.totalQuantity, priceIncludingTax?.currency, {
                    variant: isDiscounted ? 'strikethrough' : 'default',
                })}

          {isDiscounted
                    ? renderDefaultPrice(product.price?.value, product.price?.currency, {
                        sale: true,
                        weight: 'bold',
                    })
                    : null}
        </>),
            totalExcludingTax: renderDefaultPrice(price?.value * product?.totalQuantity, price?.currency),
        };
    }
    else if (taxIncluded && !taxExcluded) {
        const amount = isDiscounted
            ? originalPrice.value
            : priceIncludingTax.value * product.totalQuantity;
        configPrice = {
            taxExcluded: undefined,
            taxIncluded: true,
            price: renderDefaultPrice(priceIncludingTax?.value, priceIncludingTax?.currency),
            total: (<>
          {renderDefaultPrice(amount, priceIncludingTax?.currency, {
                    variant: isDiscounted ? 'strikethrough' : 'default',
                    weight: 'bold',
                })}

          {isDiscounted
                    ? renderDefaultPrice(priceIncludingTax?.value, priceIncludingTax?.currency, { sale: true, weight: 'bold' })
                    : null}
        </>),
        };
    }
    return (<components_1.CartItem loading={loading} alert={isCancelled && inStock ? (<span>
            <components_1.Icon source={icons_1.WarningWithCircle}/>
            {translations.outOfStock}
          </span>) : (<></>)} configurations={showConfigurableOptions?.(configurations) ?? configurations} title={routeProductDetails ? (<a data-testid="product-name" className={(0, lib_1.classes)([
                'cart-summary-item__title',
                ['cart-summary-item__title--strikethrough', isCancelled],
            ])} href={routeProductDetails(product)}>
            {product?.product?.name}
          </a>) : (<div data-testid="product-name" className={(0, lib_1.classes)([
                'cart-summary-item__title',
                ['cart-summary-item__title--strikethrough', isCancelled],
            ])}>
            {product?.product?.name}
          </div>)} sku={<div>{product?.product?.sku}</div>} quantity={product.totalQuantity} image={routeProductDetails ? (<a href={routeProductDetails(product)}>
            <components_1.Image src={product?.product?.thumbnail.url} alt={product?.product?.thumbnail.label} loading="lazy" width="90" height="120"/>
          </a>) : (<components_1.Image src={product?.product?.thumbnail.url} alt={product?.product?.thumbnail.label} loading="lazy" width="90" height="120"/>)} {...configPrice}/>);
};
exports.CartSummaryItem = CartSummaryItem;
