import React from 'react';

const RenderRows = (props) => {
    // return props.list.map((expense) => {
        return (
            <tr>
                <td>valor</td>
                <td>descricao</td>
                <td>currency</td>
                <td>metodo</td>
                <td>tag</td>
                {/* <td>
                    <button onClick={() => props.load(expense)} className="btn btn-warning">
                        <i className="fa fa-pencil"></i>
                    </button>
                    <button
                        onClick={() => props.remove(expense)}
                        className="btn btn-danger ml-2"
                    >
                        <i className="fa fa-trash"></i>
                    </button>
                </td> */}
            </tr>
        );
    // });
};

export default RenderRows;
