import React, {useState, useEffect} from 'react'
import {TextField, Button} from '@material-ui/core'
import './NewSection.css';
import { useStateValue } from './StateProvider';
import './EntryBody.css'
import SubEntry from './SubEntry.js'

function EntryBody(props){

    const [sectionTitle, setSectionTitle] = useState(props.title)
    //const [isSectionTitleSet, setIsSectionTitleSet] = useState(props.isSet)
    const [sectionBody , setSectionBody] = useState(props.body)
    //const [isSectionBodySet, setIsSectionBodySet] = useState(props.isSet)
    const [{newSection, chapters}, dispatch] = useStateValue();
    const [isThisSet, setIsThisSet] = useState(true)

    const [mainEntry, setMainEntry] = useState(props.content)
    const [isMainEntrySet, setIsMainEntrySet] = useState(props.isSet)
    const [subEntries, setSubEntries] = useState(props.subEntries)
    const [isMinimized, setIsMinized] = useState(props.isMinimized)
    //const [isSubEntrySet, setIsSubEntrySet]

    const makeSectionTitle = () => {

    }

    const makeSection = (e) => {
        if(props.sectionIndex == chapters[props.chapterIndex].bodies.length ){
        
            dispatch({
                        type: 'MAKE_SECTION',
                        item:{
                            title: sectionTitle,
                            content: sectionBody,
                            entryIndex: props.entryIndex,
                            chapterIndex: props.chapterIndex,
                            sectionIndex: props.sectionIndex
                        }
                    })
        }else{ 
            dispatch({
                type: 'EDIT_SECTION',
                item:{
                    title: sectionTitle,
                    content: sectionBody,
                    entryIndex: props.entryIndex,
                    chapterIndex: props.chapterIndex,
                    sectionIndex: props.sectionIndex
                }
            })
        }
    }

    const saveEntry = (e) => {
        setIsMainEntrySet(true)
        dispatch({
            type: 'SAVE_ENTRY_BODY',
            item:{
                chapterIndex: props.chapterIndex,
                sectionIndex: props.sectionIndex,
                content: mainEntry,
                subEntries: subEntries,
                isMinimized: isMinimized,
                isSet: true
            }
        })
        console.log(chapters)
    }

    const addSubBody = (e) => {
        dispatch({
            type: 'ADD_SUB_BODY',
            item:{
                chapterIndex: props.chapterIndex,
                sectionIndex: props.sectionIndex,
                subEntryIndex: subEntries.length,
                content: '',
                isSet: false
                //subEntries: props.subEntries
            }
        })
    }

    const minimize = (e) => {
        dispatch({
            type: 'MINIMIZE_ENTRY_BODY',
            item:{
                chapterIndex: props.chapterIndex,
                sectionIndex: props.sectionIndex
            }
        })
    }

    const maximize = (e) => {
        dispatch({
            type: 'MAXIMIZE_ENTRY_BODY',
            item:{
                chapterIndex: props.chapterIndex,
                sectionIndex: props.sectionIndex
            }
        })
    }

    useEffect(() => {
       if(!props){
           //setSectionTitle('First Body')
           //setSectionBody('Click to change')
           //setIsSectionTitleSet(false)
           //setIsSectionBodySet(false)
           setIsThisSet(false)

       }
       console.log(chapters)
       console.log(subEntries)
    }, [])

    return(
        <div className="newsection"
            style={{
                marginLeft: '70px',
                marginTop: '15px',
                display: 'flex',
                flexDirection: 'row'
            }}
        >
            <div className="newsection__main"
                style={{
                    flexGrow: '1'
                }}
            >
                <div className="newsection__title">
                    {
                        isMainEntrySet
                        ?
                        <div className="newsection__finishTitle">
                            
                            <pre className="newsection__title">
                                
                                <pre 
                                    onClick={e => {
                                        setIsMainEntrySet(false)
                                        // setIsThisSet(false)
                                    }}
                                    style={{display:'flex', flexDirection:'row'}}
                                >
                                    <div  className="newsection__titleSymbol">
                                        &bull; 
                                    </div>
                                        
                                    &nbsp;&nbsp;{mainEntry}

                                </pre>
                                    {/* <span 
                                        className="newsection__edit"
                                        onClick={e => {setIsSectionTitleSet(false)}}    
                                    >
                                        
                                        //IF THE BODY HAS SUBENTRIES
                                        
                                    </span> */}
                            </pre>
                            
                        </div>
                        :
                        <form
                            onSubmit={e => {e.preventDefault()}}
                            //className="newEntry__title"
                        >
                            <div style={{display:'flex', flexDirection:'row', marginLeft: '5px'}}>
                                <div  className="newsection__titleSymbol">
                                    &bull; 
                                </div>
                                <TextField 
                                    id="outlined-multiline-flexible"
                                    multiline
                                    rows={3}
                                    placeholder="Enter section notes "
                                    value={mainEntry}
                                    onChange= {e => {setMainEntry(e.target.value)}}
                                    style={{marginLeft:'5px'}}
                                    inputProps={{style: {fontSize: 10}}}
                                />
                            
                            <button
                                type="submit"
                                onClick={saveEntry}
                                style={{
                                    height: '20px',
                                    marginRight: '5px'
                                }}
                            >
                                Set
                            </button>
                            <button
                                type="submit"
                                onClick={e => {setMainEntry(''); setIsMainEntrySet(true)}}
                                style={{height: '20px'}}
                            >
                                X
                            </button>
                            </div>
                        </form>
                    }
                </div>
                {
                    console.log(subEntries)
                    
                }
                <div>
                {
                    //TRANSLATION: If subentries exist at all, check to see if the component is minimized. If it is, just show one set of dots. If not, show all the sub bodies.
                        //This prevents from showing a set of dots for each subbody if component is indeed minimized
                    subEntries.length ?
                        !isMinimized ?
                            subEntries.map((entry, index) => {
                                return(
                                <SubEntry 
                                    isSet={entry.isSet}
                            
                                    content={entry.content}
                                
                                    chapterIndex={props.chapterIndex}
                                    sectionIndex={props.sectionIndex}
                                    subEntryIndex={index}
                                    key={Math.random()}
                                />
                                
                                )
                            }
                            
                            )
                        :
                        <div
                            style={{
                                marginLeft: '35px',
                                marginTop: '-20px',
                                marginBottom: '15px'
                            }}
                        >. . . . .</div>
                    :
                    null
                    
                }
                </div>
                {
                    !isMinimized ?
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}
                >
                    <div  
                        className="entryBody_subEntryAddSymbol"
                        style={{
                            // marginLeft: '50px'
                            marginTop: '5px'
                        }}
                    >
                        &bull; 
                    </div>
                    <button
                        style={{
                            marginLeft: '10px',
                            fontSize: '10px',
                            width: '35px',
                            marginTop: '5px'
                        }}
                        onClick={addSubBody}
                    >
                        Add
                    </button>
                </div>
                :
                <></>
                }
                

                
                
                </div>
            <div className="newsection__delete">
                {
                    isMainEntrySet
                    ?
                    <div
                        style={{
                            display:'flex',
                            flexDirection:'row'
                        }}
                        className="entrybody__options"
                    >
                        <span
                            style={{
                                marginRight: '15px',
                                fontSize: '16px',
                                hover: 'backgroundColor: grey'
                            }}
                            //onClick={e => {setIsMinized(true)}}
                            onClick={minimize}
                        >
                            &minus;
                        </span>
                        <span
                            style={{
                                fontSize: '16px',
                                marginRight: '15px'
                            }}
                            //onClick={e => {setIsMinized(false)}}
                            onClick={maximize}
                        >
                            &#65291;
                        </span>
                        <span
                            onClick={e=>{
                                
                                dispatch({
                                    type: 'DELETE_SECTION',
                                    item:{
                                        chapterIndex: props.chapterIndex,
                                        sectionIndex: props.sectionIndex
                                    }
                                }) 
                            
                            }}
                        >
                            &nbsp;x&nbsp;
                        </span>
                    </div>
                    :
                    <></>
                }
            </div>
        </div>
    )
}

export default EntryBody;