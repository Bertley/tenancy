import React, { useState, useCallback } from 'react'
import { connect } from 'react-redux'
import { Input, Form, Select } from 'antd'
import ImageUploader from '../upload'


const { Option } = Select

const mapStateToProps = ({user, dispatch}) => ({
  user, 
  dispatch
})

const ProductForm = ({dispatch, type, product}) => {

  const onFinish = values => {
    switch (type) {
      case "Update": 
        console.log(`Product ${product.id}`)
        dispatch({
          type: 'products/UPDATE', 
          payload: { "slug" : product.id, values}
        })
        break
      default: 
        dispatch({
          type: 'products/CREATE', 
          payload: values
        })
    }
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  const [title, setTitle] = useState(product.title)
  const [category, setCategory ] = useState(product.category)
  const [description, setDescription] = useState(product.description)
  const [discountPrice, setDiscountPrice] = useState(product.discount_price)
  const [label, setLabel] = useState(product.label)
  const [price, setPrice] = useState(product.price)
  const [slug, setSlug] = useState(product.slug)
  // const [images, setImages] = useState(product.images)

  const handleTitleChange = useCallback((value) => setTitle(value), []);
  const handleCategoryChange = useCallback((value) => setCategory(value), []);
  const handleDescriptionChange = useCallback((value) => setDescription(value), []);
  const handleDiscountChange = useCallback((value) => setDiscountPrice(value), []);
  const handleLabelChange = useCallback((value) => setLabel(value), []);
  const handlePriceChange = useCallback((value) => setPrice(value), []);
  const handleSlugChange = useCallback((value) => setSlug(value), []);

  const categories = [
    {
      value: 'pa',
      label: 'Pasta',
    },
    {
      value: 'de',
      label: 'Desert',
    }
  ]

  const labels = [
    {
      value: 'p',
      label: 'Primary',
    },
    {
      value: 's',
      label: 'Secondary',
    }
  ]

  return (
    <div className="card">
      <div className="card-body">
        <Form 
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={product}
        >
          <div className="row">
            <div className="col-12">
              <Form.Item 
                name="title" 
                label="Title"
                rules={[{required: true, message: 'Product title is required'}]}
              >
                <Input onChange={handleTitleChange} value={title} placeholder="Product title." />
              </Form.Item>
            </div>
            <div className="col-12">
              <Form.Item name="description" label="Description">
                <Input.TextArea onChange={handleDescriptionChange} value={description} rows={4} />
              </Form.Item>
            </div>
            <div className="col-12">
              <Form.Item name="slug" label="Slug">
                <Input onChange={handleSlugChange} placeholder="Product slug." value={slug} />
              </Form.Item>
            </div>
            <div className="col-6">
              <Form.Item name="price">
                <Input onChange={handlePriceChange} value={price} placeholder="Product Price" addonBefore="$" addonAfter=".00" />
              </Form.Item>
            </div>
            <div className="col-6">
              <Form.Item name="discount_price">
                <Input onChange={handleDiscountChange} value={discountPrice} placeholder="Discount Price" addonBefore="$" />
              </Form.Item>
            </div>
            <div className="col-6">
              <Form.Item name="category" label="Category">
                <Select onChange={handleCategoryChange} value={category} placeholder="Select a category">
                  {categories && categories.map( val => (
                    <Option key={val.value} value={val.value}>{val.label}</Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-6">
              <Form.Item name="label" label="Label">
                <Select onChange={handleLabelChange} value={label} placeholder="Select a label">
                  {labels && labels.map( val => (
                    <Option key={val.value} value={val.value}>{val.label}</Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-12">
              <Form.Item name="images" label="images">
                <ImageUploader />
              </Form.Item>
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-success px-5">
                {`${type} Product`}
              </button>
            </div>
          </div> 
        </Form>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(ProductForm)
