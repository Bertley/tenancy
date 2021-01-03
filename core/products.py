from .models import Item, CATEGORY_CHOICES, LABEL_CHOICES
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import serializers
from rest_framework.permissions import IsAdminUser
from rest_framework.decorators import permission_classes
from rest_framework.pagination import PageNumberPagination

class BasicPagination(PageNumberPagination):
    page_size_query_param = 'limit'

class ProductSerizalizer(serializers.Serializer): 
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(required=False, allow_blank=True, max_length=100)
    price = serializers.FloatField()
    discount_price = serializers.FloatField()
    category = serializers.CharField(max_length=2)
    label = serializers.CharField(max_length=1)
    slug = serializers.SlugField()
    description = serializers.CharField()
    image = serializers.ImageField(required=False, max_length=None, 
                                     allow_empty_file=True, use_url=True)

    def create(self, validated_data):
        """
        Create and return a new `Product` instance, given the validated data.
        """
        return Item.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `product` instance, given the validated data.
        """
        instance.title = validated_data.get('title', instance.title)
        instance.price = validated_data.get('price', instance.price)
        instance.discount_price = validated_data.get('discount_price', instance.discount_price)
        instance.category = validated_data.get('category', instance.category)
        instance.label = validated_data.get('label', instance.label)
        instance.slug = validated_data.get('slug', instance.slug)
        instance.description = validated_data.get('description', instance.description)
        instance.image = validated_data.get('image', instance.image)
        instance.save()
        return instance

class ProductListView(APIView):
    """
    List all products, or create a new product.
    """
    serializer_class = ProductSerizalizer
    
    def get(self, request, format=None):
        products = Item.objects.all()
        serializer = self.serializer_class(products, many=True)
        return Response(serializer.data)
    

class ManageProductListView(APIView):

    permission_classes = (IsAdminUser,)
    
    def post(self, request, format=None):
        serializer = ProductSerizalizer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductDetailView(APIView): 
    """
    Retrieve, update or delete a product instance.
    """
    def get_object(self, pk):
        try:
            return Item.objects.get(pk=pk)
        except Item.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        product = self.get_object(pk)
        serializer = ProductSerizalizer(product)
        return Response(serializer.data)

class ManagerProductDetailView(APIView):

    permission_classes = (IsAdminUser,)

    def get_object(self, pk):
        try:
            return Item.objects.get(pk=pk)
        except Item.DoesNotExist:
            raise Http404
        
    def put(self, request, pk, format=None):
        product = self.get_object(pk)
        serializer = ProductSerizalizer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        product = self.get_object(pk)
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)