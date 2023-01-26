import React, { useRef } from "react";
import { useEffect } from "react";

export default React.memo(function Modal({
  id,
  title,
  body,
  size = '2xl',
  className,
  modalBodyClassName,
  modalContentClassName,
  footer,
  modalFooterClassName,
  isVisible,
  setVisiblility,
  hideOnOutsideClick = true,
  onHide,
  onHidden,
}) {
  const modalRef = useRef();
  const backdropRef = useRef();

  const onOutsideClicked = e => {
    if (e.target.dataset.modal !== 'true' || false === hideOnOutsideClick) return;
    closeModal();
  }

  const closeModal = () => {
    setVisiblility(false);
    if (typeof onHide === 'function') onHide();
  }

  className = ['overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal h-full flex', className].join(' ');
  modalFooterClassName = ['flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600', modalFooterClassName].join(' ');
  modalBodyClassName = ['p-6 space-y-6 dark:text-white', modalBodyClassName].join(' ');
  modalContentClassName = ['relative bg-white rounded-lg shadow dark:bg-gray-700', modalContentClassName].join(' ');

  const modalMaxSize = (() => {
    switch (size) {
      case 'xs': return 'max-w-xs';
      case 'sm': return 'max-w-sm';
      case 'md': return 'max-w-md';
      case 'lg': return 'max-w-lg';
      case 'xl': return 'max-w-xl';
      case '2xl': return 'max-w-2xl';
      case '3xl': return 'max-w-3xl';
      case '4xl': return 'max-w-4xl';
      case '5xl': return 'max-w-5xl';
      case '6xl': return 'max-w-6xl';
      case '7xl': return 'max-w-7xl';
      case 'full': return 'max-w-full';
      default: return 'max-w-2xl';
    }
  })();

  useEffect(() => {
    if (isVisible === true) {
      document.body.classList.add('overflow-hidden');
      modalRef.current.classList.remove('hidden');
    }

    if (isVisible !== true) {
      document.body.classList.remove('overflow-hidden');
      setTimeout(() => {
        modalRef.current.classList.add('hidden');
        if (typeof onHidden === 'function') onHidden();
      }, 200);
    }
  }, [isVisible]);

  useEffect(() => {
    if (isVisible !== true) {
      modalRef.current.classList.add('hidden');
    }
  }, []);

  return (
    <div
      ref={modalRef}
      id={id}
      tabIndex="-1"
      aria-hidden={isVisible ? 'false' : 'true'}
      className={className}
      onClick={onOutsideClicked}
    >
      {/* Modal backdrop */}
      <div
        ref={backdropRef}
        data-modal={true}
        className={`${isVisible === true ? 'ease-out duration-300' : 'ease-in duration-200 opacity-0'} transition-opacity fixed inset-0 bg-black bg-opacity-75`}
      />

      {/* Modal dialog */}
      <div className={`relative p-4 w-full h-full md:h-auto m-auto ${modalMaxSize}`}>
        {/* Modal content */}
        <div className={`${isVisible === true ? 'ease-out duration-300' : 'ease-in duration-200 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'} transition-all ${modalContentClassName}`}>
          {/* Modal header */}
          <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <button type="button" onClick={closeModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* Modal body */}
          <div className={modalBodyClassName}>
            {typeof body === 'function' ? body() : body}
          </div>
          {/* Modal footer */}
          {footer && (
            <div className={modalFooterClassName}>
              {typeof footer === 'function' ? footer() : footer}
            </div>
          )}
        </div>
      </div>
    </div>

  )
})