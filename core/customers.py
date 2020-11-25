from .models import UserProfile
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import serializers
from rest_framework.permissions import IsAdminUser
from rest_framework.decorators import permission_classes
from rest_framework.pagination import PageNumberPagination
from users.serializers import UserSerializer, UserSerializerWithToken
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class BasicPagination(PageNumberPagination):
    page_size_query_param = 'limit'

class CustomerSerizalizer(serializers.Serializer): 
    id = serializers.IntegerField(read_only=True)
    user = UserSerializer(required=True)
    stripe_customer_id = serializers.CharField(required=False, allow_blank=True, max_length=100)
    one_click_purchasing = serializers.BooleanField()
    print('----')
    class Meta: 
        model = UserProfile
        fields = ('user', 'stripe_customer_id', 'one_click_purchasing')

    def create(self, validated_data):
        """
        Create and return a new `Product` instance, given the validated data.
        """
        user_data = validated_data.pop('user')
        user = UserSerializerWithToken.create(UserSerializerWithToken(), validated_data=user_data)
        profile = UserProfile.objects.update_or_create(
            user=user, 
            stripe_customer_id=validated_data.pop('stripe_customer_id'), 
            one_click_purchasing=validated_data.pop('one_click_purchasing')
        )
        return profile

class CustomerUpdateSerializer(serializers.Serializer):
    stripe_customer_id = serializers.CharField(required=False, allow_blank=True, max_length=100)
    one_click_purchasing = serializers.BooleanField()

    def update(self, instance, validated_data): 
        instance.stripe_customer_id = validated_data.get('stripe_customer_id', instance.stripe_customer_id)
        instance.one_click_purchasing = validated_data.get('one_click_purchasing', instance.one_click_purchasing)
        instance.save() 
        return instance

class CustomerListView(APIView): 

    def get(self, format=None): 
        customers = UserProfile.objects.all()
        serializer = CustomerSerizalizer(customers, many=True)
        return Response(serializer.data)

    def post(self, request): 
        serializer = CustomerSerizalizer(data=request.data)
        if serializer.is_valid(): 
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomerDetailView(APIView):
    def get_object(self, pk): 
        try: 
            return UserProfile.objects.get(pk=pk)
        except UserProfile.DoesNotExist: 
            return Http404

    def get(self, request, pk, format=None): 
        customer = self.get_object(pk)
        serializer = CustomerSerizalizer(customer)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        customer = self.get_object(pk)
        serializer = CustomerUpdateSerializer(customer, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        customer = self.get_object(pk)
        customer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)