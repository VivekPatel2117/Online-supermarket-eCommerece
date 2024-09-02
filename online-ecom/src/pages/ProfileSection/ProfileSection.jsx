import React, { useState } from 'react';
import styles from './ProfileSection.module.css';
import Navbar from '../../components/Navbar/Navbar';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Avatar from '@mui/material/Avatar';
import { grey } from '@mui/material/colors';
const ProfileSection = () => {
    const gray = grey[50]
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mainInterest, setMainInterest] = useState('Fruits');
    const [address, setAddress] = useState("")
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email.includes('@')) {
            setError('Please enter an email address in the format username@domain.com');
        } else {
            setError('');
            // Handle form submission
        }
    };

    return (
        <>
        <Navbar/>
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Your Personal Information <span>😎</span></h1>
                <div className={styles.actionButtons}>
                <button className={styles.notificationButton} onClick={handleSubmit}><ShieldOutlinedIcon color='primary'/></button>
                <button className={styles.secutiryButton} onClick={handleSubmit}><NotificationsNoneOutlinedIcon /></button>
                <button className={styles.submitButton} onClick={handleSubmit}>Confirm</button>
                </div>
            </div>
            <hr style={{marginBottom:'2vh'}} />
            <div className={styles.userInfoWrapper}>
            <form className={styles.profileInfo}>
            <div className={styles.formGroup}>
                <label>Email address</label>
                <input 
                    type="text" 
                    className={styles.inputField} 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="username@domain.com" 
                />
                {error && <p className={styles.errorMessage}>{error}</p>}
            </div>
            <div className={styles.formGroup}>
                <label>Full name</label>
                <div className={styles.nameInputs}>
                    <input 
                        type="text" 
                        className={styles.inputField} 
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)} 
                        placeholder="First Name" 
                    />
                    <input 
                        type="text" 
                        className={styles.inputField} 
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)} 
                        placeholder="Second Name" 
                    />
                </div>
            </div>
            <div className={styles.formGroup}>
                <label>Delivery Address</label>
                <input 
                    type="text" 
                    className={styles.inputField} 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    placeholder="Address" 
                />
                {error && <p className={styles.errorMessage}>{error}</p>}
            </div>
            <div className={styles.formGroup}>
                <label>Choose your main interest</label>
                <select 
                    className={styles.selectField} 
                    value={mainInterest} 
                    onChange={(e) => setMainInterest(e.target.value)}>
                    <option value="Fruits">Fruits</option>
                    <option value="Grains">Grains</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Chips">Chips</option>
                    <option value="drinks">Drinks</option>
                </select>
            </div>
        </form>
            <div className={styles.profilePhotoWrapper}>
                <p>Profile photo</p>
            <div className={styles.profilePhoto}>
            <Avatar alt="Remy Sharp"  sx={{ width: 150, height: 150 }} src={"https://via.placeholder.com/100"} />
                <div className={styles.editbutton}>
                <EditOutlinedIcon fontSize='large' color={gray}/>
                </div>
            </div>
            </div>
            
            </div>
        </div>
        </>
    );
};

export default ProfileSection;
