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
                    <th>Name</th>
                    <th>Section</th>
                    <th>Alt 1</th>
                    <th>Alt 2</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {itemlist.sort((item1, item2) => (item1.section.toLowerCase() < item2.section.toLowerCase() ? -1 : ((item1.section.toLowerCase() > item2.section.toLowerCase()) ? 1 : 0))).map(item => { 
                return (
                    <tr key={item._id}>
                        <td><p>{item.name}</p></td>
                        <td><p>{item.section}</p></td>
                        <td><p>{item.alternative1}</p></td>
                        <td><p>{item.alternative2}</p></td>
                        <td>
                            <Link to={`/details/${item._id}`} >details</Link> | 
                            <Link to={`/edit/${item._id}`}> edit</Link>
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
