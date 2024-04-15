import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link, useParams } from 'react-router-dom'

const Edititem = (props) => {
    const { itemlist, setItemlist } = props
    const {id} = useParams();
    const [name, setName] = useState('')
    const [section, setSection] = useState('')
    const [notes, setNotes] = useState('')
    const [alternative1, setAlternative1] = useState('')
    const [alternative2, setAlternative2] = useState('')
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/itemdetails/' + id)
            .then(res => {                
                setName(res.data.name);
                setSection(res.data.section);
                setNotes(res.data.notes);
                setAlternative1(res.data.alternative1);
                setAlternative2(res.data.alternative2);
            })
            .catch(err => console.log('edititem itemdetails err: ', err))
    },[])

    const edititem = (e) => {
        e.preventDefault();

        const updatedItem = {
            name,
            section,
            notes,
            alternative1,
            alternative2
        }

        axios.put('http://localhost:8000/api/updateItem/' + id, updatedItem)
            .then(res => {
                    setName('');
                    setSection('');
                    setNotes('');
                    setAlternative1('');
                    setAlternative2('');
                    navigate('/details/'+id)})
            .catch(err => {console.log('updateitem updateOneById err: ', err);
                            setErrors(err.response.data.errors)})
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
                <h1>Edit</h1>
                <Link to={`/`}>back to list</Link>
            </div>
            <p>Edit {name}</p>
            <form onSubmit={edititem} style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <div>
                    <div style={{ margin: '5px' }}>
                        <label>Name:</label>
                        <input type='text'
                            onChange={(e) => setName(e.target.value)}
                            value={name} />
                        {errors.name ? <p>{errors.name.message}</p> : null}
                    </div>

                    <div style={{ margin: '5px' }}>
                        <label>Section:</label>
                        <input type='text'
                            onChange={(e) => setSection(e.target.value)}
                            value={section} />
                        {errors.section ? <p>{errors.section.message}</p> : null}
                    </div>

                    <div style={{ margin: '5px' }}>
                        <label>Notes:</label>
                        <input type='text'
                            onChange={(e) => setNotes(e.target.value)}
                            value={notes} />
                        {errors.notes ? <p>{errors.notes.message}</p> : null}
                    </div>
                    <button style={{ border: '1px solid blue', margin: '3px', padding: '5px', borderRadius: '2px' }}>Edit {name}</button>
                </div>
                <div>
                    <div style={{ margin: '5px' }}>
                        <label>Alternative 1:</label>
                        <input type='text'
                            onChange={(e) => setAlternative1(e.target.value)}
                            value={alternative1} />
                        {errors.alternative1 ? <p>{errors.alternative1.message}</p> : null}
                    </div>

                    <div style={{ margin: '5px' }}>
                        <label>Alternative 2:</label>
                        <input type='text'
                            onChange={(e) => setAlternative2(e.target.value)}
                            value={alternative2} />
                        {errors.alternative2 ? <p>{errors.alternative2.message}</p> : null}
                    </div>

                    
                </div>

            </form>
        </>
    )
}
export default Edititem;