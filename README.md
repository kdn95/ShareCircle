# 🌍 Share Circle

**Share Circle** is a community-driven platform that facilitates sharing and renting items within local neighborhoods. Whether you have extra tools, furniture, or gadgets lying around, Share Circle connects you with your neighbors, fostering a sharing economy and helping you save money while reducing waste.

## 🛠 Features

- **Borrow & Lend**: Easily lend or borrow items from your neighbors.
- **User Profiles**: Manage your profile and track your borrowing and lending activity.
- **Item Categories**: Browse items based on categories like electronics, tools, household, and more.
- **Location-Based Search**: Find items available near your location.
- **Secure Transactions**: Make secure payments via Stripe. 
- **Communcation**: Communicate with your neighbours to arrange item handovers.

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **[Node.js](https://nodejs.org/en/)** (v14+)
- **[PostgreSQL](https://www.postgresql.org/)** (for database)
- **[Docker](https://www.docker.com/)** (optional, for containerized deployment)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/share-circle.git
   cd share-circle
   ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:

    Create a .env file and include the following:

    ```bash
    DATABASE_URL=postgresql://user:password@localhost:5432/sharecircle
    PORT=3000
    ```

4. Start the PostgreSQL database:

    Make sure PostgreSQL is running, and the database is set up. You can create the database using:

      ```bash
      createdb sharecircle
      ```

5. Start the application:

    ```bash
    npm start
    ```

6. Visit the app in your browser:

    ```bash
    http://localhost:3000
    ```

### Running with Docker

If you prefer using Docker for deployment, follow these steps:

1. Build the Docker image:

    ```bash
    docker build -t sharecircle .
    ```

2. Run the Docker container:

    ```bash
    docker run -d -p 3000:3000 --name sharecircle sharecircle
    ```


## 🧑‍💻 Technologies Used
- **Frontend:** React.js, SCSS
- **Backend:** Node.js, Express.js, JWT
- **Database:** PostgreSQL
- **Containerization:** Docker

## 📖 Documentation
- For detailed API documentation, visit the API Docs.
- User guides and tutorials are available in our Wiki.

## 🛡 Security & Privacy
We value the privacy and security of our users. Share Circle follows industry-standard security practices to protect user data and communications. For more information, please refer to our Privacy Policy.

## 📬 Contact
Have any questions or suggestions? Reach out to us at support@sharecircle.com or open an issue on GitHub.
