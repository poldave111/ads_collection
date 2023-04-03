import { useSelector } from "react-redux";
import { Form, Col, Button } from "react-bootstrap";
import Ad from "../Ad/Ad";

const  MainPage = () => {
    const data = useSelector((state) => {
        return state.ads;
    });
    console.log('data MainPage.js', data);
    return (

        <>
             {data.map(ad => <Ad key={data.id} ad={ad} />)}
        </>
    )
}

export default MainPage; 