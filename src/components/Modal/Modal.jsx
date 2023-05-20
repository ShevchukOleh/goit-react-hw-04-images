import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalStyle, Image } from './Modal.styled';

const Modal = (props) => {
    const { onClose, imgData } = props;

    const clickBackdrop = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.code === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    return (
        <Overlay onClick={clickBackdrop}>
            <ModalStyle>
                <Image src={imgData.largeImageURL} alt={imgData.tags} />
            </ModalStyle>
        </Overlay>
    )
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    imgData: PropTypes.shape({
        largeImageURL: PropTypes.string,
        tags: PropTypes.string
    }).isRequired,
};

export default Modal;