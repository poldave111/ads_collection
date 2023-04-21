import { useSelector } from "react-redux";
import { Form, Col, Button, Card, Container  } from "react-bootstrap";
import { Link } from 'react-router-dom';
import styles from './MaxiAd.module.scss';
import { IMAGES_URL } from '../../config';

const  MaxiAd = (props) => {
    console.log(props);
    return (
        <Card className={styles.card}>
            <Container className={styles.container}>
                {/* <Card.Img variant="top" className={`${styles.cardImg} img-fluid w-100 h-100 text-center`} src={`${IMAGES_URL}/${props.ad.image}`} /> */}
            </Container>  
            <Card.Body className={styles.cardBody} >
                <Card.Title>{props.title}</Card.Title>
                    <Card.Text className={styles.cardText}>
                        {props.content}
                    </Card.Text>
                    <Link to="/adview"><Button variant="primary" size="lg">Go to add</Button></Link>
            </Card.Body>    
        </Card>
        // <div className={styles.card}>

        //     <li>{props.title}</li>
        //     <Link to="/edit"><Button>Edit Ad</Button></Link>
        // </div>
    )
}

export default MaxiAd;