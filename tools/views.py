from rest_framework import viewsets, permissions, status, generics
from rest_framework.decorators import action
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import os
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Tool, Rental, Supplier, Customer
from .serializers import (
    ToolSerializer, RentalSerializer, RegisterToolSerializer,RentalSerializer1,InvoiceSerializer,
    SupplierSerializer, CustomerSerializer, RegisterSerializer
)
import google.generativeai as genai
import os
import json
from dotenv import load_dotenv

load_dotenv()

gem=os.environ['API_KEY']
print(gem)
genai.configure(api_key=gem)


def get_data_from_sql():
    try:
        # Fetch data from the tables
        tools = Tool.objects.all()
        rentals = Rental.objects.all()
        customers = Customer.objects.all()
        suppliers = Supplier.objects.all()
        
        # Prepare tool information
        tool_info = []
        for tool in tools:
            tool_info.append(
                f"Tool: {tool.name}, Description: {tool.description}, Price: {tool.rental_price}, Available Quantity: {tool.quantity}"
            )
        # Prepare rental information
        rental_info = []
        for rental in rentals:
            rental_info.append(
                f"Rental ID: {rental.id}, Tool: {rental.tool.name}, Customer: {rental.user.cname}, Rental Date: {rental.rental_date}, Return Date: {rental.return_date}"
            )
        
        # Prepare customer information
        customer_info = []
        for customer in customers:
            customer_info.append(
                f"Customer: {customer.cname}, Email: {customer.email}, Phone: {customer.phone_number}"
            )
        
        # Prepare supplier information
        supplier_info = []
        for supplier in suppliers:
            supplier_info.append(
                f"Supplier: {supplier.sname}, Contact: {supplier.phone_number}, Email: {supplier.email}"
            )

        # Combine all information into one context string
        context_str = (
            "Here is the list of available tools and their descriptions:\n" + "\n".join(tool_info) +
            "\n\nHere is the list of rental information:\n" + "\n".join(rental_info) +
            "\n\nHere is the list of customers:\n" + "\n".join(customer_info) +
            "\n\nHere is the list of suppliers:\n" + "\n".join(supplier_info)
        )

        # Return the combined context string
        return context_str

    except Exception as e:
        print(f"Error querying database: {e}")
        return "Error fetching data."


@csrf_exempt  # Only for testing purposes; remove in production
def gemini_chatbot(request):
    if request.method == "POST":
        try:
            # Parse the raw JSON data from the request body
            data = json.loads(request.body.decode('utf-8'))
            user_message = data.get("message")
            context = data.get("context")  # Optional context passed by the user

            if user_message:
                # Build the full context (tool information from the database)
                full_context = get_data_from_sql()

                # If the user provides additional context, append it to the full context
                if context:
                    full_context += f"\nAdditional context from user: {context}"

                # Initialize the model with the full context
                generation_config = {
                    "temperature": 2,
                    "top_p": 0.95,
                    "top_k": 40,
                    "max_output_tokens": 8192,
                    "response_mime_type": "text/plain",
                }
                model = genai.GenerativeModel(
                    model_name="gemini-1.5-flash",
                    generation_config=generation_config,
                    system_instruction=f"Here is the list of available tools, rentals, customers, and suppliers: \n{full_context}\nPlease answer the following question based on this information: {user_message}",
                )


                # Generate the response from the model
                response = model.generate_content(user_message)

                # Return the generated response in JSON format
                return JsonResponse({"response": response.text})
            else:
                return JsonResponse({"error": "No message provided"}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)


# def get_data_from_sql():
#     try:
#         tools = Tool.objects.all()
#         rentals=Rental.objects.all()
#         # Prepare a list of strings for each tool's description and details
#         tool_info = []
#         for tool in tools:
#             tool_info.append(
#                 f"Tool: {tool.name}, Description: {tool.description}, Price: {tool.rental_price}, Available Quantity: {tool.quantity}"
#             )
#         rental_info = []
        

#         # Join all tool descriptions into a single string with each tool info on a new line
#         context_str = "\n".join(tool_info)

#         # Return the context string for the chatbot
#         return context_str

#     except Exception as e:
#         print(f"Error querying database: {e}")
#         return "Error fetching tool data."

