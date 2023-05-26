import React, { useState, useRef } from 'react';
import { Form, Col, Button, Modal } from "react-bootstrap";
import styles from './AddPost.module.scss';
import { checkLogin } from '../../redux/usersRedux';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { saveAd } from '../../redux/adsRedux';
import { getAd } from '../../redux/adsRedux';
import Header from "../Header/Header";
import AddPostModal from "./AddPostModal";
//import { getAllAds } from "../../redux/adsRedux";

function AddPost(props) {
    const { id } = useParams(); 
    //const adsData = useSelector(state => getAd(state.ads.allAds, id));

    const form = useRef(null);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [date, setDate] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [sellerId, setSellerId] = useState('');
    const [show, setShow] = useState(false);
    const [links, setLinks] = useState([
        { label: "Logout", path: "/logout", logged: true},
        { label: "Add", path: "/add", logged: true},
        { label: "About Us", path: "/aboutus", logged: true}, 
        { label: "Contact", path: "/contact", logged: true}, 
        { label: "Register", path: "/register", logged: false}, 
        { label: "Login", path: "/login", logged: false}
    ]);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const error = useSelector(state => {
        return state.ads.error;
    })

    const login = useSelector((state) => {
        return state.users.login
    });

    console.log('login in addpost', login);

    const message = useSelector(state => {
        return state.ads.message
    })

    useEffect(() => {
        if(login == null) {
           navigate("/login");  
        }
    },[login])

    useEffect(() => {
        if(error) {
            setShow(show => show = true);
        }
    },[error])

    const handleClose = () => setShow(false);
    
   
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('handleSubmit from AddPost.js');
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
        dispatch(saveAd(payload));
    }

    useEffect(() => {
        if(message) {
            setContent('');
            setDate('');
            setImage('');
            setLocation('');
            setPrice('');
            setTitle('');  
        }
     
    }, [message])

    return (
        <>
            <div className="w-100 mx-auto my-4">
                <AddPostModal show={!!error} content={"Please fill all the necessary fields"} />
                {/* <Modal show={show}>
                    <Modal.Body>
                        <p>Please fill all the necessary fields.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal> */}
                <Form className="mb-3" onSubmit={handleSubmit} ref={form}>
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
                
                <AddPostModal show={!!message} content={"Post Added"}/>
            </div>
        </>
    );
}

export default AddPost;


