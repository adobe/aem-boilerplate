# Header Block

## Overview

The Header block provides the main navigation and commerce functionality for the site. It includes responsive navigation with dropdown menus, authentication (sign in/sign out), wishlist access, mini cart with lazy loading, and product search with live results. The block handles both desktop and mobile layouts with hamburger menu support and manages various interactive panels.

## Integration

### Block Configuration

No block configuration is read via `readBlockConfig()`. The header uses metadata tags for fragment paths.

### URL Parameters

No URL parameters are directly read by the header block.

### Local Storage

No localStorage keys are used directly by this block. Authentication and cart state are managed through cookies and the event bus.

### Events

#### Event Listeners

- `events.on('cart/data', callback)` - Updates cart item counter and preloads mini cart fragment when cart data changes (eager loading enabled)
- `events.on('authenticated', callback)` - Handled in `renderAuthCombine.js` and `renderAuthDropdown.js` for authentication state changes

#### Event Emitters

No events are directly emitted by this block. However, it triggers events indirectly through imported modules:
- Mini cart triggers `publishShoppingCartViewEvent()` when opened
- Search triggers product discovery events through the search dropin

### Metadata

The block reads the following metadata tags:

- `nav` - Path to navigation fragment (default: `/nav`)
- `wishlist` - Path to wishlist page (default: `/wishlist`)
- `mini-cart` - Path to mini cart fragment (default: `/mini-cart`)

## Behavior Patterns

### Page Context Detection

- **Desktop Mode**: Navigation with hover-triggered dropdowns, overlay background for open sections
- **Mobile Mode**: Hamburger menu with click-triggered navigation, full-screen overlay when menu is open
- **Checkout Pages**: Mini cart button is hidden on `/checkout` path

### Navigation Structure

The header creates three main sections from the nav fragment:
1. **Brand Section**: Logo and brand link
2. **Navigation Sections**: Main menu with dropdown support and submenu structure
3. **Tools Section**: Wishlist, mini cart, search, and authentication controls

### User Interaction Flows

#### Navigation
1. **Desktop**: Users hover over navigation items to reveal dropdowns with overlay background
2. **Mobile**: Users tap hamburger menu to open full navigation, tap categories to reveal submenus
3. **Keyboard Navigation**: Full keyboard support with Tab, Enter, Space, and Escape keys
4. **Focus Management**: Automatic focus handling and focus trap when dropdowns are open

#### Wishlist
1. Users click wishlist button to navigate to wishlist page
2. Button is always visible in the tools section

#### Mini Cart
1. **Lazy Loading**: Mini cart fragment loads on first interaction or when cart contains items
2. **Cart Counter**: Displays total quantity badge when items are in cart
3. **Panel Toggle**: Click cart button to open/close mini cart panel
4. **Auto-preload**: If cart data exists, mini cart fragment preloads automatically
5. **Analytics**: Publishes shopping cart view event when opened

#### Search
1. **Lazy Loading**: Search functionality loads on first click
2. **Live Search**: Shows results after typing 3 characters with 4 results displayed
3. **Product Links**: Each result links to product detail page
4. **View All**: Footer button links to full search results page
5. **Form Submit**: Enter key navigates to search results page
6. **Panel Close**: Click outside or Escape key closes search panel

#### Authentication
1. **Sign In Flow**: 
   - Unauthenticated users see sign-in form in dropdown
   - Modal option available via `renderAuthCombine` for mobile
   - On successful login, page automatically reloads to ensure all components reflect the authenticated state
2. **Sign Out Flow**:
   - Authenticated users see account menu with logout button
   - Logout revokes token asynchronously, then either redirects to a specific page or reloads the current page
   - Special redirects on logout: checkout → cart, customer pages → login, order details → home
   - All other pages simply reload to reflect the logged-out state
3. **User Display**: Dropdown shows "Hi, {firstname}" for authenticated users

### State Management

#### Panel Loading States
- Panels use `data-loaded`, `data-loading`, and `data-pending-toggle` attributes
- Loading indicator shows via `aria-busy` attribute on buttons
- Pending toggles queue up during loading and execute after completion

#### Responsive Behavior
- Media query breakpoint at 900px switches between desktop and mobile modes
- Window resize resets navigation state and removes active classes
- Overlay visibility managed based on navigation state and viewport size

### Error Handling

- **Fragment Loading**: If nav fragment fails to load, block handles gracefully
- **Metadata Fallbacks**: Uses default paths when metadata is not specified
- **Panel Loading Errors**: Caught in withLoadingState wrapper, sets loading state to false
- **Image Rendering**: Delegates to AEM Assets image rendering with fallback support
- **Search Errors**: Handled by product discovery dropin container
- **Network Failures**: Authentication and cart operations handle network errors through dropins

## Files

- `header.js` - Main block logic, navigation setup, and tool integrations
- `header.css` - Styles for navigation, panels, and responsive layouts
- `renderAuthCombine.js` - Authentication modal for mobile with sign in/sign up/reset password forms
- `renderAuthDropdown.js` - Authentication dropdown for desktop with sign in form and user menu

