from django.urls import path
from .products import ProductListView, ManageProductListView, ProductDetailView, ManagerProductDetailView
from .customers import CustomerListView, CustomerDetailView
app_name = 'core'

# urlpatterns = [
#     path('', HomeView.as_view(), name='home'),
#     path('checkout/', CheckoutView.as_view(), name='checkout'),
#     path('order-summary/', OrderSummaryView.as_view(), name='order-summary'),
#     path('product/<slug>/', ItemDetailView.as_view(), name='product'),
#     path('add-to-cart/<slug>/', add_to_cart, name='add-to-cart'),
#     path('add-coupon/', AddCouponView.as_view(), name='add-coupon'),
#     path('remove-from-cart/<slug>/', remove_from_cart, name='remove-from-cart'),
#     path('remove-item-from-cart/<slug>/', remove_single_item_from_cart,
#          name='remove-single-item-from-cart'),
#     path('payment/<payment_option>/', PaymentView.as_view(), name='payment'),
#     path('request-refund/', RequestRefundView.as_view(), name='request-refund')
# ]


urlpatterns = [
    # Products
    path('products/', ProductListView.as_view(), name='products'), 
    path('products/<int:pk>', ProductDetailView.as_view(), name='products-detail'), 
    path('manage/products/', ManageProductListView.as_view(), name='manage-products'), 
    path('manage/products/<int:pk>', ManagerProductDetailView.as_view(), name='manage-products-details'),
    
    # Customers
    path('customers/', CustomerListView.as_view(), name='products'), 
    path('customers/<int:pk>', CustomerDetailView.as_view(), name='customers-detail')
]