# @csrf_exempt  # Only for testing purposes; remove in production
# def gemini_chatbot(request):
#     if request.method == "POST":
#         try:
#             # Parse the raw JSON data from the request body
#             data = json.loads(request.body.decode('utf-8'))
#             user_message = data.get("message")
#             context = data.get("context")  # Optional context passed by the user

#             if user_message:
#                 # Build the full context (tool information from the database)
#                 tools_context = get_data_from_sql()

#                 # If the user provides additional context, append it to the tools context
#                 if context:
#                     tools_context += f"\nAdditional context from user: {context}"

#                 # Initialize the model with the full context
#                 model = genai.GenerativeModel(
#                     model_name="gemini-1.5-flash",
#                     system_instruction=f"Here is the list of available tools and their descriptions: \n{tools_context}\nPlease answer the following question based on this information: {user_message}",
#                 )

#                 # Generate the response from the model
#                 response = model.generate_content(user_message)

#                 # Return the generated response in JSON format
#                 return JsonResponse({"response": response.text})
#             else:
#                 return JsonResponse({"error": "No message provided"}, status=400)
#         except json.JSONDecodeError:
#             return JsonResponse({"error": "Invalid JSON"}, status=400)
#     else:
#         return JsonResponse({"error": "Invalid request method"}, status=405)

# def get_data_from_sql():
#     # ... your database query logic here using Django ORM or SQL ...
#     # Example using Django ORM:
#     try:
#         # Example: Search for tools matching a keyword
#         # tools = Tool.objects.filter(name__icontains=query)
#         tools = Tool.objects.all()
#         results1 = [{"name": tool.name, "description": tool.description, "price": tool.rental_price,"quantity":tool.quantity} for tool in tools]
#         # results2 = Tool.objects.all()
#         # print(results2)
#         results=str(results1)
#         print(results)
#         return results 
#     except Exception as e:
#         print(f"Error querying database: {e}")
#         return []
    

# @csrf_exempt  # Only for testing purposes; remove in production
# def gemini_chatbot(request):
#     if request.method == "POST":
#         try:
#             # Parse the raw JSON data from the request body
#             data = json.loads(request.body.decode('utf-8'))
#             user_message = data.get("message")
#             context=data.get("context")

#             print(f"Received message: {user_message}")  # Logging for debugging

#             if user_message:
#                 # Initialize the model and generate a response
#                 model = genai.GenerativeModel(
#                     model_name="gemini-1.5-flash",
#                     system_instruction=f"these are the tools and their description available in the database {get_data_from_sql()}, answer precisely on the availability, price and other relavent information",
#                     )
#                 response = model.generate_content({user_message})
#                 print(f"Generated response: {response.text}")  # Log the generated response

#                 # Return the generated response in JSON format
#                 return JsonResponse({"response": response.text})
#             else:
#                 return JsonResponse({"error": "No message provided"}, status=400)
#         except json.JSONDecodeError:
#             return JsonResponse({"error": "Invalid JSON"}, status=400)
#     else:
#         return JsonResponse({"error": "Invalid request method"}, status=405)


    

# @csrf_exempt  # Important for POST requests from the frontend
# def gemini_chatbot(request):
#     if request.method == "POST":
#         user_message = request.POST.get("message")
#         context = request.POST.get("context", "")  # Optional existing conversation context

#         # Query SQL based on user input
#         sql_results = get_data_from_sql(user_message)

#         # Format context message to include SQL results
#         if sql_results:
#             context += "\n\nHere's what I found in the database:\n" + "\n".join(
#                 [f"- {tool['name']}: {tool['description']} (${tool['price']})" for tool in sql_results]
#             )


#         headers = {
#             "Content-Type": "application/json",
#             "Authorization": f"Bearer {gemini_api_key}",
#         }
#         data = {
#             "model": "gemini",  # Or another Gemini Pro model
#             "prompt": f"{context}\nUser: {user_message}",
#             "temperature": 0.7, # Adjust temperature as needed
#             "max_tokens": 250,   # Adjust response length as needed
#         }

