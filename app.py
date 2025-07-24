# app.py

import streamlit as st
import time
from jobs_list import show_jobs
from job_detail import show_job_detail
from login import show_login

# Init session variables
st.session_state.setdefault("view", "home")
st.session_state.setdefault("selected_job", None)
st.session_state.setdefault("applied", False)
st.session_state.setdefault("is_logged_in", False)
st.session_state.setdefault("pending_apply", False)

# Routing logic
if st.session_state.view == "home":
    st.title("🏠 Home Page")
    st.write("Welcome to the Unstop UX Demo App")
    if st.button("💼 Go to Jobs"):
        st.session_state.view = "jobs"

elif st.session_state.view == "jobs":
    if st.session_state.selected_job is None:
        show_jobs()
    else:
        with st.spinner("Loading job details..."):
            time.sleep(1)
            show_job_detail(st.session_state.selected_job)

elif st.session_state.view == "login":
    show_login()
