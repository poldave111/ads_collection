import React, { useState, useRef } from 'react';
import { Form, Col, Button, Modal } from "react-bootstrap";
import styles from './EditAd.module.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdById, saveAdById } from '../../redux/adsRedux';
//import { getAllAds } from "../../redux/adsRedux";

function EditAd(props) {
    const form = useRef(null);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [date, setDate] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [sellerId, setSellerId] = useState('');
    const [show, setShow] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAdById(props.adId));
    }, [props.adId]);

    const editedAd = useSelector(state => {
        return state.ads.selectedAd;
    })

    const error = useSelector(state => {
        return state.ads.error;
    })

    useEffect(() => {
        if(error) {
            setShow(show => show = true);
        }
        
    },[error])

    const handleClose = () => setShow(false);
    
   
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('handleSubmit from EditAd.js');
        // const payload = {
        //     title,
        //     content,
        //     date,
        //     image,
        //     price,
        //     location,
        //     sellerId
        // }
        const payload = new FormData(form.current); // weź cały formularz tak jak jest i coś tam z polami zrób. 
        dispatch(saveAdById(props.adId, payload));
    }

    useEffect(() => {
        if (editedAd) {
            setTitle(editedAd.title);
            setContent(editedAd.content);
            setDate(editedAd.date?.slice(0, 10));
            setImage(editedAd.image);
            setPrice(editedAd.price);
            setLocation(editedAd.location);
            setSellerId(editedAd.sellerId);
            console.log(editedAd);
        }
    }, [editedAd]);

    return (
        editedAd === null ? <p>loading...</p> : (
            <div className="w-100 mx-auto">
            
                <Modal show={show}>
                    <Modal.Body>
                        <p>Please fill all the necessary fields.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Form className="mb-3" onSubmit={handleSubmit} ref={form}>
                    <h1>Id: {props.adId}</h1>
                    <Form.Group className="mb-3 w-25 mx-auto">
                        <Form.Label htmlFor="title">Title:</Form.Label>
                        <Form.Control type="text" id="title" name="title" value={title} onChange={(event) => setTitle(event.target.value)} /><br />
                    </Form.Group>

                    <Form.Group className="mb-3 w-25 mx-auto">
                        <Form.Label htmlFor="content">Content:</Form.Label>
                        <Form.Control as="textarea" rows={3} id="content" name="content" value={content} onChange={(event) => setContent(event.target.value)} muted /><br />
                    </Form.Group>

                    <Form.Group className="mb-3 w-25 mx-auto">
                        <Form.Label htmlFor="date">Date:</Form.Label>
                        <Form.Control type="date" id="date" name="date" value={date} onChange={(event) => setDate(event.target.value)} /><br />
                    </Form.Group>

                    <Form.Group className="mb-3 w-25 mx-auto">
                        <Form.Label htmlFor="image">Image:</Form.Label>
                        <Form.Control type="file" id="image" name="image" /><br />
                    </Form.Group>

                    <Form.Group className="mb-3 w-25 mx-auto">
                        <Form.Label htmlFor="price">Price:</Form.Label>
                        <Form.Control type="number" id="price" name="price" value={price} onChange={(event) => setPrice(event.target.value)} /><br />
                    </Form.Group>

                    <Form.Group className="mb-3 w-25 mx-auto">
                        <Form.Label htmlFor="location">Location:</Form.Label>
                        <Form.Control type="text" id="location" name="location" value={location} onChange={(event) => setLocation(event.target.value)} /><br />
                    </Form.Group><br />
                    {/* {error && <p>{handleShow}</p>} */}
                    <div className="mx-auto w-25">
                        <Button type="submit" className="mx-auto">Submit</Button>{' '}
                    </div>
                </Form>

            </div>

        )
    );
}

export default EditAd;


