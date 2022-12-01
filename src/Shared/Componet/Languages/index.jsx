import React from 'react'
import './language.scss'
import PropTypes from 'prop-types'
import { UserContext } from '../../../App'

function Lang ({ flag }) {
  const value = React.useContext(UserContext)
  return (
        <>
        <div className="language_background">
            <div className="temp_back" onClick={() => flag()}></div>
            <div className="laguages" onClick={() => flag()}>
                <button onClick={value('en')}>English</button>
                <button onClick={value('hi')}>Hindi</button>
                <button onClick={value('gu')}>Gujrati</button>
            </div>
        </div>
        </>
  )
}
Lang.propTypes = {
  flag: PropTypes.func
}
export default Lang
