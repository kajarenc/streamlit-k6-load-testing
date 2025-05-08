# Streamlit K6 Load Testing

A setup for Streamlit load testing with k6.

## Run Streamlit app with a profiler

Use a profiler such as [memray](https://github.com/bloomberg/memray) for memory profiling:

```bash
memray run -m streamlit run app.py
```

After streamlit app stopped, follow the instructions from the command line to generate a memory consuption chart by memray.

## Run k6 to initiate multiple browser sessions for load testing

```bash
K6_BROWSER_HEADLESS=true k6 run myscript.js
```

## Docker alternative

Alternatively, you can run k6 in Docker for increased capacity:

1. Change line 36 in `myscript.js` to:
   ```javascript
   await page.goto('http://host.docker.internal:8501')
   ```

2. Running k6 in Docker will increase the number of supported simultaneous sessions, allowing you to change the `target` value at line 15 in `myscript.js` to 30 or above.

3. Execute the Docker command:
   ```bash
   docker run --rm -i -v $(pwd):/scripts grafana/k6:latest-with-browser run /scripts/myscript.js
   ```