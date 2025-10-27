import './Box.css';


function Box( {title, description}){
    return(
        <div className="box">
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    )
}


export default Box;