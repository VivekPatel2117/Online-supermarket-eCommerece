import React, { useState,useEffect, useRef } from 'react';
import styles from './ProfileSection.module.css';
import Navbar from '../../components/Navbar/Navbar';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Avatar from '@mui/material/Avatar';
import { grey } from '@mui/material/colors';
import { toast } from 'react-toastify';
import SellerNavbar from '../../components/SellerNavbar/SellerNavbar';
const ProfileSection = () => {
    const [displayName, setDisplayName] = useState('')
    const gray = grey[50];
    const [Phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mainInterest, setMainInterest] = useState('Fruits');
    const [address, setAddress] = useState("")
    const [error, setError] = useState('');
    const [imgUrl, setImgUrl] = useState(null)
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email.includes('@')) {
            setError('Please enter an email address in the format username@domain.com');
        } else {
            setError('');
            // Handle form submission
        }
    };
    const getUserDetails = async() => {
        const res = await fetch(`http://127.0.0.1:5000/user_detail/${localStorage.getItem("id")}`,{
            method:"GET",
          headers:{
            "Content-type":"application/json"
          }
        })
    if(res.status === 200){
        const data = await res.json();
        const userData = data.data;
        setEmail(userData.email);
        setAddress(userData.address);
        setFirstName(userData.username);
        setImgUrl(userData.profile_img);
        setPhone(userData.phone);
        setDisplayName(userData.name)
        setMainInterest(userData.interest)
    }
    }
    useEffect(() => {
      getUserDetails();
    
    }, [])
   
        const fileInputRef = useRef(null);
        const handleDivClick = () => {
          if (fileInputRef.current) {
            fileInputRef.current.click();
          }
        };
      const [ImgFile, setImgFile] = useState(null)
        const handleFileChange = (event) => {
          const file = event.target.files[0];
          if (file) {
              console.log('Selected file:', file);
              setImgFile(file)
            setImgUrl(URL.createObjectURL(event.target.files[0]));
            // Process the file here (e.g., upload it or display a preview)
          }
        };
      const [isLoading, setIsLoading] = useState(false)
        const handleUpdate = async() =>{
            if(!ImgFile){
                await handleProfileDetailsUpdate();
                return;
            } 
            const data = new FormData();
            data.append("file", ImgFile);
            data.append("upload_preset", "freshmart");
            data.append("cloud_name", "Pillai-ig");
            toast.warn("Please wait while we are aupdating your profile",{autoClose:3000,position:"top-center"});
            setIsLoading(true);
            const response = await fetch(
                "https://api.cloudinary.com/v1_1/Pillai-ig/image/upload",
                {
                  method: "post",
                  body: data,
                }
              );
              if(response.status === 200 ){
              const Resurl = await response.json();
              if(Resurl){
                const res = await fetch(`http://127.0.0.1:5000/update_user_details/${localStorage.getItem("id")}`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                     profile_img:Resurl.url,
                     email,
                     username:firstName,
                     address,
                     name:displayName,
                     Phone,
                    }),
                  });
                  if(res.status === 200){
                    setIsLoading(false);
                  }
              }
              }
       }
       const handleProfileDetailsUpdate = async() =>{
        setIsLoading(true)
        const res = await fetch(`http://127.0.0.1:5000/update_user_details/${localStorage.getItem("id")}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
             email,
             username:firstName,
             address,
             name:displayName,
             Phone,
            }),
          });
          if(res.status === 200){
            setIsLoading(false);
          }
       }
    return (
        <>
        {localStorage.getItem("access") ==="seller" ? (
            <SellerNavbar/>
        ):(
            <Navbar/>
        ) }
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Your Personal Information <span>😎</span></h1>
                <div className={styles.actionButtons}>
                <button className={styles.notificationButton} onClick={()=>{
                    toast.success("Feature coming soon",{autoClose:3000,position:"top-center"})
                }}><ShieldOutlinedIcon color='primary'/></button>
                <button className={styles.secutiryButton} onClick={()=>{
                    toast.success("Feature coming soon",{autoClose:3000,position:"top-center"})
                }}><NotificationsNoneOutlinedIcon /></button>
                <button className={styles.submitButton} onClick={handleUpdate}>Confirm</button>
                </div>
            </div>
            {isLoading ? (
               <div style={{ placeSelf: "center",display:"flex", justifyContent:"center",alignItems:"center", height:"75vh" }}>
               <div
                 className="spinner"
                 style={{
                   width: "15vh",
                   border: "4px solid #624FC2",
                   borderRightColor: "white",
                 }}
               />
             </div>
            ):(
                <>
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
                <label>Username</label>
                <div className={styles.nameInputs}>
                    <input 
                        type="text" 
                        className={styles.inputField} 
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)} 
                        placeholder="First Name" 
                    />
                </div>
            </div>
            <div className={styles.formGroup}>
                <label>Phone number</label>
                <input 
                    type="number" 
                    className={styles.inputField} 
                    value={Phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    placeholder="Phone number" 
                />
                {error && <p className={styles.errorMessage}>{error}</p>}
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
                <label>Name</label>
                <input 
                    type="text" 
                    className={styles.inputField} 
                    value={displayName} 
                    onChange={(e) => setDisplayName(e.target.value)} 
                    placeholder="Name" 
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
            <Avatar alt="Remy Sharp"  sx={{ width: 150, height: 150 }} src={imgUrl !=null ? imgUrl : "https://via.placeholder.com/100"} />
                <div className={styles.editbutton} onClick={handleDivClick}>
                <EditOutlinedIcon fontSize='large' color={gray}/>
                </div>
                <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleFileChange}
      />
            </div>
            </div>
            
            </div>
                </>
            )}
        </div>
        </>
    );
};

export default ProfileSection;
