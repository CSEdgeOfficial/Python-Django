
---
## 1. What is Flask? (Theory)

**Flask** is a **lightweight Python web framework** used to build:

- Web applications
    
- REST APIs
    
- Backend services for mobile/web apps
    

### Why Flask?

- Very **simple and beginner friendly**
    
- Minimal setup (no heavy configuration)
    
- Flexible – you choose the tools you need
    
- Widely used for APIs and microservices
    

### Flask is a _Micro Framework_

This means:

- It provides **only core features**
    
    - URL routing
        
    - Request/response handling
        
- Other features (database, authentication, etc.) are added using extensions
    

---

## 2. Flask vs Django (Quick Comparison)

|Flask|Django|
|---|---|
|Lightweight|Full-stack framework|
|Easy to learn|Steeper learning curve|
|Best for APIs & small apps|Best for large applications|
|More control|More built-in features|

---

## 3. How Flask Works (High-Level)

1. Client (Browser / Postman) sends a **request**
    
2. Flask matches the **URL route**
    
3. Python function (view) runs
    
4. Flask returns a **response** (HTML / JSON)
    

```
Client → URL → Flask Route → Python Function → Response
```

---

## 4. Installing Flask

### Step 1: Check Python

```bash
python --version
```

### Step 2: (Optional but Recommended) Create Virtual Environment

```bash
python -m venv venv
```

Activate:

- **Windows**
    

```bash
venv\Scripts\activate
```

- **Mac/Linux**
    

```bash
source venv/bin/activate
```

### Step 3: Install Flask

```bash
pip install flask
```

### Verify Installation

```bash
python -c "import flask; print(flask.__version__)"
```

---

## 5. First Flask Application (Hello World)

### Create `app.py`

```python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return "Hello, Flask!"

if __name__ == '__main__':
    app.run(debug=True)
```

### Run the App

```bash
python app.py
```

Open browser:

```
http://127.0.0.1:5000/
```

---

## 6. Understanding the Code

```python
from flask import Flask
```

Imports Flask class

```python
app = Flask(__name__)
```

Creates Flask application instance

```python
@app.route('/')
```

URL route (endpoint)

```python
def home():
    return "Hello, Flask!"
```

Function that runs when URL is accessed

```python
app.run(debug=True)
```

Runs development server with auto-reload and error details

---

## 7. What is a REST API?

**REST API** allows applications to communicate using **HTTP methods**.

### Common HTTP Methods

|Method|Purpose|
|---|---|
|GET|Retrieve data|
|POST|Send data|
|PUT|Update data|
|DELETE|Remove data|

### REST API returns:

- JSON (mostly)
    
- Not HTML pages
    

---

## 8. Flask REST API – Basic Example

### Import Required Modules

```python
from flask import Flask, jsonify, request
```

---

## 9. Simple GET API

```python
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/hello', methods=['GET'])
def hello_api():
    return jsonify({
        "message": "Hello, this is a GET API",
        "status": "success"
    })

if __name__ == '__main__':
    app.run(debug=True)
```

### Test URL

```
http://127.0.0.1:5000/api/hello
```

---

## 10. GET API with Parameters

```python
@app.route('/api/greet/<name>', methods=['GET'])
def greet(name):
    return jsonify({
        "greeting": f"Hello {name}"
    })
```

Example:

```
/api/greet/John
```

---

## 11. POST API Example

```python
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/add', methods=['POST'])
def add_numbers():
    data = request.get_json()
    a = data.get('a')
    b = data.get('b')

    return jsonify({
        "sum": a + b
    })

if __name__ == '__main__':
    app.run(debug=True)
```

### Sample JSON Input (Postman / REST Client)

```json
{
  "a": 10,
  "b": 20
}
```

### Using Req Params


```python
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/add', methods=['GET'])
def add_numbers():
    a = request.args.get('a')
    b = request.args.get('b')

    return jsonify({
        "a": a,
        "b": b
    })

if __name__ == '__main__':
    app.run(debug=True)
```

```shell
http://127.0.0.1:5000/add?a=10&b=20
```
---

## 12. Understanding `request` and `jsonify`

### `request`

- Reads data sent by client
    
- Used for:
    
    - JSON
        
    - Form data
        
    - Query parameters
        

### `jsonify`

- Converts Python dictionary → JSON
    
- Automatically sets response headers
    

---

## 13. Simple In-Memory REST API (CRUD Style)

```python
from flask import Flask, jsonify, request

app = Flask(__name__)

students = []

@app.route('/students', methods=['POST'])
def add_student():
    data = request.get_json()
    students.append(data)
    return jsonify({"message": "Student added"})

@app.route('/students', methods=['GET'])
def get_students():
    return jsonify(students)

if __name__ == '__main__':
    app.run(debug=True)
```

---

## 14. Key Flask Concepts for Beginners

|Concept|Meaning|
|---|---|
|Route|URL mapping|
|View Function|Function handling request|
|Request|Data from client|
|Response|Data sent back|
|JSON|Data format for APIs|
|Debug Mode|Helps during development|

---

## 15. When to Use Flask?

Use Flask when:

- Teaching web development
    
- Building REST APIs
    
- Creating microservices
    
- Prototyping quickly
    

---

