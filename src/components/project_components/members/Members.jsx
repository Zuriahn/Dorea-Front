import React from 'react'
import MemberCmp from "../member_cmp/MemberCmp"
import "./members.css"
import {Container} from 'react-bootstrap'

export default function Members({projectmembers,condUser}) {
  return (
    <>
    <Container fluid className="mt-4 members">
      {projectmembers.map(m=>(
        <MemberCmp key={m._id} member={m} condUser={condUser}/>
      ))

      }
    </Container>
    </>
  )
}
