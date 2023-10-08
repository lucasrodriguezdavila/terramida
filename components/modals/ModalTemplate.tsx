import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function ModalTemplate({
  children,
  isOpen,
  closeModal,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  closeModal: () => void;
}) {
  return (
    <>
      <Transition appear show={isOpen}>
        <Dialog as="div" className="relative z-[999999]" onClose={closeModal}>
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="bg-overlay fixed inset-0 bg-slate-500 bg-opacity-30 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 flex min-h-full w-full flex-col items-center justify-center overflow-y-auto p-4">
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-50"
              leaveTo="opacity-0"
            >
              <Dialog.Panel className="flex  w-[80vw] md:w-[60vw] lg:w-[40vw] mx-auto flex-col items-center justify-start gap-4 rounded-2xl bg-slate-100 p-4">
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
