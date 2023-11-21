import { IoIosBug, IoMdSad } from "react-icons/io";

type Props = {
    children: React.ReactNode
    bug?: boolean
}

const ErrorBlock = ({children, bug}: Props) => {
    return ( 
        <div className="error-block">
            <h1>{children}</h1>
            <p>Seems like there is a problem</p>
            {bug ? <IoIosBug/> : <IoMdSad/>}
        </div>
     );
}
 
export default ErrorBlock;