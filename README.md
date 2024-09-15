# assessment
## Project Overview: Web and Mobile Application Integration with Fake Store API

This project involves the development of a comprehensive web and mobile application that seamlessly interacts with the Fake Store API (fakestoreapi.com). The primary objective is to create a user-friendly platform that allows users to browse, search, and purchase products from a simulated online store.
Current State of the Projects:

- Web Application: Fully implements all functional requirements, providing a complete shopping experience.
- Mobile Application: [Details to be added or completed.]

Key Features:

- User Authentication:
        Implement secure user registration and login functionalities to ensure a personalized shopping experience.

- Product Browsing:
        Users can explore a wide range of products, categorized for easy navigation. Each product will display essential details such as name, price, description, and an image.

- Search Functionality:
        A robust search feature will enable users to quickly find specific products by entering keywords or filtering by categories.

- Shopping Cart:
        Users can add products to a shopping cart, view their selections, and modify quantities before proceeding to checkout.

- Checkout Process:
        A streamlined checkout process will guide users through order confirmation, payment options, and order summary.

- Responsive Design:
        The web application will be designed to be fully responsive, ensuring an optimal user experience across various devices, including desktops, tablets, and smartphones.

- Mobile Application:
        The mobile application will mirror the functionality of the web version, providing users with a convenient shopping experience on the go.

- API Integration:
        The application will utilize the Fake Store API to fetch real-time product data, ensuring that users have access to the latest inventory and pricing.

- User Reviews and Ratings:
        Users will have the option to leave reviews and ratings for products, fostering a community-driven feedback system.

- Notifications:
        Implement push notifications to keep users informed about order updates, promotions, and new product arrivals.

## Setting Up the Projects on Your Local Machine

To get started with the project locally, follow these steps:

0. Install pnpm:
```shell
npm install -g pnpm
```

1. Clone the GitHub Repository:
    First, clone the repository and navigate into the project directory:

```shell
git clone https://github.com/aymenhta/assessment.git
cd assessment
```

2. Setting Up the Web Application:
Navigate to the web application directory and create a new environment file:

```shell
cd web/
touch .env.local
```

Inside the newly created .env.local file, provide the following environment variables:

```text
NEXTAUTH_SECRET=zW7ubDdqiAY5XcLkYlOnJP9+wQ1+GxrYV3xHQAD6os0=
NEXTAUTH_URL=http://localhost:3000

GITHUB_ID=
GITHUB_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

BASE_URL=https://fakestoreapi.com

WEBSITE_URL=http://localhost:3000
```

Build and Run the Application:
Finally, build and start the web application using the following commands:

```shell
pnpm build
pnpm start
```
