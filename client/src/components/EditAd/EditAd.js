import React, { useState, useRef } from 'react';
import { Form, Col, Button } from "react-bootstrap";
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

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAdById(props.adId));
    }, [props.adId]);

    const editedAd = useSelector(state => {
        return state.ads.selectedAd;
    })

    const handleSubmit = (event) => {
        event.preventDefault();
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
        if(editedAd) {
            setTitle(editedAd.title);
            setContent(editedAd.content);
            setDate(editedAd.date?.slice(0,10));
            setImage(editedAd.image);
            setPrice(editedAd.price);
            setLocation(editedAd.location);
            setSellerId(editedAd.sellerId);
            console.log(editedAd);
        }
    }, [editedAd]);

    return (
        
            editedAd === null ? <p>loading...</p> : ( 
                <Form onSubmit={handleSubmit} ref={form}>
                    <h1>Id: {props.adId}</h1>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="title">Title:</Form.Label>
                        <Form.Control type="text" id="title" name="title" value={title} onChange={(event) => setTitle(event.target.value)} /><br />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="content">Content:</Form.Label>
                        <Form.Control as="textarea" rows={3} id="content" name="content" value={content} onChange={(event) => setContent(event.target.value)} muted /><br />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="date">Date:</Form.Label>
                        <Form.Control type="date" id="date" name="date" value={date} onChange={(event) => setDate(event.target.value)} /><br />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="image">Image:</Form.Label>
                        <Form.Control type="file" id="image" name="image" /><br />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="price">Price:</Form.Label>
                        <Form.Control type="number" id="price" name="price" value={price} onChange={(event) => setPrice(event.target.value)} /><br />
                    </Form.Group>
                    
                    <Form.Label className="mb-3">
                        <Form.Label htmlFor="location">Location:</Form.Label>
                        <Form.Control type="text" id="location" name="location" value={location} onChange={(event) => setLocation(event.target.value)} /><br />
                    </Form.Label><br />

                    <Button type="submit">Submit</Button>{' '}
                </Form>
            )
        

    );
}

export default EditAd;


