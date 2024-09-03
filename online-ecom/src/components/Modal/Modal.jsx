import React from "react";
import styles from "./modal.module.css"; // Ensure the CSS file path is correct
import { ToastContainer } from "react-toastify";
import CloseIcon from '@mui/icons-material/Close';
const Modal = ({
  isOpen,
  onClose,
  downloadheader,
  children,
  header,
  size,
  isBack,
  onBack,
  zIndex
}) => {
  const modalClass = `${styles.modalDiv} ${isOpen ? styles.modalOpen : ""}`;

  let modalContentStyle = {
    height: "40vh",
    width: "40vw",
  };

  if (size) {
    switch (size) {
      case "small":
        modalContentStyle = {
          height: "30vh",
          width: "30vw",
        };
        break;
      case "medium":
        modalContentStyle = {
          height: "40vh",
          width: "40vw",
        };
        break;
      case "large":
        modalContentStyle = {
          height: "50vh",
          width: "50vw",
        };
        break;
      case "xlarge":
        modalContentStyle = {
          height: "70vh",
          width: "70vw",
        };
        break;
      case "Mlarge":
        modalContentStyle = {
          height: "60vh",
          width: "60vw",
        };
        break;
      default:
        break;
    }
  }

  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    modalContentStyle.width = "95vw";
  }

  let headerDivColumns = "";

  if (downloadheader && onClose) {
    headerDivColumns = "8.5fr 2.5fr 1fr";
  } else if (downloadheader || onClose) {
    headerDivColumns = "9fr 1fr";
  }
  

  return (
    <div style={{zIndex:zIndex ? zIndex :""}} className={modalClass}>
      <ToastContainer />
      <div className={styles.modalContent} style={modalContentStyle}>
        <div
          className={styles.headerdiv}
          style={{ display: "grid", gridTemplateColumns: !isBack ? `${headerDivColumns}` : "1fr 9fr 1fr"}}
        >
           {isBack && (
            <>
             <span
             className="material-symbols-rounded"
             style={{
               fontSize: "2.5vh",
               marginLeft:"0.5vw",
               cursor: "pointer",
               justifySelf: "start",
             }}
             onClick={onBack}
           >
             arrow_back
           </span>
           </>
          )}
          <p className={styles.headerText}>{header}</p>
          {onClose ? (
            <span
              className="material-symbols-rounded"
              style={{
                fontSize: "3vh",
                cursor: "pointer",
                zIndex: 1000,
                justifySelf: "end",
              }}
              onClick={onClose}
            >
             <CloseIcon/>
            </span>
          ) : (
            <></>
          )}
         
        </div>

        <div  className={styles.scrollbox}>

        {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
