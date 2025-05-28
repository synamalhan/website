#!/bin/bash

# Navigate to the script's root directory
cd "$(dirname "$0")"

# Start Ollama if it's not already running
if ! pgrep -x "ollama" > /dev/null; then
  echo "🔄 Starting Ollama server..."
  ollama serve > /dev/null 2>&1 &
  sleep 2
fi

# Check if the llama3 model is available
if ! ollama list | grep -q "llama3"; then
  echo "⬇️ Pulling llama3 model..."
  ollama pull llama3
fi

# Run the Streamlit app from src/components/projects/app.py
echo "🚀 Launching Streamlit Project Blurb Generator..."
streamlit run src/components/projects/app.py