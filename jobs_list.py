# jobs_list.py

import streamlit as st

jobs = [
    {"id": 1, "title": "Data Scientist at Razorpay", "description": "Work on cutting-edge data pipelines and AI models."},
    {"id": 2, "title": "AI Engineer at Goldman Sachs", "description": "Develop AI tools for financial analysis and trading."},
    {"id": 3, "title": "ML Intern at JP Morgan", "description": "Assist in building ML models for portfolio optimization."},
    {"id": 4, "title": "NLP Researcher at Google", "description": "Advance conversational AI systems."},
    {"id": 5, "title": "AI Product Analyst at Razorpay", "description": "Analyze user behavior with AI models."},
]

def show_jobs():
    st.title("💼 Job Listings")
    for job in jobs:
        if st.button(job["title"]):
            st.session_state.selected_job = job

def get_similar_jobs(current_job):
    return [j for j in jobs if j["id"] != current_job["id"] and any(
        kw in j["title"].lower() for kw in current_job["title"].lower().split())][:3]
