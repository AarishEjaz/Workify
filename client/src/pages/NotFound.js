import React from 'react'
import {Link} from 'react-router-dom'
const NotFound = () => {
  return (
    <div>
     <h1>not found</h1>
     <Link className='btn btn-success' to ='/'>Go back </Link>

    </div>

  )
}

export default NotFound