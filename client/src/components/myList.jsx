import {Link} from 'react-router-dom'
import axios from 'axios'

const Mylist = (props) => {
    const {itemlist, setItemlist} = props

    const deleteItem = (id, name) => {
        axios.delete('http://localhost:8000/api/deleteItem/' + id)
            .then(res => {console.log(`${name} was removed from the list.`);
                            setItemlist(itemlist.filter(item => item._id != id));})
            .catch(err => console.log('details deleteItem err: ', err))}

    return(
        <>
        <div style={{display:'flex', justifyContent:'space-between', alignContent:'center'}}>
            <h1>My Shopping List</h1>
            <Link  to={`/additem`}>add an item</Link>
        </div>
        <p></p>
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>Item</th>
                    <th>Section</th>
                    <th>Notes</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {itemlist.sort((item1, item2) => (item1.section.toLowerCase() < item2.section.toLowerCase() ? -1 : ((item1.section.toLowerCase() > item2.section.toLowerCase()) ? 1 : 0))).map(item => { 
                return (
                    <tr key={item._id}>
                        <td><input type='checkbox'  onChange={e => deleteItem(item._id, item.name)}  style={{border:'1px solid blue', margin:'3px', padding:'5px', borderRadius:'2px'}}/></td>
                        <td><Link to={`/details/${item._id}`} >{item.name}</Link></td>
                        <td><p>{item.section}</p></td>
                        <td><p>{item.notes}</p></td>
                        <td>
                            <Link to={`/edit/${item._id}`}>update</Link>
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
