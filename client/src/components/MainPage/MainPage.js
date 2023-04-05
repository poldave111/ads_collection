import { useSelector } from "react-redux";
import { Form, Col, Button } from "react-bootstrap";
import Ad from "../Ad/Ad";
import EditAd from "../EditAd/EditAd";
import MaxiAd from "../MaxiAd/MaxiAd";

const  MainPage = () => {
    const data = useSelector((state) => {
        return state.ads.allAds;
    });
    console.log('data MainPage.js', data);
    return (

        <>
            {data.map(ad => <Ad key={data.id} ad={ad} />)} 
        </>
    )
}

export default MainPage; 