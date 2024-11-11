from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

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
        return f"{self.tool.name} rented by {self.user.cname}"


class Invoice(models.Model):
    rental = models.OneToOneField('Rental', on_delete=models.CASCADE)
    customer = models.ForeignKey('Customer', on_delete=models.CASCADE)
    tool = models.ForeignKey('Tool', on_delete=models.CASCADE)
    rental_date = models.DateField()
    return_date = models.DateField(null=True, blank=True)
    price_per_day = models.DecimalField(max_digits=10, decimal_places=2)
    rental_duration = models.PositiveIntegerField()  # Number of days rented
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    paid = models.BooleanField(default=False)  # Whether the invoice has been paid

    def save(self, *args, **kwargs):
        if not self.rental_duration:
            # Calculate rental duration if not provided
            if self.return_date:
                self.rental_duration = (self.return_date - self.rental_date).days
            else:
                self.rental_duration = (timezone.now().date() - self.rental_date).days  # if still rented

        if not self.total_price:
            # Calculate total price if not provided
            self.total_price = self.rental_duration * self.price_per_day

        super().save(*args, **kwargs)

    def __str__(self):
        return f"Invoice for Rental {self.rental.id}"