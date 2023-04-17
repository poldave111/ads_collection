import { useSelector } from "react-redux";
import { Form, Col, Button, Card, ListGroup } from "react-bootstrap";
import { Link } from 'react-router-dom';
import styles from './Ad.module.scss';
import { IMAGES_URL } from '../../config';

const  Ad = (props) => {

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={`${IMAGES_URL}/${props.ad.image}`} />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                    <Card.Text>
                        {props.content}
                    </Card.Text>
                    <Link to="/adview"><Button variant="primary" size="lg">Go to add</Button></Link>
        </Card.Body>
        </Card>
    )
}

export default Ad;