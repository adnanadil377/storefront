# from django.urls import path, include
# from rest_framework import routers
# from .views import ToolViewSet, RentalViewSet,SupplierViewSet
# from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
# from .views import RegisterView
# from .views import RegisterTool

# router = routers.DefaultRouter()
# router.register(r'tools', ToolViewSet)
# router.register(r'rentals', RentalViewSet)
# router.register(r'suppliers', SupplierViewSet)

# urlpatterns = [
#     path('', include(router.urls)),
#     path('register/', RegisterView.as_view(), name='register'),
#     path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
#     path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
#     path('tools/',RegisterTool.as_view(),name="tools"),
#     path('suppliers/',SupplierViewSet.as_view(),name="suppliers"),
#     path('toolreg/',RegisterTool.as_view(),name="toolreg"),

# ]
from django.urls import path, include
from rest_framework import routers
from .views import ToolViewSet, RentalViewSet, SupplierViewSet, RegisterView, RegisterTool, CustomerViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# Initialize the router and register the viewsets
router = routers.DefaultRouter()
router.register(r'tools', ToolViewSet)
router.register(r'rentals', RentalViewSet)
router.register(r'suppliers', SupplierViewSet)
router.register(r'customers', CustomerViewSet)

urlpatterns = [
    path('', include(router.urls)),  # Include all routes registered with the router
    path('register/', RegisterView.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('tools/',RegisterTool.as_view(),name="tools"),

    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('tools/register/', RegisterTool.as_view(), name='register_tool'),  # More descriptive endpoint
]
