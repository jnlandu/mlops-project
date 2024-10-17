import PropTypes from 'prop-types'
import React from 'react'

const Welcome = ({textBody, textHeader}) => {
  return (
    <div className="container text-center welcome">
       <div className='mb-2 mt-1'>
         <h1 className='mb-0'> Welcome! </h1>
          <small className="h6 mt-0 mb-2 small">
          Okapi AI, Making your life easier is our priority.
          </small>
         </div>
          <p> 
            <span className="mb-2">
              {textHeader} <br/>
            </span>
          </p> 
          <p>
            {textBody}    
         </p>
     </div>
  )
}
// Welcome.defaultProps = {
//   textHeader: 'Welcome to the chatbot',
// }
Welcome.propTypes = {
  textHeader: PropTypes.string,
  textBody: PropTypes.string
}
export default Welcome