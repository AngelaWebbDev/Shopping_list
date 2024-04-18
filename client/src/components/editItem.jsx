import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const Edititem = () => {
    // const { id } = props
    const {id} = useParams()
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

        axios.put('http://localhost:8000/api/edit/'+id, updatedItem)
            .then(res => navigate('/'))
            .catch(err => {console.log('edititem updateitem err: ', err);
                            setErrors(err.response.data.errors)})
    }

    return (
        <div id='editItemPage'>
            <div id='editTitle'>
                <h3>Edit {name}</h3>
            </div>
            <form onSubmit={edititem} id='editForm'>
                <div className='editInputItem'>
                    <label>Name: </label>
                    <input type='text'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        autoFocus={true} />
                    {errors.name ? <p>{errors.name.message}</p> : null}<br/>
                </div>
                <div className='editInputItem'>
                    
                    
                    <label>Section: </label>
                    <input type='text'
                        onChange={(e) => setSection(e.target.value)}
                        value={section} /><br/>
                    {errors.section ? <p>{errors.section.message}</p> : null}
                </div>

                <div className='editInputItem'>
                    <label>Notes: </label>
                    <textarea rows='5'
                                cols='20' 
                                maxLength='100'
                                onChange={e => setNotes(e.target.value)} 
                                value={notes}  />
                    {errors.notes ? <p>{errors.notes.message}</p> : null}
                </div>
                    
                <div className='editInputItem'>
                    <label>Alternative 1: </label>
                    <input type='text'
                        onChange={(e) => setAlternative1(e.target.value)}
                        value={alternative1} />
                    {errors.alternative1 ? <p>{errors.alternative1.message}</p> : null}
                </div>
                    
                {alternative1.length>1
                    ?   <div className='editInputItem'>
                            <label>Alternative 2: </label>
                            <input type='text'
                                onChange={(e) => setAlternative2(e.target.value)}
                                value={alternative2} />
                            {errors.alternative2 ? <p>{errors.alternative2.message}</p> : null}
                        </div>
                    : null}

                    <div id='editButtons' >
                        <button>Save</button>
                        {/* add link to cancel (returns to itemlist.jsx) */}
                    </div>
                
            </form>
        </div>
    )
}
export default Edititem;