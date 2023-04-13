import { useSelector } from "react-redux";
import { Form, Col, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import styles from './Ad.module.scss';
import { IMAGES_URL } from '../../config';

const  Ad = (props) => {

    return (
        <div className={styles.card}>
            <li>Title: {props.ad.title}</li>
            <li>Image: <img src={`${IMAGES_URL}/${props.ad.image}`} /></li>
            <Link to="/adview"><Button>More</Button></Link>
        </div>
    )
}

export default Ad;