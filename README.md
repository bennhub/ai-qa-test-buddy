# AI QA Test Buddy

## Description

**AI QA Test Buddy** aka Test Botter --  is a tool I designed to assist in generating test cases using AI. It leverages custom prompts to generate common test cases or get it to come up with some out of the box scenarios for your features - this is for helping quality assurance engineers streamline their testing processes. More features are coming soon to further enhance the capabilities of this tool. I don't want this to just be a test case generator, it will contain more AI-QA related features. 

I created this tool utilizing Google Gemini AI Modal - to help with testing, providing an AI bot that you can reach out to for assistance whenever needed.


![](https://raw.githubusercontent.com/bennhub/ai-qa-test-buddy/99939c11be3f53e02727fe7bc3223a7737f01402/ai_bot_testcase_3.gif)


## Features

- Generate common test cases using custom prompts
- User-friendly interface for interacting with the AI
- Efficient and quick test case generation
- More features coming soon...


## Installation and Setup

1. **Clone the Repository**
```bash
git clone [repository-url]
```

2. **Install Dependencies**
Navigate to the project directory and install the required dependencies:

3. **Install Required Libraries**
Install Google Generative AI and markdown-it libraries:
```bash
npm install @google/generative-ai markdown-it
```

4. **Environment Variables**
Set up the `.env` file with your Google Generative AI API Key:
```bash
VITE_API_KEY=your_api_key_here
```

5. **Run the Application**
Start the application locally:
```bash
npm run dev
```

6. **Open in Browser**
The AI-buddy will be available at `http://localhost:3000` (default URL).

## Usage

- Enter custom test case prompts in the json testcase file.
- If you want, give your AI a personality that you enjoy talking to (this is the fun part)
- Click on the generate test case button for the bot to come up with some interesting test cases scenarios.

