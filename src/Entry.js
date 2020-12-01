import React from 'react'
import './Entry.css'

const Entry = (props) => {
    return(
        <div className="entry">
            <div className="entry__title">{props.title}</div>
            <div>{props.content.map(body => {
                return<>
                    <div className="entry__bodyTitle">{body.title}</div>
                    <div className="entry__bodyContent">{body.content}</div>
                </>
            })}</div>
        </div>
    )
}

export default Entry