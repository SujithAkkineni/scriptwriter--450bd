# Cook Next Door

A food ordering web application for home-cooked South Indian food. Users can order from neighbors or sell their own dishes.

## Features

- **Order Food**: Browse and order home-cooked South Indian dishes.
- **Sell Food**: List your dishes for sale with price and quantity.
- **Demo Data**: Pre-loaded with sample South Indian dishes.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Frontend**: Pug (Jade) templating
- **Styling**: CSS

## Local Setup

1. **Install Dependencies**:
   ```
   npm install
   ```

2. **Set up MongoDB**:
   - Install MongoDB locally or use a cloud service like MongoDB Atlas.
   - Update the connection string in `app.js` if needed.

3. **Seed Demo Data**:
   ```
   node seed.js
   ```

4. **Run the Application**:
   ```
   npm start
   ```
   - The app will run on `http://localhost:3000`.

## Deployment on Render.com

1. **Create a Render Account**: Sign up at [render.com](https://render.com).

2. **Connect Repository**: Connect your GitHub repository containing this project.

3. **Create a Web Service**:
   - Go to Dashboard > New > Web Service.
   - Select your repository.
   - Set the following:
     - **Name**: cooknextdoor
     - **Environment**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Plan**: Free (for testing)

4. **Environment Variables**:
   - Add `MONGODB_URI` with your MongoDB connection string (e.g., from MongoDB Atlas).

5. **Deploy**:
   - Render will build and deploy the app.
   - Access your app at the provided URL.

## Usage

- **Home Page**: Choose to Order or Sell.
- **Order Flow**: Select dish > Enter address > Payment > Success.
- **Sell Flow**: Fill dish details > Success.

## Demo Data

The app includes demo South Indian dishes like Idli Sambar, Dosa, Vada, etc., for testing.

## License

MIT License.
