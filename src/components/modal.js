import "/Users/dasha/Desktop/dashboardFE/src/components/utilsComponents/modal.css";

const Modal = (props) => {
if(!props.modalState){
    return null
}


  
    return ( 
<div className="conatiner1">
    <div className="modal1">
        modal content
        <div className="close">X</div>
    </div>
</div>
     );
}
 
export default Modal;