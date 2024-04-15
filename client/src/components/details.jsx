import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useParams, useNavigate, Link} from 'react-router-dom'

const Details = (props) => {
    const {id} = useParams();
    const [oneItem, setOneItem] = useState([]);
    const navigate = useNavigate();
    const {itemlist, setItemlist} = props

    useEffect(() => {
        axios.get('http://localhost:8000/api/itemdetails/' + id)
            .then(res => {setOneItem(res.data)})
            .catch(err => console.log('details itemdetails err: ', err))
    }, []);

    const deleteItem = (id) => {
        axios.delete('http://localhost:8000/api/deleteItem/' + id)
            .then(res => {console.log(`${oneItem.name} was removed from the list.`);
                setItemlist(itemlist.filter(item => item._id != id));
                navigate('/')})
            .catch(err => console.log('details deleteItem err: ', err))}

    return (
        <>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
            <h1>Details</h1>
            <Link to={`/`}>back to list</Link>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
            <p>Details about: {oneItem.name}</p>
            <button onClick={e => deleteItem(oneItem._id)}  style={{border:'1px solid blue', margin:'3px', padding:'5px', borderRadius:'2px'}}>Adopt {oneItem.name}</button>
        </div>

        <div>
        <table style={{border:'none'}}>
            <tr style={{border:'none', margin:'10px'}}>
                <th style={{border:'none', textAlign:'right', padding:'10px'}}>Item Section:</th>
                <td></td>
                <td style={{border:'none', textAlign:'left', padding:'10px'}}>{oneItem.section}</td>
            </tr>
            <tr style={{border:'none', margin:'10px'}}>
                <th style={{border:'none', textAlign:'right', padding:'10px'}}>Description:</th>
                <td></td>
                <td style={{border:'none', textAlign:'left', padding:'10px'}}>{oneItem.description}</td>
            </tr>
            <tr style={{border:'none'}}>
                <th style={{border:'none', textAlign:'right', verticalAlign:'top', padding:'10px'}}>Alternatives:</th>
                <td></td>
                <td style={{border:'none', textAlign:'left', padding:'10px'}}>
                    {oneItem.alternative1}<br/>
                    {oneItem.alternative2}<br/>
                </td>
            </tr>
        </table>

        </div>
        </>
    )
}
export default Details;