import { useParams } from 'react-router-dom';
import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, ListGroupItem, Form } from 'react-bootstrap'
import Rating from '../Components/Rating'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { listProductDetails } from '../actions/productActions'
import { useNavigate } from 'react-router-dom';

function ProductScreen({match}) {
  const [qty, setQty] = useState(1)
  const dispatch = useDispatch()
  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product} = productDetails
  const {id} = useParams();
  const navigate = useNavigate();

 useEffect(() => {
    dispatch(listProductDetails(id))


    
    }, [dispatch, match])
    const addToCartHandler = () => {
      navigate(`/cart/${id}?qty=${qty}`)
    
    }
   
  return (
    <div>
     <Link to='/' className='btn btn-light my-3'>Go back</Link>
     {
      loading ?
      <Loader />
      : error
      ? <Message variant='danger'>{error}</Message>
      :(
        <Row>
        <Col md = {6}>
          <Image src={product.image} alt={product.name} fluid />
        
        </Col>
        <Col md = {3}>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <h3>{product.name}</h3>
            </ListGroupItem>
            <ListGroupItem>
              <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
            </ListGroupItem>
            <ListGroupItem>
              Price: ₹{product.price}
            </ListGroupItem>
            <ListGroupItem>
              Description: {product.description}
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <Row>
                  <Col>
                  Price:
                  </Col>
                  <Col>
                  <strong>₹{product.price}</strong>
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>
                  Status:
                  </Col>
                  <Col>
                  {product.countInStock > 0 ? 'In Stock' : 'Out of stock'}
                  </Col>
                </Row>
              </ListGroupItem>
              {product.countInStock >0 && (
                <ListGroupItem>
                  <Row>
                    <Col>qty</Col>
                    <Col xs='auto' className='my-1'>
                    <Form.Control
                    as="select"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)} 
                    >
                      {
                        [...Array(product.countInStock).keys()].map((x)=>
                        (
                          <option key={x+1} value={x+1}>
                            {x+1}
                          </option>
                        )
                        
                        )
                      }

                    </Form.Control>
                    </Col>
                  </Row>
                </ListGroupItem>
              )
              }
              <ListGroupItem>
                <Button 
                onClick={addToCartHandler}
                className='btn-block' disabled={product.countInStock == 0}  type='button'>
                  Add to cart
  
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
       </Row>
      )

     }
     
    </div>
  )
}

export default ProductScreen