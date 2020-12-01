import React, {useState} from 'react'
import {TextField} from '@material-ui/core'
import './NewSection.css';

function NewSection({title, body, makeBody}){

    const [sectionTitle, setSectionTitle] = useState('')
    const [isSectionTitleSet, setIsSectionTitleSet] = useState(false)
    const [sectionBody , setSectionBody] = useState('')
    const [isSectionBodySet, setIsSectionBodySet] = useState(false)

    const makeSectionTitle = () => {

    }

    return(
        <div className="newsection">
            <div className="newsection__title">
                {
                    isSectionTitleSet
                    ?
                    <div className="newsection__title">
                        <div 
                            onClick={e => {setIsSectionTitleSet(false)}}>{sectionTitle}</div>
                    </div>
                    :
                    <form
                        onSubmit={e => {e.preventDefault()}}
                        //className="newEntry__title"
                    >
                        <input 
                            placeholder="Enter Section Title"
                            value={sectionTitle}
                            onChange= {e => {{setSectionTitle(e.target.value)}} }
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
                            style={{whiteSpace:'pre-wrap'}}
                            onClick={e => {setIsSectionBodySet(false)}}>
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
                    </form>
                
                }
             </div>
            <button
                onClick={makeBody}
            >
                Make Section
            </button>
        </div>
    )
}

export default NewSection;