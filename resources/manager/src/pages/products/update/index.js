import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import ProductForm from '../form/index'

const mapStateToProps = ({ user, products, dispatch}) => ({
    dispatch,
    user,
    product: products.product, 
})
 

const UpdateProduct = ({ dispatch, product }) => {
  const { slug } = useParams()

  useEffect(() => {
      dispatch({
          type: 'products/LOAD', 
          payload: {
            slug
          }
      })
    }, 
    [dispatch, slug]
  )
  return (
    <div>
      <Helmet title="Update: Product" />
      <div className="kit__utils__heading">
        <h5>Update the details of the product in the form to add a new product to your restaurant</h5>
      </div>
      <ProductForm type="Update" product={product} />
    </div>
  )
}

export default connect(mapStateToProps)(UpdateProduct)