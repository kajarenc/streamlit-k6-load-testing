import streamlit as st
import datetime

st.write("HELLO WORLD")
x = st.text_input("just")

st.subheader(x + x)

print(f"NEW RERUN!!! {datetime.datetime.now()}")
