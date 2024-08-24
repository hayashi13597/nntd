"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { dataTypes } from "@/app/page";
import { DialogTrigger } from "@radix-ui/react-dialog";
import axios from "axios";
import { toast } from "react-toastify";

type ModalClientProps = {
  title: string;
  type: string;
  data?: dataTypes;
  setData?: React.Dispatch<React.SetStateAction<dataTypes[]>>;
};

const ModalClient = ({ title, type, data, setData }: ModalClientProps) => {
  const [nameInGame, setNameInGame] = useState(data?.nameInGame || "");
  const [nameZalo, setNameZalo] = useState(data?.nameZalo || "");

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    if (id === "nameInGame") {
      setNameInGame(value);
    } else {
      setNameZalo(value);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nameInGame = (event.target as HTMLFormElement).nameInGame.value;
    const nameZalo = (event.target as HTMLFormElement).nameZalo.value;
    if (type === "add") {
      try {
        const res = await axios.post("/api/users", { nameInGame, nameZalo });
        if (res.status === 201) {
          toast.success("Thêm thành công");
        }
        setData?.((prev) => [...prev, res.data.user]);
      } catch (error) {
        console.log(error);
        toast.error("Thêm thất bại");
      }
    } else {
      setData?.((prev) =>
        prev.map((item) => {
          if (item._id === data?._id) {
            return { _id: item._id, nameInGame, nameZalo };
          }
          return item;
        })
      );

      try {
        const res = await axios.put(`/api/users?id=${data?._id}`, {
          nameInGame,
          nameZalo,
        });

        if (res.status === 200) {
          toast.success("Sửa thành công");
        }
      } catch (error) {
        console.log(error);
        toast.error("Sửa thất bại");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <Input
          type="text"
          id="nameInGame"
          placeholder="Tên Ingame"
          value={nameInGame}
          onChange={handleChangeInput}
        />
      </div>
      <div className="mb-4">
        <Input
          type="text"
          id="nameZalo"
          placeholder="Tên Zalo"
          value={nameZalo}
          onChange={handleChangeInput}
        />
      </div>
      <DialogTrigger asChild>
        <Button type="submit">{title}</Button>
      </DialogTrigger>
    </form>
  );
};

export default ModalClient;
