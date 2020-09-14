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
            <div id="id02" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', border: '0px solid #000000'}}>
                {endpointData && endpointData.data.map((ele,ind) => {
                    return(
                        <div className="IndividualCard" style={{backgroundColor: ele.color,borderBottomLeftRadius: 16 }}
                             onClick={() => {
                                 setShowLightBox(!showLightbox)
                                 setLightboxData(ele)
                             }}
                        >
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
            <div
                style={{height: 600, width: 630, backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center',
                justifyContent: 'center', margin: 'auto',
                    position: 'absolute',
                    top: 0, left: 0, bottom: 0, right: 0, flexDirection: 'column', padding: '2em',
                borderRadius: 32
            }}>

                    <div style={{height: 50, width: 50, backgroundColor: '#000000', borderRadius: 25}} onClick={() => setShowLightBox(false)}/>
                    <div style={{height: 200, width: 200, backgroundColor: lightboxData.color, borderRadius: 100}}/>
                    <h1>{lightboxData.name.charAt(0).toUpperCase() + lightboxData.name.slice(1)}</h1>
                    <h3>{lightboxData.year}</h3>
                    <p>{dummyDescription}</p>
            </div>
        )
    }


    // Event Handler for when clicking outside of lightbox
    const modal = document.getElementById('id01');
    const container = document.getElementById('id02');
    window.onclick = function(event) {
        // console.log('eventTarget', event.target)
        // console.log('modal clikced', event.target  === container)
        if (event.target === container  || event.target === modal ) {
            setShowLightBox(false)
        }
    }

    return (
        <div className="App" >
            {/*<div className="Container" style={ {filter: showLightbox ? "blur(1px)" : null }}>*/}
            <div className="Container" id="id01">
                {displayData()}
                {showLightbox ? lightBox() : null}
            </div>
        </div>
      );
}

export default App;
