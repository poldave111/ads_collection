import React, { useState } from 'react';
import { Form, Col, Button } from "react-bootstrap";
import styles from './EditAd.module.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdById, saveAdById } from '../../redux/adsRedux';
//import { getAllAds } from "../../redux/adsRedux";

function EditAd(props) {
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
        const payload = {
            title,
            content,
            date,
            image,
            price,
            location,
            sellerId
        }
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
                <form onSubmit={handleSubmit}>
                    <h1>Id: {props.adId}</h1>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" name="title" value={title} onChange={(event) => setTitle(event.target.value)} /><br />

                    <label htmlFor="content">Content:</label>
                    <textarea id="content" name="content" value={content} onChange={(event) => setContent(event.target.value)}></textarea><br />

                    <label htmlFor="date">Date:</label>
                    <input type="date" id="date" name="date" value={date} onChange={(event) => setDate(event.target.value)} /><br />

                    <label htmlFor="image">Image:</label>
                    <input type="input" id="image" name="image" value={image} onChange={(event) => setImage(event.target.value)} /><br />

                    <label htmlFor="price">Price:</label>
                    <input type="number" id="price" name="price" value={price} onChange={(event) => setPrice(event.target.value)} /><br />

                    <label htmlFor="location">Location:</label>
                    <input type="text" id="location" name="location" value={location} onChange={(event) => setLocation(event.target.value)} /><br />

                    <button type="submit">Submit</button>
                </form>
            )
        

    );
}

export default EditAd;


