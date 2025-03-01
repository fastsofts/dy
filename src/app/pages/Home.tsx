"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import AutocompleteSearch from '../components/SearchItems'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../store/action';
import { DataState, DataItem } from '../dataType'; 
import { AppDispatch } from '../store/store'
import Modal from '../components/Modal'

function Home() {
    const dispatch = useDispatch<AppDispatch>();
    const { items, loading, error } = useSelector((state: { data: DataState }) => state.data);
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        comments: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        setFormData({
            name: '',
            role: '',
            comments: ''
        });
        handleClose();
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const closed = (e) => {
        handleClose();
    };

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const itemlist = items.map((item: DataItem) => item.title);

    return (
        <div>
            <div className="button-request" onClick={handleOpen}>
                <FontAwesomeIcon icon={faExternalLinkAlt} size="2x" className="iconsize" />
                <a className="request">Request</a>
            </div>            
            <nav className="navbar navbar-light bg-light header">
                My Library
            </nav>
            <div className="footnote">Browse for assets needed to report and present analysis</div>
            <div>
                <AutocompleteSearch Items={itemlist} placeholder={''} />
            </div>

            {open ? (
                <Modal isOpen={open} onClose={closed}>
                    <div>
                        <h2>Request Form</h2>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <br /><br />
                            <label htmlFor="role">Options Requested:</label>
                            <input
                                type="text"
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                required
                            />
                            <br /><br />
                            <label htmlFor="comments">Comments:</label><br />
                            <textarea
                                id="comments"
                                name="comments"
                                value={formData.comments}
                                onChange={handleChange}
                                rows="4"
                                cols="50"
                            ></textarea>
                            <br /><br />
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </Modal>
            ) : null}
        </div>
    );
}

export default Home;
