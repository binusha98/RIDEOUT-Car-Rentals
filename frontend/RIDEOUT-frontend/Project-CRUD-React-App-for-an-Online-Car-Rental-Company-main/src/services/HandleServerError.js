import { SweetAlert } from "./SweetAlert";


const handleError = (err) => {

    if (err) {

        if(err.response && err.response.data){

            SweetAlert("error", "Ooopz!", err.response.data);

        }

    }

}



export default handleError;