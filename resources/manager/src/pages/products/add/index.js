import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import ProductForm from '../form/index'


class AddProduct extends Component {
  product = {
    title: "Cavatelli Cinghiale ttt g", 
    category: "PA", 
    description: "Homemade cavatelli with braised wild boar, porcini mushrooms, Grana Padano, rosemary, and white truffle oil.", 
    discountPrice: "0", 
    label: "P", 
    price: "19", 
    slug: "cavatelli-cinghiale", 
  }

  render() {
    return (
      <div>
        <Helmet title="Add: Product" />
        <div className="kit__utils__heading">
          <h5>Fill the details of the product into this form to add a new product to your restaurant</h5>
        </div>
        <ProductForm type="Create" product={this.product} />
      </div>
    )
  }
}

export default AddProduct