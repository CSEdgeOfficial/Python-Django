# Django: Registration Form → Database → Admin → App View

> Goal:  
> User fills **registration form** → data stored in **DB** →  
> visible in **Django Admin** →  
> retrievable via **another route in the app**

This is how **90% real Django apps work**.

---

## 1️⃣ Define the Model (Data Structure)

👉 First rule: **No form without model**

### `core/models.py`

```python
from django.db import models

class UserRegistration(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    age = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.full_name
```

### Why this matters

- This defines **table structure**
    
- Django ORM will handle SQL automatically
    

---

## 2️⃣ Apply Migrations (DB Sync)

```bash
python manage.py makemigrations
python manage.py migrate
```

❗If this step is skipped → nothing works.

---

## 3️⃣ Register Model in Admin Dashboard

### `core/admin.py`

```python
from django.contrib import admin
from .models import UserRegistration

@admin.register(UserRegistration)
class UserRegistrationAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'phone', 'age', 'created_at')
    search_fields = ('full_name', 'email')
```

### Result

- Clean table view
    
- Search enabled
    
- No extra coding
    

👉 Show students `/admin` now.

---

## 4️⃣ Create ModelForm (Bridge Between HTML & Model)

### `core/forms.py`

```python
from django import forms
from .models import UserRegistration

class RegistrationForm(forms.ModelForm):
    class Meta:
        model = UserRegistration
        fields = ['full_name', 'email', 'phone', 'age']
```

### Why ModelForm?

- Auto validation
    
- Auto save
    
- Prevents dirty data
    

---

## 5️⃣ Create Registration View (Store Data)

### `core/views.py`

```python
from django.shortcuts import render, redirect
from .forms import RegistrationForm

def register_user(request):
    form = RegistrationForm(request.POST or None)

    if request.method == "POST":
        if form.is_valid():
            form.save()
            return redirect('user_list')

    return render(request, 'register.html', {'form': form})
```

### Teaching point

- `request.POST` → incoming data
    
- `form.is_valid()` → validation
    
- `form.save()` → DB insert
    

---

## 6️⃣ Create HTML Form (Frontend)

### `templates/register.html`

```html
<!DOCTYPE html>
<html>
<head>
    <title>Registration</title>
</head>
<body>
    <h2>User Registration</h2>

    <form method="POST">
        {% csrf_token %}
        {{ form.as_p }}
        <button type="submit">Register</button>
    </form>
</body>
</html>
```

### Explain clearly

- `csrf_token` → security (mandatory)
    
- `form.as_p` → auto-rendered fields
    

---

## 7️⃣ Create Data Retrieval View (Read from DB)

### `core/views.py`

```python
from .models import UserRegistration

def user_list(request):
    users = UserRegistration.objects.all().order_by('-created_at')
    return render(request, 'user_list.html', {'users': users})
```

### ORM in action

- No SQL
    
- Clean Python code
    
- Production safe
    

---

## 8️⃣ Display Stored Data in App UI

### `templates/user_list.html`

```html
<!DOCTYPE html>
<html>
<head>
    <title>Registered Users</title>
</head>
<body>
    <h2>Registered Users</h2>

    <table border="1">
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Age</th>
        </tr>

        {% for user in users %}
        <tr>
            <td>{{ user.full_name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ user.age }}</td>
        </tr>
        {% empty %}
        <tr>
            <td colspan="4">No records found</td>
        </tr>
        {% endfor %}
    </table>
</body>
</html>
```

---

## 9️⃣ URL Routing (Connect Everything)

### `core/urls.py`

```python
from django.urls import path
from .views import register_user, user_list

urlpatterns = [
    path('register/', register_user, name='register'),
    path('users/', user_list, name='user_list'),
]
```

---

## 🔁 Full Flow 

```
User fills form
      ↓
POST request sent
      ↓
Form validates data
      ↓
Model saves to DB
      ↓
Admin dashboard updates
      ↓
App route fetches data
      ↓
HTML renders users
```

---
