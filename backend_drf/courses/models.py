from django.db import models

# Create your models here.
class Course(models.Model):
    title = models.CharField(max_length=255);
    description = models.TextField();
    price = models.PositiveIntegerField();
    students= models.PositiveIntegerField(default=0);
    image = models.ImageField(upload_to="courses/");
    created_at = models.DateTimeField(auto_now_add=True);
    updated_at = models.DateTimeField(auto_now=True);
    
    def __str__(self):
        return self.title
