import React from 'react'
import "./jobs.css"
import JobCmp from '../job_cmp/JobCmp'
import {Container} from 'react-bootstrap'

export default function Jobs({profilejobs, condUser}) {
  return (
    <>
    <Container fluid className="mt-1 jobs">
      {profilejobs.map(p=>(
          <JobCmp key={p._id} job={p} condUser={condUser}/>
      ))
      }
    </Container>
    </>
  )
}
