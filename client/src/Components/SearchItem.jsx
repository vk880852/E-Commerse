import React from 'react';
import { useSearch } from '../context/SearchContext.jsx';
import { Layout, Card, Col, Row, Button } from 'antd';
import {useNavigate} from 'react-router-dom'

const { Meta } = Card;

const SearchItem = () => {
  const [value, setValue] = useSearch();
  console.log(value);
  const navigate=useNavigate();
  return (
    <Layout style={{ padding: '0 24px 24px' }}>
      <h1 className='text-center'>All Search Items</h1>
      <Row gutter={[16, 16]}>
        {value?.result.map((productItem) => (
          <Col key={productItem._id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={<img alt={productItem.name} src={`http://localhost:8000/api/v1/getphoto/product/${productItem._id}`} />}
            >
              <Meta title={productItem.name} description={productItem.description} />
              <div style={{ marginTop: '10px', textAlign: 'center' }}>
                <p>${productItem.price}</p>
                <Button type="primary" onClick={()=>navigate(`/${productItem.slug}`)}>More Details</Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Layout>
  );
};

export default SearchItem;
