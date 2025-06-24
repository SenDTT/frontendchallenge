import { ModalProps } from "../types";

const Modal = ({ show, onClose, children, title }: ModalProps) => {
    return (
        <div
            className={`fixed top-0 h-full w-full z-50 transition-transform duration-300
          ${show ? 'translate-x-0' : 'translate-x-full'}
          sm:right-0 sm:w-[500px] sm:bg-white sm:shadow-lg
          sm:translate-x-0
          sm:transition-transform
          sm:duration-300
          bg-white
          sm:fixed
          sm:top-0
          sm:h-full
          sm:z-50
          sm:overflow-y-auto
          sm:p-6
          py-4 px-2
          sm:left-auto
          left-0
          ${show ? 'left-0 translate-x-0' : '-translate-x-full'}
          sm:translate-x-0 sm:left-auto`}
        >
            <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-gray-800">
                    {title}
                </h3>

                <a
                    className="absolute top-4 right-4 text-gray-800 hover:text-black cursor-pointer text-lg"
                    onClick={onClose}
                >
                    x
                </a>
            </div>
            <div className="mt-8">
                {children}
            </div>
        </div>
    );
};

export default Modal;
