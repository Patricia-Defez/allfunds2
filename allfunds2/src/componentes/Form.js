import React, { useState, useCallback } from 'react';
// import FormField from './FormField';



const Form = () => {

    const initialValues = {kind: "", quantity:0.00, resul: 0.00};
    const [values, setValues] = useState(initialValues);




    function paying(n, limit, BFactor, SFactor) {
        let toPay = 0
        if (!isNaN(n)) {
            if (n <= limit) {
                toPay = n * BFactor
            } else {
                toPay = (((n - limit) * SFactor) + (limit * BFactor)).toFixed(2)
            }
        }
        return toPay
    };


    const toPayTransp = paying(transportation, 100, 0.12, 0.08)
    const toPayMeal = paying(meal, 3, 10, 6)
    const toPayParking = paying(parking, 20, 1, 0.5)
    const toPayTotal = (toPayTransp * 1) + (toPayMeal * 1) + (toPayParking * 1)

    return (
        <div className="box mx-auto p-5">
            <div className="container  p-5">
                <h1 className="text-center">Gestion de Dietas</h1>
                <div className="marco mx-auto m-5 p-5 ">
                    <div className="row mb-3">
                        <FormField title="Desplazamientos" name="transportation" role="Kms" vari={toPayTransp} data-testid="transp-input"
                            value={transportation}
                            onChange={e => setTransportation(e.target.value)} />
                        <button type="button" data-testid="transp-reset" className="btn btn-info  btn-sm " onClick={useCallback(() => setTransportation(initialValue), [initialValue])}>Reset</button>    
                    </div>
                    
                    <div className="row mb-3">
                        <FormField title="Nº de comidas" name="meal" role="Uds." vari={toPayMeal} data-testid="meal-inputl"
                            value={meal}
                            onChange={e => setMeal(Math.trunc(e.target.value))} />
                        <button type="button" data-testid="meal-reset" className=" btn btn-info  btn-sm " onClick={useCallback(() => setMeal(initialValue), [initialValue])}>Reset</button>
                    </div>
                    <div className="row mb-3">
                        <FormField title="Parking" name="parking" role="$" vari={toPayParking} data-testid="parking-input"
                            value={parking}
                            onChange={e => setParking(e.target.value)} />
                        <button type="button" data-testid="parking-reset" className="btn btn-info  btn-sm" onClick={useCallback(() => setParking(initialValue), [initialValue])}>Reset</button>
                    </div>
                    <div className="text-right font-weight-bold"  data-testid="total-result">Total a pagar: {toPayTotal} $</div>

                </div>
            </div>
        </div>
    );
};
export default Form;
