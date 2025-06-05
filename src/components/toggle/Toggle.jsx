import React from "react";
import "./Toggle.css"

const Toggle = (props) => {
    return (
        <>
            <div className="teste">
                <label  className="switch">
                    <input  type="checkbox"
                            checked={props.presenca} />
                        <span className="slider round"></span>
                </label>    w
            </div>
        </>
    )
}

export default Toggle;