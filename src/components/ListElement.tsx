type Props = {
    title: string
    children: React.ReactNode
    className?: string
}
const ListElement = ({title, children, className}:Props) => {
    return ( 
        <div className={`list ${className}`}>
            <h2>{title}</h2>
            <ul>
                {children}
            </ul>
        </div>
     );
}
 
export default ListElement;