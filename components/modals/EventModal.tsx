"use client";
import { useModal } from "@/stores/modals";
import React, { useCallback } from "react";
import ModalTemplate from "./ModalTemplate";

const EventModal = () => {
  const data = useModal((state) => state.eventModal.data);
  const setData = useModal((state) => state.eventModal.setData!);

  const handleCloseModal = useCallback(() => {
    setData(null);
  }, [setData]);

  return (
    <ModalTemplate closeModal={handleCloseModal} isOpen={!!data}>
      este es el modal del evento
      {data?.lat} - {data?.lng}
    </ModalTemplate>
  );
};

export default EventModal;
