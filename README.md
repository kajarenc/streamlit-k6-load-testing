# streamlit-k6-load-testing
Setup for Streamlit load testing with k6
## Run streamlit app with some profiler (e.g. memray (https://github.com/bloomberg/memray) for memory profiling):

```
memray run -m  streamlit run app.py
```

## Run the k6 to initiate multiple browser sessions for load testing:

```
K6_BROWSER_HEADLESS=true k6 run myscript.js 
```

Or alternatively, to run k6 in the docker, change line 36 in myscript.js to `await page.goto('http://host.docker.internal:8501')` Running k6 in docker will increase number of supported similitaous sessions, so you can change `target` at line 15 in `myscript.js` to 30 or above. 

To run k6 in docker, run 
```
docker run --rm -i -v $(pwd):/scripts grafana/k6:latest-with-browser run /scripts/myscript.js
```