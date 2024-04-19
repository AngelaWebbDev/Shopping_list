import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'

const Edititem = () => {
    const {id} = useParams()
    const [oldName, setOldName] = useState('')
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
                setOldName(res.data.name);                
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
            <Link to='/' className='lookLikeBtn' id='gobackBtn'>Go Back</Link>
            <div id='editTitle'>
                <h3>Edit {oldName}</h3>
            </div>

            <form onSubmit={edititem} id='editForm'>
                {/* name */}
                <div className='editInputItem'>
                    <label className='editInputLabel'>Name: </label>
                    <input className='editInputContent'
                        type='text'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        autoFocus={true} />
                    {errors.name ? <p>{errors.name.message}</p> : null}<br/>
                </div>

                {/* section */}
                <div className='editInputItem'>
                    <label className='editInputLabel'>Section: </label>
                    <input className='editInputContent' 
                        type='text'
                        onChange={(e) => setSection(e.target.value)}
                        value={section} /><br/>
                    {errors.section ? <p>{errors.section.message}</p> : null}
                </div>

                {/* notes */}
                <div className='editInputItem'>
                    <label className='editInputLabel'>Notes: </label>
                    <textarea  className='editInputContent'
                                rows='5'
                                // cols='20' 
                                maxLength='100'
                                onChange={e => setNotes(e.target.value)} 
                                value={notes}  />
                    {errors.notes ? <p>{errors.notes.message}</p> : null}
                </div>
                
                {/* alternative 1 */}
                <div className='editInputItem'>
                    <label className='editInputLabel'>Alt 1: </label>
                    <input type='text'
                        className='editInputContent'
                        onChange={(e) => setAlternative1(e.target.value)}
                        value={alternative1} />
                    {errors.alternative1 ? <p>{errors.alternative1.message}</p> : null}
                </div>
                
                {/* alternative 2 */}
                {alternative1.length>1
                    ?   <div className='editInputItem'>
                            <label className='editInputLabel'>Alt 2: </label>
                            <input className='editInputContent' type='text'
                                onChange={(e) => setAlternative2(e.target.value)}
                                value={alternative2} />
                            {errors.alternative2 ? <p>{errors.alternative2.message}</p> : null}
                        </div>
                    : null}

                {/* edit button*/}
                <div id='editButtons' >
                    <Link to='/' className='lookLikeBtn'>Cancel</Link>
                    <button>Save</button>
                </div>
            </form>
        </div>
    )
}
export default Edititem;