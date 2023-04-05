import { useSelector } from "react-redux";
import { Form, Col, Button } from "react-bootstrap";
import styles from './MaxiAd.module.scss';

const  MaxiAd = (props) => {

    return (
        <div className={styles.card}>

            <li>{props.title}</li>
        </div>
    )
}

export default MaxiAd;