#!/bin/bash

# Colors for better output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to display the menu
show_menu() {
    echo ""
    echo -e "${BLUE}=== AEM Localhost Server + Cypress Test Runner ===${NC}"
    echo ""
    echo "Please select which configuration to launch:"
    echo ""
    echo -e "${GREEN}1)${NC} B2C PaaS Configuration (localhost + cypress:open)"
    echo -e "${GREEN}2)${NC} B2C SaaS Configuration (localhost + cypress:saas:open)"
    echo -e "${GREEN}3)${NC} B2B PaaS Configuration (localhost + cypress:b2b:open)"
    echo -e "${GREEN}4)${NC} B2B SaaS Configuration (localhost + cypress:b2b:saas:open)"
    echo -e "${RED}5)${NC} Exit"
    echo ""
}

# Function to run the selected option
run_configuration() {
    # Get the root directory (parent of cypress directory)
    ROOT_DIR="$(dirname "$(pwd)")"
    
    case $1 in
        1)
            echo -e "${YELLOW}Starting AEM localhost with PaaS configuration...${NC}"
            echo -e "${BLUE}URL: https://main--boilerplate-paas--adobe-commerce.aem.live${NC}"
            
            # Start AEM localhost server in background
            cd "$ROOT_DIR" && npx aem up --url https://main--boilerplate-paas--adobe-commerce.aem.live &
            AEM_PID=$!
            
            echo -e "${GREEN}AEM localhost server started (PID: $AEM_PID)${NC}"
            echo -e "${YELLOW}Waiting a moment for server to initialize...${NC}"
            sleep 3
            
            # Return to cypress directory and run cypress
            cd "$ROOT_DIR/cypress"
            echo -e "${YELLOW}Opening Cypress with PaaS configuration...${NC}"
            npm run cypress:open
            
            # After Cypress closes, remind user about the background server
            echo ""
            echo -e "${BLUE}Note: AEM localhost server (PID: $AEM_PID) is still running in the background.${NC}"
            echo -e "${BLUE}To stop it, run: kill $AEM_PID${NC}"
            ;;
        2)
            echo -e "${YELLOW}Starting AEM localhost with SaaS configuration...${NC}"
            echo -e "${BLUE}URL: https://main--boilerplate-accs--adobe-commerce.aem.live${NC}"
            
            # Start AEM localhost server in background
            cd "$ROOT_DIR" && npx aem up --url https://main--boilerplate-accs--adobe-commerce.aem.live &
            AEM_PID=$!
            
            echo -e "${GREEN}AEM localhost server started (PID: $AEM_PID)${NC}"
            echo -e "${YELLOW}Waiting a moment for server to initialize...${NC}"
            sleep 3
            
            # Return to cypress directory and run cypress
            cd "$ROOT_DIR/cypress"
            echo -e "${YELLOW}Opening Cypress with SaaS configuration...${NC}"
            npm run cypress:saas:open
            
            # After Cypress closes, remind user about the background server
            echo ""
            echo -e "${BLUE}Note: AEM localhost server (PID: $AEM_PID) is still running in the background.${NC}"
            echo -e "${BLUE}To stop it, run: kill $AEM_PID${NC}"
            ;;
        3)
            echo -e "${YELLOW}Starting AEM localhost with B2B PaaS configuration...${NC}"
            echo -e "${BLUE}URL: https://main--boilerplate-b2b-paas--adobe-commerce.aem.live${NC}"
            
            # Start AEM localhost server in background
            cd "$ROOT_DIR" && npx aem up --url https://main--boilerplate-b2b-paas--adobe-commerce.aem.live &
            AEM_PID=$!
            
            echo -e "${GREEN}AEM localhost server started (PID: $AEM_PID)${NC}"
            echo -e "${YELLOW}Waiting a moment for server to initialize...${NC}"
            sleep 3
            
            # Return to cypress directory and run cypress
            cd "$ROOT_DIR/cypress"
            echo -e "${YELLOW}Opening Cypress with B2B PaaS configuration...${NC}"
            npm run cypress:b2b:open
            
            # After Cypress closes, remind user about the background server
            echo ""
            echo -e "${BLUE}Note: AEM localhost server (PID: $AEM_PID) is still running in the background.${NC}"
            echo -e "${BLUE}To stop it, run: kill $AEM_PID${NC}"
            ;;
        4)
            echo -e "${YELLOW}Starting AEM localhost with B2B SaaS configuration...${NC}"
            echo -e "${BLUE}URL: https://main--boilerplate-b2b-accs--adobe-commerce.aem.live${NC}"
            
            # Start AEM localhost server in background
            cd "$ROOT_DIR" && npx aem up --url https://main--boilerplate-b2b-accs--adobe-commerce.aem.live &
            AEM_PID=$!
            
            echo -e "${GREEN}AEM localhost server started (PID: $AEM_PID)${NC}"
            echo -e "${YELLOW}Waiting a moment for server to initialize...${NC}"
            sleep 3
            
            # Return to cypress directory and run cypress
            cd "$ROOT_DIR/cypress"
            echo -e "${YELLOW}Opening Cypress with B2B SaaS configuration...${NC}"
            npm run cypress:b2b:saas:open
            
            # After Cypress closes, remind user about the background server
            echo ""
            echo -e "${BLUE}Note: AEM localhost server (PID: $AEM_PID) is still running in the background.${NC}"
            echo -e "${BLUE}To stop it, run: kill $AEM_PID${NC}"
            ;;
        5)
            echo -e "${YELLOW}Exiting...${NC}"
            exit 0
            ;;
        *)
            echo -e "${RED}Invalid option. Please select 1, 2, 3, 4, or 5.${NC}"
            return 1
            ;;
    esac
}

# Main script execution
main() {
    # Check if we're in the cypress directory
    if [ ! -f "package.json" ] || [ "$(basename "$(pwd)")" != "cypress" ]; then
        echo -e "${RED}Error: Please run this script from the cypress directory.${NC}"
        exit 1
    fi

    # Get the root directory and check if it exists
    ROOT_DIR="$(dirname "$(pwd)")"
    if [ ! -d "$ROOT_DIR" ]; then
        echo -e "${RED}Error: Cannot find root directory.${NC}"
        exit 1
    fi

    # Check if npx and npm are available
    if ! command -v npx &> /dev/null; then
        echo -e "${RED}Error: npx is not installed or not in PATH.${NC}"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        echo -e "${RED}Error: npm is not installed or not in PATH.${NC}"
        exit 1
    fi

    # Display current and target directories
    echo -e "${BLUE}Current directory:${NC} $(pwd)"
    echo -e "${BLUE}Root directory:${NC} $ROOT_DIR"

    while true; do
        show_menu
        read -p "Enter your choice (1-5): " choice
        
        if run_configuration "$choice"; then
            break
        fi
        
        echo ""
        read -p "Press Enter to continue..."
    done
}

# Run the main function
main
