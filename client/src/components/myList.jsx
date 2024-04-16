import {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const Mylist = (props) => {
    const {itemlist, setItemlist} = props
    const [name, setName] = useState('')
    const [section, setSection] = useState('')
    const [notes, setNotes] = useState('')
    const [alternative1, setAlternative1] = useState('')
    const [alternative2, setAlternative2] = useState('')
    const [errors, setErrors] = useState([]);

    const addNewItem = (e) => {
        e.preventDefault();
            
            const newItem = {
                name,
                section,
                notes,
                alternative1,
                alternative2
            }
    
            axios.post('http://localhost:8000/api/newitem', newItem)
                .then(res => {
                    setItemlist([...itemlist, res.data]);
                    setName('');
                    setSection('');
                    setNotes('');
                    setAlternative1('');
                    setAlternative2('');
                    setErrors([]);
                })
                .catch(err => {
                    console.log('additem newitem err: ', err);
                    setErrors(err.response.data.errors);            })
        
    }

    const deleteItem = (id, name) => {
        axios.delete('http://localhost:8000/api/deleteItem/' + id)
            .then(res => {console.log(`${name} was removed from the list.`);
                            setItemlist(itemlist.filter(item => item._id != id));})
            .catch(err => console.log('details deleteItem err: ', err))}

    return(
        <>
        <div style={{alignText:'center'}}>
            <h1>My Shopping List</h1>
        </div>
        <p></p>
        <form onSubmit={addNewItem} style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <div>
                    <div style={{ margin: '5px' }}>
                        <label>Name:</label>
                        <input section='text'
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
                    <button style={{ border: '1px solid blue', margin: '3px', padding: '5px', borderRadius: '2px' }}>Add New Item</button>
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

        <table>
            <thead>
                <tr>
                    <th>&#x2714;</th>
                    <th>Item</th>
                    <th>Notes</th>
                    <th>Alternatives</th>
                    <th>Section</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {itemlist.sort((item1, item2) => (item1.section.toLowerCase() < item2.section.toLowerCase() ? -1 : ((item1.section.toLowerCase() > item2.section.toLowerCase()) ? 1 : 0))).map(item => { 
                return (
                    <tr key={item._id}>
                        <td><input type='checkbox'  onChange={e => deleteItem(item._id, item.name)}  style={{border:'1px solid blue', margin:'3px', padding:'5px', borderRadius:'2px'}}/></td>
                        <td><Link to={`/details/${item._id}`} >{item.name}</Link></td>
                        <td><p>{item.notes}</p></td>
                        {item.alternative1 || item.alternative2 ? <td>{item.alternative1} {item.alternative2}</td>
                                                                : <td></td>}
                        <td><p>{item.section}</p></td>
                        <td>
                            <Link to={`/edit/${item._id}`}>&#128393;</Link>
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </table>
        </>
    )
}
export default Mylist
