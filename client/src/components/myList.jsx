import {Link} from 'react-router-dom'

const Mylist = (props) => {
    const {itemlist, setItemlist} = props

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
                        <td><button>delete</button></td>
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
