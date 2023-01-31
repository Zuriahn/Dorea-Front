import React from 'react'
import RequestCmp from "../request_cmp/RequestCmp"
import "./requests.css"
import {Container} from 'react-bootstrap'

export default function Requests({projectapplications}) {
  return (
    <>
    <Container fluid className="mt-4 requests">
      {projectapplications.map(a=>(
        <RequestCmp key={a._id} application={a}/>
      ))
      }
    </Container>
    </>
  )
}
