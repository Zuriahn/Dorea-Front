import React from 'react'
import PublicationCmp from '../publication_cmp/PublicationCmp'
import "./publications.css"
import {Container} from 'react-bootstrap'

export default function Publications({projectpublications}) {
  return (
    <>
    <Container fluid className="publications">
      {projectpublications.map(p=>(
        <PublicationCmp key={p._id} publication={p}/>
      ))
      }
    </Container>
    </>
  )
}
