import { useSelector } from "react-redux";
import { Form, Col, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import styles from './Ad.module.scss';

const  Ad = (props) => {

    return (
        <div className={styles.card}>
            <li>Title: {props.ad.title}</li>
            <Link to="/adview"><Button>More</Button></Link>
        </div>
    )
}

export default Ad;