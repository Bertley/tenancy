import React from 'react'
import style from './style.module.scss'

const Footer = () => {
  return (
    <div className={style.footer}>
      <div className={style.footerInner}>
        <a
          href="http://business.localhost:8000"
          target="_blank"
          rel="noopener noreferrer"
          className={style.logo}
        >
          BUSINESS
          <span />
        </a>
        <br />
        <p className="mb-0">
          Copyright © 2017-2020 Business 
          {/* <a href="https://www.mediatec.org/privacy" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a> */}
        </p>
      </div>
    </div>
  )
}

export default Footer
