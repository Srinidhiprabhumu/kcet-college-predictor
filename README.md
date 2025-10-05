# KCET College Predictor & Counselling Assistant

This project is a web-based dashboard designed to help students who have appeared for the Karnataka Common Entrance Test (KCET). It provides a college prediction tool based on their rank and offers detailed information about the KCET counselling process. The application also features an interactive chatbot to answer student queries.

live link : https://kcetcollegepredictor.netlify.app/

## Features

*   **College Prediction:** Predicts potential colleges and branches based on the user's KCET rank.
*   **Interactive Dashboard:** Visualizes cutoff ranks and seat matrix data using interactive charts.
*   **Counselling Process Guide:** A dedicated section explaining the step-by-step KCET counselling procedure.
*   **AI-Powered Chatbot:** An integrated chatbot, powered by Google's Gemini AI, to answer user questions about colleges, courses, and the admission process.
*   **Responsive Design:** A clean and modern user interface built with Tailwind CSS, ensuring a seamless experience across all devices.

## Tech Stack

*   **Frontend:** React, TypeScript, Vite
*   **Styling:** Tailwind CSS
*   **Routing:** React Router DOM
*   **Data Fetching & State Management:** React Query
*   **Data Visualization:** Recharts
*   **AI Integration:** Google Generative AI
*   **CSV Parsing:** Papaparse
*   **Icons:** Lucide React

## Project Structure

The project is structured as follows:

```
.
├── public/
│   └── data/
│       ├── kcet_data.csv       # Historical KCET cutoff data
│       └── seat_matrix.csv     # Seat matrix information
├── src/
│   ├── components/             # Reusable React components
│   │   ├── Chatbot.tsx
│   │   ├── CounsellingProcess.tsx
│   │   ├── Dashboard.tsx
│   │   └── PredictionForm.tsx
│   ├── services/               # Services, like the Gemini AI integration
│   │   └── gemini.ts
│   ├── App.tsx                 # Main application component with routing
│   ├── Home.tsx                # Home page component
│   └── main.tsx                # Application entry point
├── package.json                # Project dependencies and scripts
└── README.md                   # This file
```

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js (v18 or later)
*   npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/kcet-prediction-dashboard.git
    cd kcet-prediction-dashboard
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your Google Gemini API key:
    ```
    VITE_GEMINI_API_KEY=your_api_key_here
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## Usage

1.  Navigate to the home page to use the college predictor.
2.  Enter your KCET rank and select your category to see the predicted colleges.
3.  Explore the dashboard to view visualizations of the cutoff data.
4.  Visit the "Counselling Process" page for a detailed guide.
5.  Use the chatbot icon at the bottom right to ask any questions.