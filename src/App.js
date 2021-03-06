import React, {useContext, useEffect, useState, useRef} from "react";
import logo from './logo.svg';
import './App.css';

/*

Consume the following GET endpoint:
https://reqres.in/api/unknown?per_page=12
It will return a JSON object. The data property of that object is an array of colors.

Using React:

- Fetch that endpoint.
- Render cards in the screen with each color. Each card should at least have the name of the color.
The cards (or part of the card's background) should have a background color representing itself
(you can use the HEX value). Have fun with it, get as creative as you want.
- Make it so that using only CSS, hovering on each card will make them zoom without shifting or
moving any adjacent cards.
- Finally, implement it so that clicking on any card will open a lightbox modal in the center of
the page, displaying any more details you want about that color. Clicking outside of the lightbox
should close it.
- If at any point during the exercise you want to break the spec above to get really creative and
 implement something you really like, please do so.

The solution has to use React and only functional components and hooks, no classes.
- To submit, simply fork this codepen, implement your solution and send it to us via LinkedIn
    or via email to antonio@usesilo.com.

*/


function App() {
    const [showLightbox, setShowLightBox]  = useState(false)
    const [lightboxData, setLightboxData]  = useState(null)
    const [endpointData, setEndpointData]  = useState(null)

    useEffect(() => {
        fetchEndpoint()
    }, []);

    const fetchEndpoint =  async () => {
        const url = 'https://reqres.in/api/unknown?per_page=12'
        await fetch(url).then( res => {
            return res.json()
        }).then(res => {
            setEndpointData(res)
        })
    }

    const dummyDescription = '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
        'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim' +
        ' veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' +
        ' Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla' +
        'pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt' +
        ' mollit anim id est laborum."'

    const displayData = () => {
        if(!endpointData){
            return
        }
        return(
            <div id="id02" className="CardContainer">
                {endpointData && endpointData.data.map((ele,ind) => {
                    return(
                        <div
                            className="IndividualCard"
                            style={{backgroundColor: ele.color,borderBottomLeftRadius: 16 }}
                            onClick={() => {
                                setShowLightBox(!showLightbox)
                                setLightboxData(ele)
                            }}>

                        <div/>

                            <div className="CardContent">
                                <h4>{ele.name.charAt(0).toUpperCase() + ele.name.slice(1)}</h4>
                                <p>{ele.year}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    const lightBox = () => {
        if(!lightboxData){
            return
        }
        return(
            <div className="LightBoxContainer">
                <div className="CloseButtonContainer" onClick={() => setShowLightBox(false)}>
                    <img src={require("./close_button.png")} height={50} width={50}/>
                </div>
                <div className="LightBoxContent">
                    <div style={{height: 200, width: 200, backgroundColor: lightboxData.color, borderRadius: 100}}/>
                    <h1>{lightboxData.name.charAt(0).toUpperCase() + lightboxData.name.slice(1)}</h1>
                    <h3>{lightboxData.year}</h3>
                    <p>{dummyDescription}</p>
                </div>
            </div>
        )
    }


    // Event Handler for when clicking outside of lightbox
    const modal = document.getElementById('id01');
    const container = document.getElementById('id02');
    window.onclick = function(event) {
        if (event.target === container  || event.target === modal ) {
            setShowLightBox(false)
        }
    }

    return (
        <div className="App" >
            <div className="headingContainer">
                <h1 className="headingTitle">
                    jobPostsAreWayTooLongSoWellMakeThisOneShort
                </h1>
            </div>

            <div className="Container" id="id01">
                {displayData()}
                {showLightbox ? lightBox() : null}
            </div>
        </div>
      );
}

export default App;
