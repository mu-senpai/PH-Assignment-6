# Peddy - Pet Adoption Platform

Peddy is a modern, responsive web application for pet adoption that allows users to browse, filter, and adopt pets dynamically. It includes features like sorting by price, viewing detailed pet information, and liking favorite pets. The platform leverages external APIs for real-time data and ensures a seamless user experience through a clean and responsive design.

## Features

- **Dynamic Pet Listings**: Fetches and displays pet data dynamically from APIs, categorized by pet types (e.g., dog, cat, rabbit).
- **Sorting by Price**: Users can sort pets by price in descending order.
- **Like and Adopt Pets**:
  - Mark pets as favorites with a "Like" button.
  - Initiate the adoption process with a countdown and confirmation.
- **Detailed Pet Information**: View pet details such as breed, birth date, gender, vaccination status, and more via a modal.
- **Responsive Design**: Optimized for desktop, tablet, and mobile screens.
- **Error Handling**: Displays placeholders or meaningful messages for missing data.

## Technologies Used

- **Frontend**: HTML5, Tailwind CSS, DaisyUI
- **JavaScript**: ES6+ for dynamic interactivity and API integration
- **APIs**: External APIs for fetching pet-related data

## Key APIs

1. **Fetch All Pets**
   - **Endpoint**: `https://openapi.programming-hero.com/api/peddy/pets`
   - Retrieves a list of all pets with basic information.

2. **Fetch Pet Details by ID**
   - **Endpoint**: `https://openapi.programming-hero.com/api/peddy/pet/{pet-id}`
   - Fetches detailed information for a specific pet.

3. **Fetch All Categories**
   - **Endpoint**: `https://openapi.programming-hero.com/api/peddy/categories`
   - Retrieves all pet categories (e.g., dog, cat, rabbit).

4. **Fetch Pets by Category**
   - **Endpoint**: `https://openapi.programming-hero.com/api/peddy/category/{categoryName}`
   - Retrieves pets under a specific category.

## ES6 Features Utilized

- **Async/Await**: For fetching and handling API data.
- **Template Literals**: Used to dynamically create HTML content.
- **Arrow Functions**: For concise and readable function declarations.
- **Destructuring**: Simplifies access to object properties.
- **Array Methods**: Used methods like `forEach`, `map`, and `sort` for data manipulation.

## Project Structure

- `index.html`: Contains the main structure of the application, including the navbar, banner, and main sections.
- `script.js`: Implements core functionality such as API integration, pet listing, sorting, modals, and user interactions.
- `assets/`: Contains static assets like images, icons, and the logo.

## Deployment

A live version of the project is available here: **[Peddy - Live Demo](https://assignment-6-mu-senpai.netlify.app/)**

## How to Use

1. Open the platform and view the "Adopt Your Best Friend" section.
2. Browse pets by category or view all available pets.
3. Use the "Sort by Price" button to organize pets in descending order by price.
4. Click "Like" to add pets to your favorites.
5. Click "Adopt" to initiate the adoption process.
6. Click "Details" to view detailed information about a pet in a modal.