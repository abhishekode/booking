export interface ModalProps {
	isOpen: boolean;
	toggleModal: () => void;
	children?: React.ReactNode;
}