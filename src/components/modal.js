import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

const Modal = ({children, open, onClose}) => {
    const dialog = useRef();

    useEffect(() => {
        const modal = dialog.current;

        if (open) {
            modal.showModal();
        }

        return() => modal.close();
    }, [open])

    if (typeof document !== `undefined`) {
        return (
            createPortal(
                <dialog ref={dialog} className="modal" onClose={onClose}>
                    <div className='modal-container'>
                        {children}
                    </div>
                </dialog>, 
                document.body
            )
        )
      }
}

export default Modal