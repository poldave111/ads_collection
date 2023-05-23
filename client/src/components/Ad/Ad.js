import { useSelector } from "react-redux";
import { Form, Col, Button, Card, ListGroup, Container } from "react-bootstrap";
import { Link } from 'react-router-dom';
import styles from './Ad.module.scss';
import { IMAGES_URL } from '../../config';

const Ad = (props) => {
    
    console.log('props ad', props.id)
    return (
        <Card className={`${styles.card} my-4 mx-4 me-4`}>
            <Container className={styles.container}>
                <Card.Img variant="top" className={`${styles.cardImg} img-fluid w-100 h-100 text-center`} src={`${IMAGES_URL}/${props.ad.image}`} />
            </Container>
            <Card.Body className={styles.cardBody} >
                <Card.Title>{props.title}</Card.Title>
                <Card.Text className={styles.cardText}>
                    {props.content}
                </Card.Text>
                <Link to={`/adview/${props.id}`}><Button variant="primary" size="lg">Go to ad</Button></Link>
            </Card.Body>
        </Card>
    )
}

export default Ad;

