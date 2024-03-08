import React  from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

function Footer() {
  return (
    <div className='footer'>
      <Container>
        <div className='row'>
          <div className='col-lg-12'>
          <Nav defaultActiveKey="/home" >
            <Nav.Link href="/home" className=''>Copyright</Nav.Link>
          </Nav>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Footer;