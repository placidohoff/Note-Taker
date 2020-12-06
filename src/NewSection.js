import React, {useState, useEffect} from 'react'
import {TextField, Button} from '@material-ui/core'
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
            <div className="newsection__main">
                <div className="newsection__title">
                    {
                        isSectionTitleSet
                        ?
                        <div className="newsection__finishTitle">
                            
                            <pre className="newsection__title">
                                
                                <pre 
                                    onClick={e => {
                                        setIsSectionTitleSet(false)
                                        // setIsThisSet(false)
                                    }}
                                    style={{display:'flex', flexDirection:'row'}}
                                >
                                        <div  className="newsection__titleSymbol">&bull; </div>
                                        {sectionTitle}
                                    </pre>
                                    <span 
                                        className="newsection__edit"
                                        onClick={e => {setIsSectionTitleSet(false)}}    
                                    >
                                        
                                        &#9998;
                                        
                                    </span>
                            </pre>
                            
                        </div>
                        :
                        <form
                            onSubmit={e => {e.preventDefault()}}
                            //className="newEntry__title"
                        >
                            <div style={{display:'flex', flexDirection:'row', marginLeft: '5px'}}>
                                <div  className="newsection__titleSymbol">&bull; </div>
                                <TextField 
                                    id="outlined-multiline-flexible"
                                    multiline
                                    rowsMax={5}
                                    placeholder="Enter section notes "
                                    value={sectionTitle}
                                    onChange= {e => {setSectionTitle(e.target.value)}}
                                    style={{marginLeft:'5px'}}
                                />
                            
                            <button
                                type="submit"
                                onClick={e => {setIsSectionTitleSet(true)}}
                                style={{height: '20px'}}
                            >
                                Set
                            </button>
                            </div>
                        </form>
                    }
                </div>
                <div>
                    {
                        isSectionBodySet && isSectionTitleSet
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
                            <div style={{display:'flex', flexDirection:'row'}}>
                                <TextField
                                    id="outlined-multiline-static"
                                    
                                    multiline
                                    rows={4}
                                    placeholder="Enter subnotes..."                    
                                    variant="outlined"
                                    value={sectionBody}
                                    onChange={e => {setSectionBody(e.target.value)}}
                                    style={{marginLeft: '25px'}}
                                />
                                <div style={{display:'flex', flexDirection:'column'}}>
                                    <button
                                        type="submit"
                                        onClick={e => {setIsSectionBodySet(true)}}
                                        // style={{height:'20px'}}
                                        className="section__bodyOptions"
                                    >
                                        Set
                                    </button>
                                    <button
                                        type="submit"
                                        onClick={e => {
                                            setSectionBody('.............')
                                            setIsSectionBodySet(true)
                                        }}
                                        className="section__bodyOptions"
                                        style={{
                                            color: 'black', 
                                            fontWeight: 'normal', 
                                            fontSize:'11px', 
                                            textAlign:'center'
                                        }}
                                    >
                                X
                            </button>
                                </div>
                            </div>
                        </form>
                    
                    }
                </div>
                {
                    props.isSet && isThisSet
                    ?
                        <></>
                    :
                    <Button
                        onClick={makeSection}
                        style={{marginLeft: '40px'}}
                        color="primary"
                        variant="contained"
                    >
                        Save
                    </Button>
                }
                </div>
            <div className="newsection__delete">
                {
                    isSectionTitleSet && isSectionBodySet
                    ?
                    <>
                    
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
                        className="newsection__deleteButton"
                    >
                        &nbsp;x&nbsp;
                    </span>
                    </>
                    :
                    <></>
                }
            </div>
        </div>
    )
}

export default NewSection;