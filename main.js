import { GoogleGenerativeAI } from "@google/generative-ai";
import md from "markdown-it";

// Initialize the model
const genAI = new GoogleGenerativeAI(`${import.meta.env.VITE_API_KEY}`);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

let history = [];

// Function to send prompt to the AI model and get response
async function getResponse(userPrompt) {
  const personality = "You have the personality of the top quality assurance engineer in the world. Respond only in this style, don't respond as the assistant.";
  const fullPrompt = `${personality}\n\n${userPrompt}`;

  const chat = await model.startChat({ history: history });
  const result = await chat.sendMessage(fullPrompt);
  const response = await result.response;
  const text = response.text();

  console.log("AI response:", text); // Log the response text for debugging
  return text;
}

// User chat div
export const userDiv = (data) => {
  return `
  <!-- User Chat -->
  <div class="flex items-center gap-2 justify-start m-2">
    <img src="human.png" alt="user icon" class="w-10 h-10 rounded-full"/>
    <div class="bg-gemDeep text-black p-1 rounded-md shadow-md mx-2">${data}</div>
  </div>
  `;
};

// AI chat div
export const aiDiv = (data) => {
  return `
  <!-- AI Chat -->
  <div class="flex gap-2 justify-end m-2">
    <div class="bg-gemDeep text-black p-1 rounded-md shadow-md mx-2">${data}</div>
    <img src="bot.png" alt="bot icon" class="w-10 h-10 rounded-full"/>
  </div>
  `;
};

async function handleSubmit(event) {
  event.preventDefault();

  let userMessage = document.getElementById("prompt");
  const chatArea = document.getElementById("chat-container");

  const userPrompt = userMessage.value.trim();
  if (userPrompt === "") {
    return;
  }

  console.log("User message:", userPrompt);

  // Display user message in chat
  chatArea.innerHTML += userDiv(md().render(userPrompt));
  userMessage.value = "";

  try {
    // Get AI response
    const aiResponse = await getResponse(userPrompt);
    const md_text = md().render(aiResponse);
    
    // Display AI response in chat
    chatArea.innerHTML += aiDiv(md_text);

    // Store message history
    history.push({ role: "user", parts: userPrompt });
    history.push({ role: "model", parts: aiResponse });

    console.log("History:", history);
  } catch (error) {
    console.error("Error getting AI response:", error);
  }
}

const chatForm = document.getElementById("chat-form");
chatForm.addEventListener("submit", handleSubmit);

chatForm.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) handleSubmit(event);
});

// Get the elements
const chatbotPopup = document.getElementById('chatbot-popup');
const openChatbotButton = document.getElementById('open-chatbot');
const closeChatbotButton = document.getElementById('close-chatbot');

// Function to open the chatbot
const openChatbot = () => {
  chatbotPopup.style.display = 'block';
};

// Event to open the chatbot
openChatbotButton.addEventListener('click', openChatbot);

// Event to close the chatbot
closeChatbotButton.addEventListener('click', () => {
  chatbotPopup.style.display = 'none';
});

// Open the chatbot by default when the page loads
document.addEventListener("DOMContentLoaded", openChatbot);

// Function to load test cases from JSON file
async function loadTestCases() {
  try {
    const response = await fetch('/testCasePrompts.json'); // Adjust the path to your JSON file
    const data = await response.json();
    return data.testCases;
  } catch (error) {
    console.error("Error loading test cases:", error);
    return [];
  }
}

// Event handling for the button click
const createTestButton = document.getElementById('create-tests-button');

createTestButton.addEventListener('click', async () => {
  try {
    const testCases = await loadTestCases();
    const combinedTests = testCases.map(tc => `${tc.title}\n${tc.details}`).join('\n');
    
    console.log("create test cases:", combinedTests);
    const aiResponse = await getResponse(`show me common test cases: ${combinedTests}`);
    const chatArea = document.getElementById("chat-container");
    const md_text = md().render(aiResponse);
    chatArea.innerHTML += aiDiv(md_text);
  } catch (error) {
    console.error("Error getting AI response for test cases:", error);
  }
});
