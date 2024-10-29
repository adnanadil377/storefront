from rest_framework import viewsets, permissions
from .models import Tool, Rental, Supplier, Customer
from .serializers import ToolSerializer, RentalSerializer,RegisterToolSerializer, SupplierSerializer,CustomerSerializer
from rest_framework.decorators import action,api_view
from rest_framework.views import APIView

from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from .serializers import RegisterSerializer
from rest_framework.response import Response

class SupplierViewSet(viewsets.ModelViewSet):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer

    def get_queryset(self):
        queryset = super().get_queryset()  # Get the default queryset
        sname = self.request.query_params.get('sname', None)  # Get sname from query parameters
        if sname is not None:
            queryset = queryset.filter(sname__icontains=sname)  # Filter suppliers by name
        return queryset
    

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

    def get_queryset(self):
        queryset = super().get_queryset()  # Get the default queryset
        cname = self.request.query_params.get('cname', None)  # Get sname from query parameters
        if cname is not None:
            queryset = queryset.filter(cname__icontains=cname)  # Filter suppliers by name
        return queryset

class ToolViewSet(viewsets.ModelViewSet):
    queryset = Tool.objects.all()
    serializer_class = ToolSerializer
    permission_classes = [permissions.AllowAny]

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def rent(self, request, pk=None):
        tool = self.get_object()
        if tool.availability and tool.quantity > 0:
            Rental.objects.create(tool=tool, user=request.user)
            tool.quantity -= 1
            if tool.quantity == 0:
                tool.availability = False
            tool.save()
            return Response({'status': 'tool rented'})
        else:
            return Response({'status': 'tool not available'}, status=400)

class RentalViewSet(viewsets.ModelViewSet):
    queryset = Rental.objects.all()
    serializer_class = RentalSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

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
# # @api_view(['POST'])
# # def registerTool(request):
# #     serializer=tool(data=request.data)
# #     if serializer.is_valid():
# #         serializer.save()
# #         return Response({'message':'Reg succes'},status=status.HTTP_200_OK)
# #     return Response({'message':'Reg unsucces'},status=status.HTTP_400_BAD_REQUEST)
