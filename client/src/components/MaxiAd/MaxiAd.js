import { useSelector } from "react-redux";
import { Form, Col, Button, Card, Container  } from "react-bootstrap";
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import styles from './MaxiAd.module.scss';
import { IMAGES_URL } from '../../config';
import { getAllAdsFromState } from "../../redux/adsRedux";

const  MaxiAd = (props) => {
    console.log('...props', props);
    const { id } = useParams(); 
    const adsData = useSelector((state) => getAllAdsFromState(state).find(item => item._id === id));

    return (
        <Card className={styles.card}>
            <Container className={styles.container}>
                <Card.Img variant="top" className={`${styles.cardImg} img-fluid w-100 h-100 text-center`} src={`${IMAGES_URL}/${adsData.image}`} />
            </Container>  
            <Card.Body className={styles.cardBody} >
                <Card.Title>{adsData.title}</Card.Title>
                    <Card.Text className={styles.cardText}>
                        {adsData.content}
                    </Card.Text>
                    <Link to="/adview/"><Button variant="primary" size="lg">Go to add</Button></Link>
            </Card.Body>    
        </Card>
    )
}

export default MaxiAd;