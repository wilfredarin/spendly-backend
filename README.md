# Spendly Backend

Spendly is an expense tracker app that allows users to manage their expenses, view monthly summaries, track trends, and download expense reports. The app also supports authentication, profile management, and custom tags for expense categorization.

## Features

- User registration and login
- Profile management and tag customization
- Expense tracking with the ability to add, edit, and delete expenses
- Monthly expense summaries and trend analysis
- Downloadable PDF reports of expenses
- OTP-based password reset functionality

## Table of Contents

- [Installation](#installation)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Profile Management](#profile-management)
  - [Expense Management](#expense-management)
  - [Analytics](#analytics)
  - [File Downloads](#file-downloads)
  - [OTP for Password Reset](#otp-for-password-reset)
- [Usage](#usage)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/wilfredarin/spendly-backend.git
    cd spendly
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the root of your project and add the following:

    ```bash
    MONGO_URI=your_mongo_db_connection_string
    JWT_SECRET=your_secret_key
    JWT_SECRET=SECRET
    MAIL_USER=your_email_id
    MAIL_PASS=your_email_pass
    ```

4. Start the server:

    ```bash
    npm start
    ```

The server will start on `http://localhost:3000`.

## API Endpoints

### Authentication

#### 1. **Register**
   - **POST**: `/api/auth/register`
   - Description: Register a new user.
   - Request Body:
     ```json
     {
       "name": "user123",
       "email": "user@example.com",
       "password": "password123",
       "phone": "1234"
     }
     ```
   - Response: Success message with user info.

#### 2. **Login**
   - **POST**: `/api/auth/login`
   - Description: User login.
   - Request Body:
     ```json
     {
       "email": "user@example.com",
       "password": "password123"
     }
     ```
   - Response:  Response: Success message with user info with Authentication token (JWT) in cookies.

### Profile Management

#### 3. **View Profile**
   - **GET**: `/api/auth/profile`
   - Description: Get the user’s profile information.
   - Response: Profile details.

#### 4. **Update Profile**
   - **PUT**: `/api/auth/profile`
   - Description: Update the user’s profile Only these fields can be updated: "name","phone","password"
   - Request Body (example):
     ```json
     {
       "name": "newUsername",
       "email": "newemail@example.com"
     }
     ```

#### 5. **Add Custom Tags**
   - **PUT**: `/api/auth/add/tags`
   - Description: Add custom tags for expense categorization.
   - Request Body (example):
     ```json
     {
       "tags": ["vacation", "health", "groceries"]
     }
     ```
#### 6. **Remove Custom Tags**
   - **PUT**: `/api/auth/remove/tags`
   - Description: Remove tags from userTags.
   - Request Body (example):
     ```json
     {
       "tags": ["vacation", "health", "groceries"]
     }
     ```

### Expense Management

#### 7. **Add an Expense**
   - **POST**: `/api/expense`
   - Description: Add a new expense.
   - Request Body (example):
     ```json
     {
       "amount": 150,
       "comment": "Groceries",
       "tags": ["family", "groceries"]
     }
     ```

#### 8. **Get Monthly Expenses**
   - **GET**: `/api/expense?month="YYYY-MM-DD"`
   - Description: Get a list of expenses for a specific month.
   - Example: `/api/expense?month="2024-10-01"`

#### 9. **Edit an Expense**
   - **PUT**: `/api/expense/:expense_id`
   - Description: Edit an existing expense by ID.

#### 10. **Delete an Expense**
   - **DELETE**: `/api/expense/:expense_id`
   - Description: Delete an expense by ID.

### Analytics

#### 11. **Monthly Summary**
   - **GET**: `/api/analytics/summary/?month="YYYY-MM-DD"`
   - Description: Get the total expense summary for a specific month.

#### 12. **Expense Trends**
   - **GET**: `/api/analytics/trends`
   - Description: Get expense trends over time.

### File Downloads

#### 13. **Download Monthly Expense Report**
   - **GET**: `/api/download/trends`
   - Description: Download a PDF report for a specific month’s expenses.

### OTP for Password Reset

#### 14. **Request Password Reset OTP**
   - **POST**: `/api/otp/reset-password`
   - Description: Request an OTP for resetting the password.
   - Request Body:
     ```json
     {
       "email": "user@example.com"
     }
     ```

#### 15. **Verify OTP**
   - **POST**: `/api/otp/verify-otp`
   - Description: Verify the OTP and reset the password.
   - Request Body:
     ```json
     {
       "otp": "123456",
       "newPassword": "newPassword123"
     }
     ```

## Usage

1. Register a new user with `/api/auth/register`.
2. Login using `/api/auth/login` to obtain a JWT token in cookies.
3. Use the above APIs
