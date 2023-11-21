import { IoIosClose } from 'react-icons/io'

type Props = {
    children: React.ReactNode
    setActive: React.Dispatch<React.SetStateAction<boolean>>
}

const Modal = ({children, setActive}: Props) => {
    return ( 
        <div className="modal-background">
            <div className='modal-main'>
                <button className='btn btn-secondary' onClick={() => setActive(false)}><IoIosClose/></button>
                {children}
            </div>
        </div>
     );
}
 
export default Modal;