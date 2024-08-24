import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ModalClient from "./ModalClient"; // Import the client component
import { Button } from "./ui/button";
import { dataTypes } from "@/app/page";

type ModalProps = {
  title: string;
  type: string;
  data?: dataTypes;
  setData?: React.Dispatch<React.SetStateAction<dataTypes[]>>;
};

const Modal = ({ title, type, data, setData }: ModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{title}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-5">{title} thành viên</DialogTitle>
          <DialogDescription></DialogDescription>
          <ModalClient
            title={title}
            type={type}
            data={data}
            setData={setData}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
