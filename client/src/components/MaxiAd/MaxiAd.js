import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Form, Col, Button, Card, Container, Spinner, ListGroup  } from "react-bootstrap";
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import styles from './MaxiAd.module.scss';
import { IMAGES_URL } from '../../config';
import { deleteAD, getAd, getAdById } from "../../redux/adsRedux";

const  MaxiAd = (props) => {
    console.log('...props', props);
    const { id } = useParams(); 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //const adsData = useSelector(state => getAd(state.ads.allAds, id));
    const adsData = useSelector(getAd);
    useEffect(() => {
        dispatch(getAdById(id));
    },[]);
    const [links, setLinks] = useState([
        { label: "Logout", path: "/logout", logged: true},
        { label: "Add", path: "/add", logged: true},
        { label: "About Us", path: "/aboutus", logged: true}, 
        { label: "Contact", path: "/contact", logged: true}, 
        { label: "Register", path: "/register", logged: false}, 
        { label: "Login", path: "/login", logged: false}
    ]);
    //console.log('adsData', adsData._id);

    const deleteAd = () => {
        dispatch(deleteAD(id));
        navigate("/");
    }

    return (
        <>
        {!adsData && (
            <Spinner animation="border" role="status" className="d-block mx-auto">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        )}
        {adsData && (
            <>
            <Card className={`{styles.card} card-width d-flex flex-column card-width`}>
                <Card.Img variant="top" className={`${styles.cardImg} img-fluid w-100 h-100 text-center`} src={`${IMAGES_URL}/${adsData.image}`} />
                <Card.Body className={`${styles.cardBody} d-flex flex-column justify-content-end align-items-center`} >
                    <Card.Title>{adsData.title}</Card.Title>
                    <Card.Text className={styles.cardText}>
                        {adsData.content}
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item><b>Price: </b>{adsData.price}</ListGroup.Item>
                    <ListGroup.Item><b>Location: </b>{adsData.location}</ListGroup.Item>
                </ListGroup>
                <Card.Body>
                    <Link to={`/edit/${adsData._id}`}><Button variant="primary" size="lg">Edit ad</Button></Link>
                    <Button variant="primary" size="lg" onClick={deleteAd}>Delete</Button>
                </Card.Body>    
            </Card>
            </>
        )}
        </>
    )
}

export default MaxiAd;