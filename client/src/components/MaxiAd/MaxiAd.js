import { useSelector } from "react-redux";
import { Form, Col, Button } from "react-bootstrap";
import styles from './MaxiAd.module.scss';

const  Ad = (props) => {

    return (
        <div className={styles.card}>

            <li>Title: {props.ad.title}</li>
            <Button>Edit Ad</Button>
        </div>
    )
}

export default Ad;