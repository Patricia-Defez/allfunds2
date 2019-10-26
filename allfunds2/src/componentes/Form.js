import React, { useState} from 'react';
import ReacToExcel from 'react-html-table-to-excel';



const Form = () => {

    const initialValues = { kind: "", quantity: 0.00, result: 0.00 };
    const [values, setValues] = useState({ ...initialValues });
    const initialExpenses = [];
    const [expenses, setExpenses] = useState (initialExpenses)
    const [total, setTotal] = useState (0)

    const handleChange = (event) => {
        event.persist();
        setValues(values => ({ ...values, [event.target.name]: event.target.value }));
    };

    const handleSubmit = () => {
        setExpenses([...expenses, values])
        setTotal(total => (total + (values.result * 1)))
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
        return toPay 
    };


    const payment = () => {
        if (values.kind === 'TRANSPORTATION') {
            return values.result = paying(values.quantity, 100, 0.12, 0.08)          
        } else if (values.kind === 'MEAL') {
            return values.result = paying(values.quantity, 3, 10, 6)
        } else if (values.kind === 'PARKING') {
            return values.result = paying(values.quantity, 20, 1, 0.5)
        } else {
            return 0;
        }
    };


    return (
        <div className="box mx-auto">

            <div className="container  p-3">
                <h1 className="text-center p-5">Gestion de Dietas</h1>
                <table className="table" id="tblData">
                <thead>
                    <tr className="text-center align-middle">
                        <th scope="col">#</th>
                        <th scope="col">Concept</th>
                        <th scope="col">Units</th>
                        <th scope="col">To pay</th>
                    </tr>
                </thead>
                <tbody>
                    {[...expenses].map((expense, index) => (
                        <tr{...expenses} key={index} className="text-center align-middle" >
                            <th scope="row">{index+1}</th>
                            <td>{expense.kind}</td>
                            <td>{expense.quantity}</td>                            
                            <td>{expense.result}</td>
                        </tr>
                    ))}
                    <tr className="text-center align-middle">
                    <th scope="row">Total</th>
                    <td></td>
                    <td></td>
                    <td>{`${total} $`}</td>
                    </tr>
                    </tbody>
            </table>
            <ReacToExcel 
                className="btn btn-info  btn-sm"
                table="tblData"
                filename="excelFile"
                sheet="sheet 1"
                buttonText="EXPORT"
            />

                <div className="marco mx-auto m-5 p-5 ">
                    <div className="row mb-3">
                        <div className="input-group  mb-2">
                            <label className="col-sm-2">Tipo de gasto:</label>
                            <select className="custom-select col-sm-4" name="kind" onChange={handleChange}>
                                <option defaultValue>Selecciona</option>
                                <option value="TRANSPORTATION" >Desplazamientos</option>
                                <option value="MEAL">Comida</option>
                                <option value="PARKING">Parking</option>
                            </select>
                            <label className="col-sm-2  ml-4">Cantidad:</label>
                            <input
                                data-testid="input"
                                type="text"
                                className={`form-control col-sm-2 ${isNaN(values.quantity) ? 'text-danger is-invalid' : ''}`}
                                name="quantity"
                                value={values.quantity}
                                onChange={handleChange}/>
                            <label className="col-sm-2  ml-4">A pagar:</label>
                            <input
                                className="col-sm-2"
                                type="text"
                                name="result"
                                value={`${payment()} $`}
                                onChange={handleChange}/>
                        </div>

                    </div>
                    {isNaN(values.quantity) && (
                        <p data-testid="message" className="text-danger">Por favor, introduzca un número válido</p>
                    )}
                    <button type="submit" data-testid="values-submit" className="btn btn-info  btn-sm " onClick={handleSubmit}>Submit</button>    



                </div>
            </div>
        </div>
    );
};
export default Form;
