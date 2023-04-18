import { useSelector } from "react-redux";
import { Form, Col, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import styles from './MaxiAd.module.scss';

const  MaxiAd = (props) => {

    return (
        <div className={styles.card}>

            <li>{props.title}</li>
            <Link to="/edit"><Button>Edit Ad</Button></Link>
        </div>
    )
}

export default MaxiAd;