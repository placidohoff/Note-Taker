import React, {useState, useEffect} from 'react'
import './SubEntry.css'

import {TextField, Button} from '@material-ui/core'

import { useStateValue } from './StateProvider';



function SubEntry(props){
    const [{chapters}, dispatch] = useStateValue();
    
    const [mainEntry, setMainEntry] = useState(props.content)
    const [isSet, setIsSet] = useState(props.isSet)
    //const [isSubEntrySet, setIsSubEntrySet]
    const setThis = (e) => {
        setIsSet(true)
        dispatch({
            type: 'SET_SUB_BODY',
            item:{
                content: mainEntry,
                isSet: true,
                chapterIndex: props.chapterIndex,
                sectionIndex: props.sectionIndex,
                subEntryIndex: props.subEntryIndex
            }
        })
    }

    const deleteThis = (e) => {
        dispatch({
            type: 'DELETE_SUB_BODY',
            item:{
                chapterIndex: props.chapterIndex,
                sectionIndex: props.sectionIndex,
                subEntryIndex: props.subEntryIndex
            }
        })
    }

    return(
        <div className="subentry">
            <div
                style={{
                    marginRight: '5px'
                }}
            >
                &bull;
            </div>
            <div>
                {
                    isSet 
                    ? 
                    <pre
                        onClick={e => {setIsSet(false)}}
                        style={{
                            fontSize: '13px'
                        }}
                    >
                        {mainEntry}
                    </pre>
                    :
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}
                    >
                        <TextField 
                            id="outlined-multiline-flexible"
                            multiline
                            rows={3}
                            placeholder="Enter section notes "
                            value={mainEntry}
                            onChange= {e => {setMainEntry(e.target.value)}}
                            style={{marginLeft:'5px', width:'250px'}}
                            inputProps={{style: {fontSize: 10}}}
                        />
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <button
                                style={{
                                    marginBottom: '5px',
                                    fontSize: '11px'
                                }}
                                onClick={setThis}
                            >
                                SET
                            </button>
                            <button
                                style={{
                                    fontSize: '11px'
                                }}
                                onClick={deleteThis}
                            >
                                X
                            </button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default SubEntry