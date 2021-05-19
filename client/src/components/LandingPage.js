import { BiCycling, BiSwim, BiRun } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const LandingPage = () => {
    // const [scrollPos, setScrollPos] = useState(0)
    // const [desktopWidth, setDesktopWidth] = useState(0)
    // const [smartWidth, setSmartWidth] = useState(0)
    // const [smartTranslate, setSmartTranslate] = useState(-window.innerWidth)
    // const [desktopOpacity, setDesktopOpacity] = useState(100)
    // const [desktopTranslate, setDesktopTranslate] = useState(window.innerWidth)
   
    // useEffect(() => {
    //     const onScroll = () => {
    //       setScrollPos(window.scrollY)
    //     }
    
    //     window.addEventListener('scroll', onScroll)
    //     if (scrollPos > 0) {
    //     desktopTranslate <= (-window.innerWidth+desktopWidth)/2 ? setDesktopTranslate((-window.innerWidth+desktopWidth)/2) : setDesktopTranslate(desktopWidth+100-scrollPos*1.75)
    //     scrollPos < (200 + desktopWidth + window.innerWidth)/3.5 && setDesktopTranslate(desktopWidth+100-scrollPos*1.75)
    //     scrollPos < (200 + desktopWidth + window.innerWidth)/3.5 + 400 && setDesktopOpacity(100)
    //     scrollPos > (200 + desktopWidth + window.innerWidth)/3.5 + 400 && setDesktopOpacity(100-scrollPos/25)
    
    //     smartTranslate >= (window.innerWidth-smartWidth)/2 ? setSmartTranslate((window.innerWidth-smartWidth)/2) : setSmartTranslate(-4*smartWidth+scrollPos)
    //     scrollPos < (window.innerWidth+7*smartWidth)/2 && setSmartTranslate(-4*smartWidth+scrollPos)
    //     }
    //     setDesktopWidth(document.getElementById('desktopDiv').getBoundingClientRect().width)
    //     setSmartWidth(document.getElementById('smartDiv').getBoundingClientRect().width)
       
    //     return () => {
    //       window.removeEventListener('scroll', onScroll)
    //     }

    //   }, [scrollPos, desktopTranslate, smartTranslate, desktopWidth, smartWidth])

    return (
        <>                                                   
          <div className='appcontainer'>
            <div className='container'>
              <div className='row landingContainer'>

                <div className='col d-flex justify-content-center align-items-center'>
                  <h1 className='landingText'>Store and manage your workouts</h1> 
                </div>

                <div className='col d-flex justify-content-center align-items-center'>
                  <BiCycling className='landingLogo' /> 
                  <BiRun className='landingLogo' />
                  <BiSwim className='landingLogo' />
                </div>

              </div>            

              <div className='col d-flex justify-content-center align-items-center' style={{paddingBottom: '50px'}}>
                <Link className="btn btnCTA" to='/signup'>SIGN UP</Link>
              </div>
            </div>
          </div>

          {/* <div className='container' style={{marginTop: '100px', height: '3000px'}}>

            <div id='desktopDiv' style={{ position: 'fixed', right: '0', bottom: '100px', transform: `translateX(${desktopTranslate}px)`, opacity: `${desktopOpacity}%` }}>
              <picture>
                <source media="(max-width:500px)" srcSet="https://i.postimg.cc/c4jZ6Xcd/082065f5d7b560b8f9c4c66c94b1429e-1-2-3.png"/>
                <source media="(max-width:1000px)" srcSet="https://i.postimg.cc/tT8FmQgC/desktopsmall.png"/>
                <source media="(max-height:900px)" srcSet="https://i.postimg.cc/tT8FmQgC/desktopsmall.png"/>
                <source media="(max-width:1500px)" srcSet="https://i.postimg.cc/Dvp6bRnN/desktopmed.png"/>
                <img alt='' src="https://i.postimg.cc/WT5Zp0p9/desktopbig.png"></img>
              </picture>
            </div>

            <div id='smartDiv' style={{ position: 'fixed', left: '0', bottom: '150px', transform: `translateX(${smartTranslate}px)`, opacity: `100%` }}>
              <picture>
                  <source media="(max-width:500px)" srcSet="https://i.postimg.cc/YSqNvzVk/smartsmall.png"/>
                  <source media="(max-width:1200px)" srcSet="https://i.postimg.cc/bvCxk2cn/smartmed.png"/>
                  <source media="(max-height:900px)" srcSet="https://i.postimg.cc/bvCxk2cn/smartmed.png"/>
                  <img alt='' src="https://i.postimg.cc/RFWcRV4D/smartbig.png"></img>
                </picture>
            </div>

          </div> */}
        </>
    )
}

export default LandingPage