#         try:
#             # response = requests.post("https://api.gemini.google.cloud/v1/completions", headers=headers, json=data)
#             response = requests.post(f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-002:generateContent?key={gemini_api_key}")
#             response.raise_for_status()  # Raise an exception for HTTP errors (4xx or 5xx)
#             gemini_response = response.json()["choices"][0]["message"]["content"]
#             return JsonResponse({"message": gemini_response})
#         except requests.exceptions.RequestException as e:
#             print(f"Error communicating with Gemini API: {e}")
#             return JsonResponse({"error": "Error communicating with chatbot."}, status=500)
#     else:
#       return JsonResponse({"error": "Only POST requests allowed"}, status=405)
    
# def gemini_chatbot(request):
#     # Fetch data from your database (e.g., Customers, Tools)
#     customers = list(Customer.objects.values())
#     tools = list(Tool.objects.values())
#     payload = {
#         "customers": customers,
#         "tools": tools,
#     }

#     # Set up headers and make request to Gemini API
#     headers = {
#         "Authorization": f"Bearer {gemini_api_key}",
#         "Content-Type": "application/json",
#     }

#     response = requests.post(
#         f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-002:generateContent?key={gemini_api_key}", json=payload, headers=headers
#     )

#     if response.status_code == 200:
#         return JsonResponse(response.json())
#     else:
#         return JsonResponse({"error": "Failed to get response from Gemini API"}, status=500)
    

class SupplierViewSet(viewsets.ModelViewSet):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        sname = self.request.query_params.get('sname')
        if sname:
            queryset = queryset.filter(sname__icontains=sname)
        return queryset
    

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        cname = self.request.query_params.get('cname')
        if cname:
            queryset = queryset.filter(cname__icontains=cname)
        return queryset


class ToolViewSet(viewsets.ModelViewSet):
    queryset = Tool.objects.all()
    serializer_class = ToolSerializer
    permission_classes = [permissions.AllowAny]
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def rent(self, request, pk=None):
        tool = self.get_object()
        customer_id = request.data.get('customer_id')  # Get customer ID from request data
        customer = Customer.objects.get(id=customer_id)

        if tool.availability and tool.quantity > 0:
            Rental.objects.create(tool=tool, user=customer)
            tool.quantity -= 1
            tool.availability = tool.quantity > 0
            tool.save()
            return Response({'status': 'Tool rented successfully'}, status=status.HTTP_200_OK)
        return Response({'status': 'Tool not available'}, status=status.HTTP_400_BAD_REQUEST)

        
    # @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    # def rent(self, request, pk=None):
    #     tool = self.get_object()
    #     if tool.availability and tool.quantity > 0:
    #         Rental.objects.create(tool=tool, user=request.user)
    #         tool.quantity -= 1
    #         tool.availability = tool.quantity > 0
    #         tool.save()
    #         return Response({'status': 'Tool rented successfully'}, status=status.HTTP_200_OK)
    #     return Response({'status': 'Tool not available'}, status=status.HTTP_400_BAD_REQUEST)


# class RentalViewSet(viewsets.ModelViewSet):
#     queryset = Rental.objects.all()
#     serializer_class = RentalSerializer
#     permission_classes = [permissions.AllowAny]
#     @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
#     def get_queryset(self):
#         return self.queryset.all()

class RentalViewSet(viewsets.ModelViewSet):
    queryset = Rental.objects.all()
    serializer_class = RentalSerializer

    @action(detail=True, methods=['post'])
    def generate_invoice(self, request, pk=None):
        rental = self.get_object()
        
        # Make sure the rental is returned, otherwise cannot create invoice
        if not rental.return_date:
            return Response({"detail": "Rental is not yet returned."}, status=400)

        # Create an invoice based on the rental data
        invoice = Invoice.objects.create(
            rental=rental,
            customer=rental.user,
            tool=rental.tool,
            rental_date=rental.rental_date,
            return_date=rental.return_date,
            price_per_day=rental.tool.price_per_day
        )
        
        return Response(InvoiceSerializer(invoice).data, status=201)

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "user": {
                    "username": user.username,
                    "email": user.email,
                }
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RegisterTool(APIView):
    def post(self, request, *args, **kwargs):
        serializer = RegisterToolSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

