A full-stack application integrating OpenAI's ChatGPT API and Meta's Graph API to provide a seamless user experience.

🚀 Getting Started
Prerequisites
Node.js and npm installed on your machine.

OpenAI API Key.

Meta Graph API Access Token.

Installation
Clone the Repository:

git clone https://github.com/yourusername/chatgpt-meta-dashboard.git
cd chatgpt-meta-dashboard
Setup Backend:

cd backend
npm install
Environment Variables: Create a .env file in the backend directory and add:

env

OPENAI_API_KEY=your_openai_api_key
META_ACCESS_TOKEN=your_meta_access_token
Setup Frontend:

cd ../frontend
npm install
Run the Application:

npm start
The application will be accessible at http://localhost:3000.

Backend:

cd backend
npm start
Frontend:

Security Notice
API Keys Confidentiality: For security reasons, API keys for OpenAI and Meta are not included in this repository. Ensure you create a .env file in the backend directory with your own API keys. Do not expose these keys in the frontend or commit them to version control.
