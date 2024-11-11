from rest_framework import serializers
from .models import Tool, Rental, Supplier, Customer, Invoice
from django.contrib.auth.models import User

class ToolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tool
        fields = ('id','name','description','rental_price','availability','quantity','category','supplier_id')
    def create(self,validated_data):
        tool=Tool.objects.create(
            **validated_data
        )
        return tool
# class tool(serializers.ModelSerializer):
#     class Meta:
#         model=Tool
#         fields='__all__'
#     def create(self,validate_data):
#         tool=Tool.objects.create(
#             **validate_data
#         )

class RegisterToolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tool
        fields = ('name','description','rental_price','quantity','category','supplier_id')
    
    # def create(self, validated_data):
    #     tool = Tool.objects.create(
    #         name=validated_data['name'],
    #         description=validated_data['description'],
    #         rental_price=validated_data['rental_price'],
    #         quantity=validated_data['quantity'],
    #         category=validated_data['category'],
    #     )
    #     return tool

class RentalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rental
        fields = '__all__'

class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        fields = '__all__'

class RentalSerializer1(serializers.ModelSerializer):
    tool_name = serializers.CharField(source='tool.name', read_only=True)
    user_name = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Rental
        fields = ['id', 'tool_name', 'user_name', 'rental_date', 'return_date']


class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = '__all__'

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'email')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user