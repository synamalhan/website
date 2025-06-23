import subprocess
import streamlit as st
import os
import re

st.set_page_config(page_title="📄 README → Project Blurb")

st.title("📄 README → Blurb Generator (Local LLM)")

readme_text = st.text_area("Paste your README here:", height=300)
generate = st.button("Generate Blurb")

# Resolve absolute path to project-template.txt
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
TEMPLATE_PATH = os.path.join(SCRIPT_DIR, "project-template.txt")
PROJECTS_FILE = os.path.join(SCRIPT_DIR, "Projects.jsx")

def strip_code_fences(text: str) -> str:
    """
    Remove triple backticks and optional language tags from the start and end of a text block.
    Returns the cleaned text.
    """
    # Regex pattern to match ``` optionally followed by language, at start and end
    pattern = r"^```[a-zA-Z]*\n?(.*?)\n?```$"
    match = re.match(pattern, text, re.DOTALL)
    if match:
        return match.group(1).strip()
    return text.strip()


def extract_jsx_object_block(text: str) -> str:
    """
    Extract the first balanced {...} block where the first key is 'title'.
    Scans multiple blocks if needed.
    """
    stack = []
    blocks = []
    start_idx = None

    for i, c in enumerate(text):
        if c == '{':
            if not stack:
                start_idx = i
            stack.append(c)
        elif c == '}':
            if stack:
                stack.pop()
                if not stack and start_idx is not None:
                    block = text[start_idx:i+1]

                    # Check if block starts with "title"
                    inside = block.lstrip("{").lstrip()
                    if re.match(r'^["\']?title["\']?\s*:', inside):
                        return block  # ✅ Valid block
                    # Otherwise continue looking

    return ""  # ❌ No valid block found


def append_to_projects(new_entry: str):
    try:
        with open(PROJECTS_FILE, "r", encoding="utf-8") as f:
            content = f.read()

        insert_pos = content.rfind("];")
        if insert_pos == -1:
            st.error("Could not find closing bracket for projects array in Projects.jsx")
            return False

        before = content[:insert_pos].rstrip()
        after = content[insert_pos:]

        # Add a comma at the end of new entry if not present
        trimmed_entry = new_entry.strip()
        if not trimmed_entry.endswith(","):
            trimmed_entry += ","

        # Handle comma before new entry if array not empty
        if before.endswith("["):
            new_content = before + "\n  " + trimmed_entry + "\n" + after
        else:
            new_content = before + ",\n  " + trimmed_entry + "\n" + after

        with open(PROJECTS_FILE, "w", encoding="utf-8") as f:
            f.write(new_content)

        return True
    except Exception as e:
        st.error(f"Error updating Projects.jsx: {e}")
        return False


if generate and readme_text.strip():
    with open(TEMPLATE_PATH) as f:
        prompt = f.read().replace("{readme_text}", readme_text)

    with st.spinner("Generating using local LLM..."):
        result = subprocess.run(
            ["ollama", "run", "llama3"],
            input=prompt.encode(),
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
        )

        output = result.stdout.decode()

        # Strip code fences if they exist
        output = strip_code_fences(output)

        # Now skip leading text before first '{'
        brace_pos = output.find("{")
        if brace_pos != -1:
            output = output[brace_pos:]
        else:
            st.error("No opening brace found in LLM output")
            output = ""

        print("=== Raw Output ===")
        print(result.stdout.decode())
        print("=== After Strip Code Fences ===")
        print(output)
        print("======================")


        jsx_object = extract_jsx_object_block(output)

        if result.stderr:
            st.error(result.stderr.decode())

        if output.strip():
            st.success("Blurb generated successfully!")
            st.code(output, language="javascript")

            # Extract {...} block from output
            jsx_object = extract_jsx_object_block(output)
            if jsx_object:
                if append_to_projects(jsx_object):
                    st.success(f"Project appended to {PROJECTS_FILE} successfully.")
                else:
                    st.warning("Failed to append the project entry to Projects.jsx.")
            else:
                st.error("Could not extract the JSX object block from LLM output.")
        else:
            st.error("No output received from the LLM.")
