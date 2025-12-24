# 🖼️ Django Image Conversion Web App

### (PNG ↔ JPG ↔ WEBP + Resize)

---

## 🎯 What You Say at the Start (Important)

> “Today we are building a real web application.  
> User uploads an image.  
> Server processes it.  
> User downloads a converted image.”


> “This is backend work.  
> Not UI magic.”

---

## 1️⃣ Create New Django Project

> “Every real app starts clean. New project.”

```bash
django-admin startproject image_converter
cd image_converter
python manage.py startapp converter
```

---

## 2️⃣ Install Image Processing Library

> “Python cannot handle images by default.  
> We use a library called Pillow.”

```bash
pip install pillow
```

---

## 3️⃣ Register App

### `settings.py`

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'converter',
]
```

---

## 4️⃣ Configure Media (CRUCIAL STEP)

> “Images are not static files.  
> They are user-uploaded files.”

### `settings.py`

```python
import os

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
```

### `image_converter/urls.py`

```python
from django.conf import settings
from django.conf.urls.static import static

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

---

## 5️⃣ Create Model (Uploaded Image)
> “We must store uploaded images somewhere.  
> Model tells Django how.”

### `converter/models.py`

```python
from django.db import models

class ImageUpload(models.Model):
    image = models.ImageField(upload_to='uploads/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
```

Then run:

```bash
python manage.py makemigrations
python manage.py migrate
```

---

## 6️⃣ Register Model in Admin

### `converter/admin.py`

```python
from django.contrib import admin
from .models import ImageUpload

admin.site.register(ImageUpload)
```

> “Admin lets us verify uploads easily.”

---

## 7️⃣ Create Upload Form

### `converter/forms.py`

```python
from django import forms
from .models import ImageUpload

class ImageUploadForm(forms.ModelForm):
    class Meta:
        model = ImageUpload
        fields = ['image']
```

---

## 8️⃣ Core Logic: Image Conversion (THIS IS THE BRAIN)

> “Views are where real backend logic lives.”
### `converter/views.py`

```python
from django.shortcuts import render
from .forms import ImageUploadForm
from PIL import Image
import os

def upload_and_convert(request):
    converted_image_path = None

    if request.method == 'POST':
        form = ImageUploadForm(request.POST, request.FILES)
        if form.is_valid():
            img_obj = form.save()
            img_path = img_obj.image.path

            img = Image.open(img_path)
            new_path = img_path.rsplit('.', 1)[0] + '.jpg'

            img.convert('RGB').save(new_path, 'JPEG')
            converted_image_path = new_path.split('media/')[-1]
    else:
        form = ImageUploadForm()

    return render(request, 'upload.html', {
        'form': form,
        'converted': converted_image_path
    })
```

Pause here and explain verbally:

- Image uploaded
    
- Pillow opens it
    
- Converts format
    
- Saves new file
    
- Sends path to template
    

---

## 9️⃣ URL Mapping

### `converter/urls.py`

```python
from django.urls import path
from .views import upload_and_convert

urlpatterns = [
    path('', upload_and_convert, name='upload'),
]
```

### `image_converter/urls.py`

```python
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('converter.urls')),
]
```

---

## 🔟 Frontend Page (Very Simple)

> “Frontend is just a trigger.  
> Backend does the work.”

### `templates/upload.html`

```html
<!DOCTYPE html>
<html>
<head>
    <title>Image Converter</title>
</head>
<body>
    <h2>Upload Image</h2>

    <form method="POST" enctype="multipart/form-data">
        {% csrf_token %}
        {{ form.as_p }}
        <button type="submit">Convert to JPG</button>
    </form>

    {% if converted %}
        <h3>Converted Image</h3>
        <a href="/media/{{ converted }}" download>Download</a>
    {% endif %}
</body>
</html>
```

==**Cross-Site Request Forgery (CSRF)** attacks==. It ensures that unsafe HTTP requests (like POST, PUT, and DELETE) come from your legitimate website and not a malicious third-party site.

---

## 🔁 Full Flow 

```
User uploads image
        ↓
Django receives file
        ↓
Pillow processes image
        ↓
New image saved
        ↓
Download link shown
```

---

## 🧪 Test in Class 

1. Upload PNG
    
2. Convert to JPG
    
3. Download
    
4. Check admin
    
5. Show media folder
    

---


