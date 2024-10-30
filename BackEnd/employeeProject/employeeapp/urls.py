from django.urls import path
from .views import *

urlpatterns = [
    path('create/', EmployeeCreate.as_view(),name='create' ),
    path('detail/<int:pk>/',EmployeeDetail.as_view(), name='detail'),
    path('update/<int:pk>/',EmployeeUpdate.as_view(),name='update'),
    path('delete/<int:pk>/',EmployeeDelete.as_view(),name='delete'),

    path('users/', UsersCreate.as_view(),name='users' ),
    path('user-login/', LoginView.as_view(),name='user_login')
]