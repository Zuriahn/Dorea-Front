import React from 'react'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import ErrorCmp from '../../components/error/error'
import { Container} from 'react-bootstrap'
import "./error.css"

export default function Error() {
  return (
    <>
    <Header/>
      <Container fluid className="errorPage">
        <ErrorCmp/>
      </Container>
    <Footer/>
    </>
  )
}
