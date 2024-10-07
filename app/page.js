"use client";

import { useEffect, useState } from "react";
import { getPosts } from "@/_actions/postAction";
import Catalog from "./catalog";
import backgroundImage from './assets/back.png'; 

export default function AnthropicResponsePage() {
  const [data, setData] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [prompt, setPrompt] = useState("");
  const [name, setName] = useState("");
  const [activeTab, setActiveTab] = useState("input");

  useEffect(() => {
    const fetchData = async () => {
      const { data, errMsg } = await getPosts();
      if (errMsg) {
        setErrMsg(errMsg);
      } else {
        setData(data);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handlePromptChange = (event) => setPrompt(event.target.value);
  const handleNameChange = (event) => setName(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const aiResponse = await fetch("/api/anthropic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      if (!aiResponse.ok) throw new Error(`AI API Error: ${aiResponse.status}`);
      const { completion } = await aiResponse.json();
      setResponse(completion);

      const saveResponse = await fetch("/api/saveResponse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, msg: completion, name }),
      });
      if (!saveResponse.ok) throw new Error(`Save Error: ${saveResponse.status}`);
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <h2>Dashboard</h2>
        <button
          onClick={() => setActiveTab("input")}
          style={{
            ...styles.tab,
            backgroundColor: activeTab === "input" ? "#e6e6ff" : "transparent",
          }}
        >
          Input
        </button>
        <button
          onClick={() => setActiveTab("catalog")}
          style={{
            ...styles.tab,
            backgroundColor: activeTab === "catalog" ? "#e6e6ff" : "transparent",
          }}
        >
          Catalog
        </button>
      </aside>

      <main style={styles.main}>
        <Card />
        <h1 style={styles.title}>AI Topic Explainer</h1>

        {activeTab === "input" && (
          <div style={styles.inputSection}>
            <form onSubmit={handleSubmit} style={styles.form}>
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="Enter your name"
                required
                style={styles.input}
              />
              <input
                type="text"
                value={prompt}
                onChange={handlePromptChange}
                placeholder="Enter your prompt here"
                required
                style={styles.input}
              />
              <button type="submit" style={styles.button}>
                Submit
              </button>
            </form>

            {response && !error && (
              <div style={styles.response}>
                <h2>Response:</h2>
                <p>{response}</p>
                <p>From: {name}</p>
              </div>
            )}
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        )}

        {activeTab === "catalog" && <Catalog />}
      </main>
    </div>
  );
}

const Card = () => {
  return (
    <div style={styles.card}>
      <div style={styles.cardContent}>
        <h2 style={styles.tagline}>Discover the Magic of Learning!</h2>
        <h3 style={styles.subheading}>Engage with topics like never before</h3>
        <span style={styles.tag}>Anthropic AI</span>
        <button style={styles.getStartedButton}>Get Started</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    fontFamily: "Arial, sans-serif",
  },
  sidebar: {
    width: "220px", // Fixed width to prevent resizing
    backgroundColor: "#fff",
    padding: "20px",
    boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    position: "fixed", // Fix the sidebar in place
    height: "100%", // Full height to fill the viewport
    top: 0,
    left: 0,
  },
  main: {
    flexGrow: 1,
    padding: "40px",
    marginLeft: "220px", // Offset the main content to account for the fixed sidebar
    backgroundColor: "rgba(255, 255, 255, 0.8)", 
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  tab: {
    padding: "10px 15px",
    cursor: "pointer",
    borderRadius: "5px",
    marginBottom: "10px",
    transition: "background-color 0.3s ease",
  },
  title: {
    fontSize: "2.5rem",
    color: "#4A4A4A",
    marginBottom: "30px",
    textAlign: "center",
  },
  inputSection: {
    width: "100%",
    maxWidth: "500px",
    marginTop: "30px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "100%",
    fontSize: "1rem",
  },
  button: {
    padding: "12px 20px",
    backgroundColor: "#6200EA",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  response: {
    marginTop: "20px",
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fafafa",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "30px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease",
  },
  cardContent: {
    textAlign: "center",
  },
  tagline: {
    fontSize: "1.75rem",
    fontWeight: "bold",
    color: "#6200EA",
  },
  subheading: {
    fontSize: "1.25rem",
    color: "#333",
  },
  tag: {
    backgroundColor: "#E3DFF9",
    color: "#6200EA",
    padding: "5px 10px",
    borderRadius: "5px",
    display: "inline-block",
    marginTop: "10px",
  },
  getStartedButton: {
    padding: "12px 20px",
    marginTop: "20px",
    backgroundColor: "#6200EA",
    color: "#fff",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
    transition: "background-color 0.3s ease",
  },
};
