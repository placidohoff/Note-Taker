import React, {useState, useEffect} from 'react'
import {TextField} from '@material-ui/core'
import './NewSection.css';
import { useStateValue } from './StateProvider';

function NewSection(props){

    const [sectionTitle, setSectionTitle] = useState(props.title)
    const [isSectionTitleSet, setIsSectionTitleSet] = useState(props.isSet)
    const [sectionBody , setSectionBody] = useState(props.body)
    const [isSectionBodySet, setIsSectionBodySet] = useState(props.isSet)
    const [{newSection, chapters}, dispatch] = useStateValue();
    const [isThisSet, setIsThisSet] = useState(true)

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

    useEffect(() => {
       if(!props){
           setSectionTitle('First Body')
           setSectionBody('Click to change')
           setIsSectionTitleSet(false)
           setIsSectionBodySet(false)
           setIsThisSet(false)

       }
    }, [])

    return(
        <div className="newsection">
            <div className="newsection__title">
                {
                    isSectionTitleSet
                    ?
                    <div className="newsection__finishTitle">
                        
                        <pre className="newsection__title">
                            
                            <pre 
                                onClick={e => {
                                    setIsSectionTitleSet(false)
                                    setIsThisSet(false)
                                }}
                                style={{display:'flex', flexDirection:'row'}}
                            >
                                    <div  className="newsection__titleSymbol">&bull; </div>
                                    {sectionTitle}
                                </pre>
                        </pre>
                    </div>
                    :
                    <form
                        onSubmit={e => {e.preventDefault()}}
                        //className="newEntry__title"
                    >
                        <TextField 
                            id="outlined-multiline-flexible"
                            multiline
                            rowsMax={5}
                            placeholder="Enter Section Title"
                            value={sectionTitle}
                            onChange= {e => {setSectionTitle(e.target.value)} }
                        />
                        <button
                            type="submit"
                            onClick={e => {setIsSectionTitleSet(true)}}
                        >
                            Set
                        </button>
                    </form>
                }
             </div>
             <div>
                 {
                     isSectionBodySet
                     ?
                    <pre className="newsection__body">
                        <pre 
                            style={{whiteSpace:'pre-wrap', marginTop:'-20px', marginLeft: '15px'}}
                            onClick={e => {
                                setIsSectionBodySet(false)
                                setIsThisSet(false)
                            }}
                            >
                                {sectionBody}
                        </pre>
                    </pre>
                     :
                    <form
                        onSubmit={e => {e.preventDefault()}}
                     >
                        <TextField
                            id="outlined-multiline-static"
                            
                            multiline
                            rows={4}
                            placeholder="Body notes..."                    
                            variant="outlined"
                            value={sectionBody}
                            onChange={e => {setSectionBody(e.target.value)}}
                        />
                        <button
                            type="submit"
                            onClick={e => {setIsSectionBodySet(true)}}
                        >
                            Set
                        </button>
                        <button
                            type="submit"
                            onClick={e => {
                                setSectionBody('.............')
                                setIsSectionBodySet(true)
                            }}
                        >
                            Discard
                        </button>
                    </form>
                
                }
             </div>
             {
                 props.isSet && isThisSet
                 ?
                    <></>
                :
                <button
                    //onClick={props.makeSection}
                    // onClick={
                    //     dispatch({
                    //         type: 'MAKE_SECTION',
                    //         item:{
                    //             title: sectionTitle,
                    //             content: sectionBody
                    //         }
                    //     })
                    // }
                    onClick={makeSection}
                >
                    Save
                </button>
            }
        </div>
    )
}

export default NewSection;