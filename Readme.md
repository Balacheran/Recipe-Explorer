# Recipe-Explorer Backend

This is the backend server for the Recipe-Explorer application. It provides APIs to manage recipes, including creating, reading, updating, and deleting recipes. It also handles user authentication and image uploads.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer (for handling file uploads)
- JWT (JSON Web Tokens for authentication)

## Getting Started

### Prerequisites

- Node.js
- MongoDB (either local or a cloud database like MongoDB Atlas)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/Balacheran/Recipe-Explorer.git
   cd Recipe-Explorer/backend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:

   ```sh
   npm run dev
   ```

   The server will start on `http://localhost:5000`.

### API Endpoints

#### Recipes

- **GET /recipes**: Get all recipes
- **GET /recipes/:id**: Get a single recipe by ID
- **POST /recipes**: Create a new recipe (authentication required)
- **PUT /recipes/:id**: Update a recipe by ID (authentication required)
- **DELETE /recipes/:id**: Delete a recipe by ID (authentication required)

#### Auth

- **POST /auth/register**: Register a new user
- **POST /auth/login**: Login a user

## Folder Structure

```
recipe-explorer-backend
├── controllers
│   ├── authController.js
│   ├── recipeController.js
├── models
│   ├── Recipe.js
│   ├── User.js
├── routes
│   ├── authRoutes.js
│   ├── recipeRoutes.js
├── middlewares
│   ├── authMiddleware.js
│   ├── uploadMiddleware.js
├── .env
├── app.js
├── server.js
```

## Contributing

Feel free to contribute by opening an issue or submitting a pull request.

## License

This project is licensed under the MIT License.

### Frontend README

```markdown
# Recipe-Explorer Frontend

This is the frontend application for the Recipe-Explorer project. It allows users to view, add, edit, and delete recipes. Users can also register and log in to manage their recipes.

## Tech Stack

- React
- React Router
- Axios (for making HTTP requests)
- React Toastify (for notifications)
- Cropper.js (for image cropping)

## Getting Started

### Prerequisites

- Node.js

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/Balacheran/Recipe-Explorer.git
   cd Recipe-Explorer/frontend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

    ```sh
   npm start
   ```
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```


4. Start the development server:

   ```sh
   npm start
   ```

   The application will start on `http://localhost:3000`.

### Folder Structure

```
recipe-explorer-frontend
├── public
│   ├── index.html
├── src
│   ├── components
│   │   ├── RecipeCard.js
│   │   ├── ImageCropper.js
│   │   ├── ItemDetail.js   //partial complete
│   │   ├── AddRecipePage.js
│   ├── pages
│   │   ├── Dashboard.js
│   ├── App.js
│   ├── index.js
│   ├── App.css
│   ├── RecipeCard.css
│   ├── ItemDetail.css
├── .env
```

## Components

- **RecipeCard**: Displays a summary of a recipe with an option to view details.
- **ImageCropper**: Handles image cropping before upload.
- **ItemDetail**: Displays detailed information about a recipe.
- **AddRecipePage**: Form to add a new recipe.

## Features

- View all recipes
- View recipe details (partially completed)
- Add new recipes
- Edit existing recipes
- Delete recipes
- User registration and login
- Image upload (upload image in 1:1 ratio)

## Contributing

Feel free to contribute by opening an issue or submitting a pull request.

## License

This project is licensed under the MIT License.
