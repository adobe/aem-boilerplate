await import('./ajv2020.min.js');
const { default: AcdlValidator } = await import('./validator.min.js');

const validator = new AcdlValidator();

// Add schemas
const schemas = [
    'pageContext',
    'page-view',
    'productContext',
    'categoryContext',
    'product-page-view',
    'recommendationsContext',
    'recs-api-request-sent',
    'recs-api-response-received',
    'recs-item-click',
    'recs-unit-impression-render',
    'recs-unit-view',
    'storefrontInstanceContext',
    'eventForwardingContext',
];
(await Promise.all(
    schemas.map(async schema => {
        const response = await fetch(`/scripts/acdl/schemas/${schema}.json`);
        return [await response.json(), schema];
    })
)).forEach(([schemaJson, schema]) => validator.addSchema(schemaJson, schema));

validator.start();