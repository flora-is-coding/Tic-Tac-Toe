import './Tile.css';

export function Tile(props) {

    function x (value) {
        if(value === 0) {
            return "o"
        } else if(value === 1) {
            return "x"
        } 
        return null
    }

    return (
        <div className={props.className + " tile"} onClick={props.onClick} disabled={props.disabled} >
            <div className="tile__inner-wrapper">
                {x(props.value)}
            </div>
        </div>
    )
}