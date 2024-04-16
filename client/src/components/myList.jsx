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
                    document.getElementById('nameInput').focus();
                })
                .catch(err => {
                    console.log('additem newitem err: ', err);
                    setErrors(err.response.data.errors);            })
        
    }

    const deleteItem = (id, name) => {
        axios.delete('http://localhost:8000/api/deleteItem/' + id)
            .then(res => {console.log(`${name} was removed from the list.`);
                            setItemlist(itemlist.filter(item => item._id != id));
                            document.getElementById('nameInput').focus();})
            .catch(err => console.log('details deleteItem err: ', err))}

    return(

        <div id='mylistpage'>
        <div style={{alignText:'center'}}>
            <h1>My Shopping List</h1>
        </div>
        <p></p>

        {/* ***** add item ***** */}
        <form onSubmit={addNewItem} style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <div style={{display:'flex', flexDirection:'column', justifyContent:'space-evenly'}}>
                <input section='text' id='nameInput'
                    onChange={(e) => setName(e.target.value)} placeholder='item name'
                    value={name} autoFocus={true}/>
                {errors.name ? <p>{errors.name.message}</p> : null}
                <input type='text'
                        onChange={(e) => setSection(e.target.value)} placeholder='store section'
                        value={section} />
                    {errors.section ? <p>{errors.section.message}</p> : null}
                    <div>
                        <input type='text'
                        onChange={(e) => setAlternative1(e.target.value)}
                        value={alternative1} placeholder='alternative choice #1'/>
                    {errors.alternative1 ? <p>{errors.alternative1.message}</p> : null}
                    </div>
                    {alternative1.length>1 ? <div style={{ margin: '5px' }}>
                                                <input type='text'
                                                    onChange={(e) => setAlternative2(e.target.value)}
                                                    value={alternative2} placeholder='alternative choice #2'/>
                                                {errors.alternative2 ? <p>{errors.alternative2.message}</p> : null}
                                            </div>
                                            : null}
            </div>
            <div>
                <textarea rows='5' cols='20' maxlength='100'
                    onChange={e => setNotes(e.target.value)} placeholder='notes                 (max 100 characters)'
                    value={notes}  />
                {errors.notes ? <p>{errors.notes.message}</p> : null}
            </div>
            <div style={{display:'flex', flexDirection:'column', justifyContent:'end', alignContent:'center'}}>
                <button style={{ border: '1px solid blue', margin: '3px', padding: '5px', borderRadius: '2px', height:'fit-content'}}>Add</button>
            </div>
            
        </form>

        {/* ***** shopping list ***** */}
        <table>
            <thead>
                <tr>
                    <th align='right'>&#x2714;</th>
                    <th align='left' className='item'>Item</th>
                    <th>Section</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {itemlist.sort((item1, item2) => (item1.section.toLowerCase() < item2.section.toLowerCase() ? -1 : ((item1.section.toLowerCase() > item2.section.toLowerCase()) ? 1 : 0))).map(item => { 
                        return (
                            <tr key={item._id}>
                                <td align='right' valign='top' className='checkAndEdit' id='check'><input type='checkbox'  onChange={e => deleteItem(item._id, item.name)}/></td>
                                <td className='item' align='left'>
                                        <p style={{fontWeight:'bold', fontSize:'1.1rem', textDecoration:'underline'}}>{item.name}</p>
                                    
                                    <p>&#9758;&nbsp;{item.notes}</p>
                                    {item.alternative1 && item.alternative2 ? <p>sub: {item.alternative1} or {item.alternative2}</p>
                                                                        : <p></p>}
                                    {item.alternative1 && !item.alternative2 ? <p>sub: {item.alternative1} </p> : <p></p>}
                                    {!item.alternative1 && !item.alternative2 ? <p>no substitions</p> : null}
                                </td>
                                <td className='section'><p>{item.section}</p></td>
                                <td className='checkAndEdit'>
                                    <Link to={`/edit/${item._id}`}>&#128393;</Link>
                                </td>
                            </tr>
                        )
                            
                })}
            </tbody>
        </table>
        </div>
    )
}
export default Mylist
