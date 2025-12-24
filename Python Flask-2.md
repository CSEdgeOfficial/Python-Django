# Building an API using Flask (For ML Projects)

## 🧠 Mental Model

> “An API is just a **URL that returns data**, not HTML.”

Example:

```
/predict → returns result
```

No page. No UI. Only **data**.

---

## 1️⃣ Install Flask

```bash
pip install flask
```

> “Flask is lightweight. Perfect for ML.”

---

## 2️⃣ Minimal Flask API Structure

Tell them to create:

```
ml_api/
│── app.py
```

> “For APIs, we don’t need templates.”

---

## 3️⃣ Create Your First API Endpoint

### `app.py`

```python
from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/api/hello")
def hello_api():
    return jsonify({
        "message": "Hello from Flask API"
    })

if __name__ == "__main__":
    app.run(debug=True)
```

Say while explaining:

- `jsonify` → converts Python dict to JSON
    
- Browser shows JSON, not HTML
    

---

## 4️⃣ Test the API (Important Habit)

Run:

```bash
python app.py
```

Open browser:

```
http://127.0.0.1:5000/api/hello
```

> “If this works,  
> you have officially built an API.”

Let that moment land.

---

## 5️⃣ Accept Input Data (API with Parameters)

> “ML models need input.  
> APIs receive input as JSON.”

### Update API

```python
from flask import request

@app.route("/api/square", methods=["POST"])
def square_number():
    data = request.get_json()
    number = data["number"]

    result = number * number

    return jsonify({
        "input": number,
        "output": result
    })
```

Say slowly:

- `POST` → sending data
    
- `request.get_json()` → read input
    
- Return JSON result
    

---

## 6️⃣ How to Test This API (No Frontend Yet)

> “APIs are tested using tools, not browser typing.”

### Using Postman / Thunder Client / curl

Example JSON:

```json
{
  "number": 5
}
```

Response:

```json
{
  "input": 5,
  "output": 25
}
```

> “This is how frontend talks to backend.”

---

## 7️⃣ Connect This to ML (Key Moment)

Now **relate it to ML**, verbally:

> “Replace this logic with your ML model prediction.”

Example explanation:

```python
prediction = model.predict(input_data)
```


> “API does not care how complex your model is.  
> It only sends input and receives output.”

This clicks instantly.

---

## 8️⃣ Simulating an ML Prediction (Beginner Friendly)

### Fake ML Logic (For Understanding)

```python
@app.route("/api/predict", methods=["POST"])
def predict():
    data = request.get_json()
    marks = data["marks"]

    if marks >= 50:
        result = "Pass"
    else:
        result = "Fail"

    return jsonify({
        "marks": marks,
        "prediction": result
    })
```


> “Today this is logic.  
> Tomorrow this will be your ML model.”

---

## 9️⃣ Where UI Fits (Very Simple Explanation)


> “UI is optional.  
> API is mandatory.”

Explain flow:

```
HTML / React / Mobile App
            ↓
         Flask API
            ↓
         ML Model
            ↓
         JSON Response
```

Don’t build UI yet. 