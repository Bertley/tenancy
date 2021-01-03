import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Pagination } from 'antd'
import General16 from 'components/thumbnails'

// import productsData from './data.json'

const mapStateToProps = ({ user, products, dispatch}) => ({
  dispatch,
  user,
  data: products.products, 
  pagination: {
    minValue: 0, 
    maxValue: 12, 
    numEachPage: 12
  }
})

class ProductCatalogue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minValue: 0,
      maxValue: 9
    };
  }

  componentDidMount () {
    const {dispatch} = this.props
    dispatch({
      type: 'products/LOAD_ALL'
    })
  }
  

  handleChange = value => {
    console.log(value)
    if (value <= 1) {
      this.setState({
        minValue: 0,
        maxValue: 9
      });
    } else {
      this.setState({
        minValue: (value * 9) - 9, 
        maxValue: value * 9
      });
    }
  };

  render() {
    const {data} = this.props
    const {minValue, maxValue} = this.state

    console.log(minValue)
    console.log(maxValue)
    return (
      <div>
        <Helmet title="Product Catalog" />
        <div className="cui__utils__heading">
          <div className="d-flex flex-row-reverse">
            <Link className="text-blue font-size-18" to="/add/product">
              Add Product
            </Link>
          </div>
          <div className="d-flex flex-row mb-3">
            <strong>Restuarant: Product Catalog</strong>
          </div>
        </div>
        <div className="row">
          {data &&
              data.length > 0 &&
              data.slice(minValue, maxValue).map(
                val => {
                  const { isNew, isFavorite, image, title, price, oldPrice, id } = val
                  return (
                    <div className="col-xl-4 col-lg-6" key={Math.random()}>
                      <General16
                        isNew={isNew}
                        isFavorite={isFavorite}
                        image={image}
                        name={title}
                        price={price}
                        oldPrice={oldPrice}
                        slug={id}
                      />
                    </div>
                  )
                }
              )
            }
        </div>
        <Pagination
          defaultCurrent={1}
          defaultPageSize={9}
          onChange={this.handleChange}
          total={data.length}
        />
      </div>
    );
  }
}


export default withRouter(connect(mapStateToProps)(ProductCatalogue))