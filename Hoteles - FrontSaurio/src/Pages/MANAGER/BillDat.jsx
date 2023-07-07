export const Bill1 = ({description, user, reservation, total})=>{
    return (
        <>
            <td>{description}</td>
            <td>{user}</td>
            <td>{reservation}</td>
            <td>{total}</td>
        </>
    )
}