import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Tabs } from 'antd'
import style from './style.module.scss'

const { TabPane } = Tabs

const mapStateToProps = ({ user, products, dispatch}) => ({
  dispatch,
  user,
  product: products.product, 
})

const ProductDetails = ({ dispatch, product }) => {
  const {slug} = useParams(); 
  const [activeImgIndex, setActiveImgIndex] = useState(0)
  const [isFavourite, setIsFavourite] = useState(false)

  const setFavourite = e => {
    e.preventDefault()
    setIsFavourite(!isFavourite)
  }

  const setActiveImg = (e, index) => {
    e.preventDefault()
    setActiveImgIndex(index)
  }

  const handleDelete = e => {
    e.preventDefault()
    dispatch({
      type: 'products/DELETE', 
      payload: {
        slug
      }
    })
  }

  useEffect(() => {
    dispatch({
        type: 'products/LOAD', 
        payload: {
          slug
        }
    })
  }, [dispatch, slug])

  
  return (
    <div>
      <Helmet title="Product Details" />
      <div className="cui__utils__heading">
        <div className="d-flex flex-row-reverse">
          <Link className="text-blue font-size-18 mr-3" onClick={handleDelete}>
            Delete Product
          </Link>
          <Link className="text-blue font-size-18 mr-3" to={`/update/product/${product.id}`}>
            Update Product
          </Link>
        </div>
        <div className="d-flex flex-row mb-3">
          <strong>{product.title}</strong>
        </div>
      </div>
      <div className="card overflow-hidden">
        <div className={style.new}>New</div>
        <div className="card-body">
          <div className="row">
            <div className="col-lg-4">
              <a
                className={`${style.favourite} ${isFavourite ? 'text-dark' : 'text-gray-3'}`}
                href="#"
                onClick={setFavourite}
              >
                <i className="fe fe-heart font-size-21" />
              </a>
              <div className={`${style.image} height-250 mb-3`}>
                <img className="img-fluid" src={product.image} alt="Product" />
              </div>
              <div className="d-flex flex-wrap mb-3">
                {product.images && product.images.map((image, index) => (
                  <a
                    href="#"
                    className={`${index === activeImgIndex ? 'border-primary' : ''} ${
                      style.thumb
                    } width-100 height-100 border m-2`}
                    onClick={e => {
                      setActiveImg(e, index)
                    }}
                    key={image}
                  >
                    <img className="img-fluid" src={image} alt="Product" />
                  </a>
                ))}
              </div>
            </div>
            <div className="col-lg-8">
              <div className="font-size-24 font-weight-bold text-dark mb-2">
                {product.price - product.discount_price} {product.discount_price > 0 ? <del className="align-text-top font-size-14">{product.price}</del> : "" }
              </div>
              <div className="pb-3 mb-4 border-bottom">
                <p className="text-black font-size-18">
                  {product.title}
                </p>
              </div>
              <div className="mb-4 width-300">
                {`Category: ${product.category}`} {`Label: ${product.label}`}
              </div>
              <Tabs defaultActiveKey="1" className="kit-tabs-bordered">
                <TabPane tab="Description" key="1" />
              </Tabs>
              <div className="card-body px-0">
                {product.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(ProductDetails)
