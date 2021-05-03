import React from 'react'
import { BiCopyright } from "react-icons/bi";
import { VscGithubInverted } from "react-icons/vsc";

const Footer = () => {
    return (
        <div style={{marginTop: '150px', paddingBottom: '30px', textAlign: 'center'}}>
            <h4><BiCopyright /> 2021 WORKOUTS </h4>
            <a className='footerIcon' href="https://github.com/greed-hub"><VscGithubInverted style={{fontSize: '30px'}} /></a>
        </div>
    )
}

export default Footer
