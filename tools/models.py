from django.db import models
from django.contrib.auth.models import User

class Supplier(models.Model):
    sname=models.CharField(max_length=100)
    address=models.CharField(max_length=100)
    phone_number=models.BigIntegerField()
    email=models.EmailField()
    def __str__(self):
        return f"{self.sname}"
    

class Customer(models.Model):
    cname=models.CharField(max_length=100)
    address=models.CharField(max_length=100)
    phone_number=models.BigIntegerField()
    email=models.EmailField()
    def __str__(self):
        return f"{self.cname}"

class Tool(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    rental_price = models.DecimalField(max_digits=10, decimal_places=2)
    availability = models.BooleanField(default=True)
    quantity = models.PositiveIntegerField(default=1)
    category = models.CharField(max_length=50)
    supplier_id=models.ForeignKey(Supplier,on_delete=models.CASCADE)
    def __str__(self):
        return self.name

class Rental(models.Model):
    tool = models.ForeignKey(Tool, on_delete=models.CASCADE)
    user = models.ForeignKey(Customer, on_delete=models.CASCADE)
    rental_date = models.DateTimeField(auto_now_add=True)
    return_date = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.tool.name} rented by {self.user.username}"
