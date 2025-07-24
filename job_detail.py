import streamlit as st
from jobs_list import get_similar_jobs

def show_job_detail(job):
    # --- Breadcrumb Actions ---
    col1, col2 = st.columns([0.1, 0.9])

    with col1:
        # Handle clicks via invisible buttons
        if st.button("🏠", key="breadcrumb_home"):
            st.session_state.view = "home"
            st.session_state.selected_job = None
            st.session_state.applied = False

    with col2:
        st.markdown(
            f"<span style='font-size:16px;'>🏠 <u style='color:blue;'>Home</u> / "
            f"<u style='color:blue;'>💼 Jobs</u> / 📄 {job['title']}</span>",
            unsafe_allow_html=True
        )

    # Make second invisible button for Jobs click
    if st.button("💼", key="breadcrumb_jobs"):
        st.session_state.view = "jobs"
        st.session_state.selected_job = None
        st.session_state.applied = False

    # --- Job Info ---
    st.title(f"{job['title']}")
    st.write(f"**Description:** {job['description']}")

    # --- Apply Logic ---
    if not st.session_state.applied:
        if st.button("✅ Apply Now", use_container_width=True):
            if not st.session_state.is_logged_in:
                st.session_state.pending_apply = True
                st.session_state.view = "login"
            else:
                st.session_state.applied = True
                st.success("🎉 Application Submitted!")
    else:
        st.success("🎉 You’ve already applied!")

    # --- Back Button to Jobs ---
    if st.button("← Back to Jobs Section", use_container_width=True):
        st.session_state.view = "jobs"
        st.session_state.selected_job = None
        st.session_state.applied = False

    # --- Similar Jobs Section ---
    st.markdown("---")
    st.subheader("🧠 You may also be interested in:")
    similar = get_similar_jobs(job)
    for sim_job in similar:
        if st.button(f"🔄 {sim_job['title']}"):
            st.session_state.selected_job = sim_job
            st.session_state.applied = False
