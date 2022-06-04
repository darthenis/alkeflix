import swAlert from "@sweetalert/with-react";

function swAlertService(message){

    swAlert({
        text: message,
        buttons:{
            confirm: {
                text: "Aceptar",
                value: true,
                visible: true,
                className: "bg-dark p-2 text-white rounded",
                closeModal: true
              }
        }    
        
      })

}


export default swAlertService;