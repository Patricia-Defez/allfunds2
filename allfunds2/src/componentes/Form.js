import React, { useState, useCallback } from 'react';
// import FormField from './FormField';



const Form = () => {

    const initialValues = {kind: "", quantity:0.00, resul: 0.00};
    const [values, setValues] = useState({...initialValues});

     const handleChange = (event) => {
        event.persist();
        setValues(values => ({ ...values, [event.target.name]: event.target.value }));
    };

    function paying(n, limit, BFactor, SFactor) {
        let toPay = 0
        if (!isNaN(n)) {
            if (n <= limit) {
                toPay = n * BFactor
            } else {
                toPay = (((n - limit) * SFactor) + (limit * BFactor)).toFixed(2)
            }
        }
        setValues(values => ({ ...values, [values.result]: toPay}))
        return toPay;
    };

    const  payment = function ({values}){
       
        switch ([values.kind]) {
            case 'TRANSPORTATION':
               return paying(values.quantity, 100, 0.12, 0.08)
                
            case 'MEAL':
               return paying(values.quantity, 3, 10, 6)
              
            case 'PARKING':
               return paying(values.quantity, 20, 1, 0.5)
             
            default:
                return 0;
        }
    };

    // const toPayTransp = paying(transportation, 100, 0.12, 0.08)
    // const toPayMeal = paying(meal, 3, 10, 6)
    // const toPayParking = paying(parking, 20, 1, 0.5)
    // const toPayTotal = (toPayTransp * 1) + (toPayMeal * 1) + (toPayParking * 1)

    return (
        <div className="box mx-auto p-5">
            <div className="container  p-5">
                <h1 className="text-center">Gestion de Dietas</h1>
                <div className="marco mx-auto m-5 p-5 ">
                    <div className="row mb-3">
                        <div className="input-group  mb-2">
                            <label className="col-sm-2">Tipo de gasto:</label>
                            <select className="custom-select col-sm-3" name="kind" onChange={handleChange}>
                                <option selected>Selecciona una opción</option>
                                <option value="TRANSPORTATION" >Desplazamientos</option>
                                <option value="MEAL">Comida</option>
                                <option value="PARKING">Parking</option>
                            </select>
                            <label className="col-sm-2  ml-4">Cantidad:</label>
                            <input 
                                data-testid="input"
                                type="text"
                                className={`form-control col-sm-2 ${isNaN(values.quantity) ? 'text-danger is-invalid': ''}`} 
                                name="quantity" 
                                value={values.quantity} 
                                onChange={handleChange}/>
                            <span className="col-sm-2 ml-3 text-right" data-testid="partial-result">A pagar: {payment} $</span>
                        </div>
                                                  
                    </div>
                    {isNaN(values.quantity) && (
                                <p data-testid="message" className="text-danger">Por favor, introduzca un número válido</p>
                            )} 
                    {/* <button type="button" data-testid="transp-reset" className="btn btn-info  btn-sm " onClick={useCallback(() => setValues(initialValues), [initialValues])}>Reset</button>     */}
                 
                  

                </div>
            </div>
        </div>
    );
};
export default Form;
