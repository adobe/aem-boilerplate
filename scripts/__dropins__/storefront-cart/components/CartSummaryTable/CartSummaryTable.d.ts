import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

/**
 * Represents a single row entry in the cart summary table
 * Each field accepts a VNode to allow for flexible content rendering
 */
export interface CartTableEntry {
    /** The item UID */
    uid: string;
    /** Whether the item is updating */
    updating: boolean;
    /** Whether the item has an update error */
    hasError: boolean;
    /** The product details section (typically includes image, name, and options) */
    item: VNode;
    /** The unit price of the product */
    price: VNode;
    /** The quantity selector/display */
    quantity: VNode;
    /** The total price for this line item */
    subtotal: VNode;
    /** Actions bar on the bottom of the row */
    actions: VNode;
    /** Optional undo banner for removed items */
    undoBanner?: VNode;
}
/**
 * Props for the CartSummaryTable component
 */
export interface CartSummaryTableProps extends HTMLAttributes<HTMLDivElement> {
    /** Array of cart entries to display in the table */
    entries: CartTableEntry[];
    /** Optional CSS class name for custom styling */
    className?: string;
}
/**
 * CartSummaryTable component displays cart items in a responsive grid layout
 * - Uses CSS Grid for layout with 4 columns on desktop
 * - Switches to a stacked single-column layout on mobile with labeled sections
 * - Renders each entry's content using VComponent for proper component handling
 */
export declare const CartSummaryTable: FunctionComponent<CartSummaryTableProps>;
//# sourceMappingURL=CartSummaryTable.d.ts.map