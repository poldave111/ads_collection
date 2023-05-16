import { useState } from "react";
import { useSelector } from "react-redux";
import { ThemeProvider, Row, Col } from "react-bootstrap";
import Header from "../Header/Header";
import Ad from "../Ad/Ad";
import EditAd from "../EditAd/EditAd";
import MaxiAd from "../MaxiAd/MaxiAd";

const  MainPage = () => {
    const data = useSelector((state) => {
        return state.ads.allAds;
    });
    const [links, setLinks] = useState([
        { label: "Logout", path: "/logout", logged: true},
        { label: "Add", path: "/add", logged: true},
        { label: "About Us", path: "/aboutus", logged: true}, 
        { label: "Contact", path: "/contact", logged: true}, 
        { label: "Register", path: "/register", logged: false}, 
        { label: "Login", path: "/login", logged: false}
    ]);

    console.log('data MainPage.js', data);
    return (
        <ThemeProvider 
            breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
            minBreakpoint="xxs"
        >
        <div  className="d-flex justify-content-center align-items-center">
            <Row className="col-4 col-md-6">
                {data.map(ad => <Col sm={4} className="text-center"><Ad key={data.id} ad={ad} content={ad.content} title={ad.title} id={ad._id} /></Col>)} 
            </Row>
        </div>
            
            
        </ThemeProvider>
    )
}

export default MainPage; 