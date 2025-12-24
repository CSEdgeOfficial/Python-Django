
---

# Django for Beginners 


---

##  What is Django?

**Django** is a **high-level Python web framework** used to build:

- Web applications
    
- APIs
    
- Admin panels
    
- Scalable backend systems
    

### Why Django (over Flask)?

|Django|Flask|
|---|---|
|Batteries included|Micro framework|
|Built-in admin|No admin|
|ORM included|Optional|
|Slower to start|Faster to prototype|

👉 Use **Django** when:

- You want structure
    
- You’re building real products
    
- You don’t want to reinvent basics
    

---

## Prerequisites

- Python 3.10+
    
- pip
    
- Virtual environment (recommended)
    

```bash
python --version
pip --version
```

---

##  Virtual Environment (DON’T SKIP THIS)

Most beginners skip this → dependency hell later.

```bash
python -m venv venv
```

Activate:

**Windows**

```bash
venv\Scripts\activate
```

**Mac/Linux**

```bash
source venv/bin/activate
```

---

##  Install Django

```bash
pip install django
```

Verify:

```bash
django-admin --version
```

---

##  Create Django Project

```bash
django-admin startproject myproject
cd myproject
```

Structure:

```
myproject/
│── manage.py
│── myproject/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
```

### Key Files (Know this)

- `settings.py` → configuration
    
- `urls.py` → URL routing
    
- `manage.py` → command-line utility
    

---

## ▶️ Run Development Server

```bash
python manage.py runserver
```

Visit:

```
http://127.0.0.1:8000/
```

If this doesn’t work → **don’t proceed**.

---

## 📦 Create an App (Core Django Concept)

> **Project** = entire system  
> **App** = feature/module

```bash
python manage.py startapp core
```

Structure:

```
core/
├── admin.py
├── apps.py
├── models.py
├── views.py
├── tests.py
└── migrations/
```

---

## ⚙️ Register App

In `settings.py`:

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'core',  # add this
]
```

---

## 🌐 First View (Hello World)

### `core/views.py`

```python
from django.http import HttpResponse

def home(request):
    return HttpResponse("Hello Django")
```

---

## 🔗 URL Mapping

### `core/urls.py`

```python
from django.urls import path
from .views import home

urlpatterns = [
    path('', home),
]
```

### Connect app URLs

`myproject/urls.py`

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('core.urls')),
]
```

---

## 🧠 Django Request Flow (Important)

```
Browser → urls.py → views.py → response
```

No magic. Just routing.

---

## 🧱 Templates (HTML Rendering)

Create folder:

```
core/templates/
└── home.html
```

### `home.html`

```html
<!DOCTYPE html>
<html>
<head>
    <title>Django</title>
</head>
<body>
    <h1>Hello from Template</h1>
</body>
</html>
```

### Update View

```python
from django.shortcuts import render

def home(request):
    return render(request, 'home.html')
```

---

## 📂 Static Files (CSS / JS)

Create:

```
core/static/core/style.css
```

### `style.css`

```css
body {
    background: #f4f4f4;
}
```

### Load in template

```html
{% load static %}
<link rel="stylesheet" href="{% static 'core/style.css' %}">
```

---

## 🧮 Models (Database Layer)

### `core/models.py`

```python
from django.db import models

class Student(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.name
```

---

## 🗄️ Migrations (DB Sync)

```bash
python manage.py makemigrations
python manage.py migrate
```

**Never edit DB directly. Django owns it.**

---

## 🔐 Admin Panel (Superpower)

Create admin user:

```bash
python manage.py createsuperuser
```

Register model:

### `core/admin.py`

```python
from django.contrib import admin
from .models import Student

admin.site.register(Student)
```

Visit:

```
http://127.0.0.1:8000/admin
```

---

## Forms (User Input)

### `core/forms.py`

```python
from django import forms
from .models import Student

class StudentForm(forms.ModelForm):
    class Meta:
        model = Student
        fields = '__all__'
```

---

## 🧠 CRUD View Example

```python
from django.shortcuts import render, redirect
from .forms import StudentForm

def add_student(request):
    form = StudentForm(request.POST or None)
    if form.is_valid():
        form.save()
        return redirect('/')
    return render(request, 'form.html', {'form': form})
```

---

## ❌ Common Beginner Mistakes

❌ Not using virtual env  
❌ Forgetting to add app in `INSTALLED_APPS`  
❌ Editing DB manually  
❌ Mixing logic in templates  
❌ Ignoring migrations

---

## 🧩 Django Mental Model (Remember This)

|Layer|Responsibility|
|---|---|
|URLs|Routing|
|Views|Logic|
|Templates|UI|
|Models|Data|
|Forms|Validation|

---

## 🔜 What to Learn Next (Order Matters)

1. Django ORM queries
    
2. Authentication system
    
3. Django REST Framework (DRF)
    
4. Deployment (Gunicorn + Nginx)
    
5. PostgreSQL
    

---

## 🧠 Final Advice (No Sugarcoating)

Django **rewards discipline**.  
If you’re lazy with structure → Django will punish you.  
If you respect conventions → Django scales beautifully.

---

If you want:

- **API-only Django**
    
- **Django + React**
    
- **Django REST Framework notes**
    
- **Real-world project README**
    

Say it directly.