import React, { useState } from 'react';
import Navbar from './Navbar';
import "../css/main.css";
// import { FaArrowRightLong } from "react-icons/fa6";



const LandingPage = () => {
    return (
        <>
            <Navbar />
            <div className='main'>
                <div className='landing'>
                    {/* <div className='container-1'> */}
                    <div className='grid1'>
                        <h1>“Discover Your Well-being”</h1>
                        <p>Embark on a journey towards better mental health.  Our comprehensive<br></br>
                            questionnaire is designed to offer insights into your emotional well-being,<br></br>
                            providing personalized recommendations to support your mental wellness.
                        </p>
                        <button className="land-button" >Get Started</button>
                    </div>
                    <div className='grid2'>
                        <img src='../assets/image.png' />
                    </div>
                </div>
                <div className='about'>
                    <div className='heading'>
                        <h1 > About Us</h1>
                    </div>
                    <p>We are dedicated to promoting mental health awareness and well-being. Our mission is to empower <br></br>
                        individuals with tools and insights  to enhance their emotional resilience.
                    </p>
                </div>
                <div className='provide'>
                    <div className='heading'>
                        <h1>What We Provide?</h1>
                    </div>
                    <div className='grid-container'>
                        <div className='grid-1'>
                            <img src='../assets/second.png'></img>
                            <p> Comprehensive Questions</p>
                        </div>
                        <div className='grid-2'>
                            <img src='../assets/first.png'></img>
                            <p> Personalized Recommendations</p>
                        </div>
                        <div className='grid-3'>
                            <img src='../assets/third.png'></img>
                            <p> Privacy and Security</p>
                        </div>
                    </div>
                </div>

                <div className='instruction'>
                    <div className='heading'>
                        <h1>How It Works?</h1>
                    </div>
                    <div className='instruction-container'>
                        <div className='ins-grid-1'>
                            <h2>STEP 1</h2>
                            <img src='../assets/image 3.png'></img>
                            <p>"Create an Account or Log In"</p>
                        </div>
                        {/* <div className='arrow'>
                           <FaArrowRightLong />
                        </div> */}
                        <div className='ins-grid-2'>
                            <h2>STEP 2</h2>
                            <img src='../assets/image 4.png'></img>
                            <p>"Answer Thoughtful Questions"</p>
                        </div>
                        <div className='ins-grid-3'>
                            <h2>STEP 3</h2>
                            <img src='../assets/image 5.png'></img>
                            <p>"Receive Result and Recommendations"</p>
                        </div>
                </div>

                </div>






            </div>
        
        </>
    );
}

export default LandingPage;
