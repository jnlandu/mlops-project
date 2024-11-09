import PropTypes from 'prop-types'
import React from 'react'

const Welcome = ({textBody, textHeader}) => {
  return (
    <div className="container text-center welcome">
         <h1 className='mb-0 text-bold'> Welcome! </h1>
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