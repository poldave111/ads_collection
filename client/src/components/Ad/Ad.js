import { useSelector } from "react-redux";
import { Form, Col, Button } from "react-bootstrap";


const  Ad = (props) => {
    const data = useSelector((state) => {
        return state.ads;
    })
    return (
        <>
            <li>Title: {props.title}</li>
        </>
    )
}

export default Ad;