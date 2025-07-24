# login.py

import streamlit as st

def show_login():
    st.title("🔐 Login Required")

    username = st.text_input("Username")
    password = st.text_input("Password", type="password")

    if st.button("🔓 Login"):
        if username and password:
            st.success("✅ Logged in successfully!")
            st.session_state.is_logged_in = True

            # If login was triggered during apply
            if st.session_state.pending_apply:
                st.session_state.pending_apply = False
                st.session_state.applied = True
                st.session_state.view = "jobs"
            else:
                st.session_state.view = "home"
        else:
            st.error("❌ Please enter both username and password.")
