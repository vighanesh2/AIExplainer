AI Topic Explainer Website
This project is a Next.js web application that interacts with the Anthropic AI API to generate simple, 5-year-old-friendly explanations for user-provided topics. Users can input a topic and name, receive an explanation from the AI, and save the data to a MongoDB database using Mongoose. The website also features a catalog to display previously stored explanations.

Table of Contents
Features
Technologies
Installation
Usage
Folder Structure
API Endpoints
License
Features
AI-Powered Topic Explainer: Users input a topic and receive a simplified explanation from the AI.
MongoDB Integration: Store and retrieve user-submitted prompts and AI-generated explanations.
Two-Page Navigation:
Input Page: For submitting new prompts.
Catalog Page: Displays a list of previously saved prompts and explanations.
Responsive Design: The UI is responsive, featuring a fixed sidebar for navigation between Input and Catalog pages.
Non-Resizable Dashboard: Sidebar is fixed and does not resize with window adjustments.
Technologies
Next.js: React-based framework for building web applications.
Anthropic AI API: Used to generate simplified explanations for user-submitted topics.
MongoDB: NoSQL database for storing prompts and AI-generated responses.
Mongoose: ODM for MongoDB, providing an easy way to interact with the database.
CSS: For styling the UI.
JavaScript (ES6+): Main language used for the project.
Installation
Prerequisites
Make sure you have the following installed:

Node.js (version 16.x or higher)
MongoDB (Local or remote instance)
