import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Form, Col, Button, Card, Container, Spinner  } from "react-bootstrap";
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import styles from './MaxiAd.module.scss';
import { IMAGES_URL } from '../../config';
import { getAd, getAdById } from "../../redux/adsRedux";

const  MaxiAd = (props) => {
    console.log('...props', props);
    const { id } = useParams(); 
    const dispatch = useDispatch();
    //const adsData = useSelector(state => getAd(state.ads.allAds, id));
    const adsData = useSelector(getAd);
    useEffect(() => {
        dispatch(getAdById(id));
    },[]);
    //console.log('adsData', adsData._id);

    return (
        <>
            {!adsData && (
            <Spinner animation="border" role="status" className="d-block mx-auto">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        )}
        {adsData && (
            <>
            <Header />
            <Card className={styles.card}>
                <Container className={styles.container}>
                    <Card.Img variant="top" className={`${styles.cardImg} img-fluid w-100 h-100 text-center`} src={`${IMAGES_URL}/${adsData.image}`} />
                </Container>  
                <Card.Body className={styles.cardBody} >
                    <Card.Title>{adsData.title}</Card.Title>
                        <Card.Text className={styles.cardText}>
                            {adsData.content}
                        </Card.Text>
                        <Link to={`/edit/${adsData._id}`}><Button variant="primary" size="lg">Go to add</Button></Link>
                </Card.Body>    
            </Card>
            </>
        )}
        </>
    )
}

export default MaxiAd;