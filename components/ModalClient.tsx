"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { dataTypes } from "@/app/page";
import { DialogTrigger } from "@radix-ui/react-dialog";
import axios from "axios";
import { toast } from "react-toastify";
import { useGlobalContext } from "@/contexts/LoadingContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sortData } from "@/lib/utils";
import { roleObject } from "@/constants";

type ModalClientProps = {
  title: string;
  type: string;
  data?: dataTypes;
  setData?: React.Dispatch<React.SetStateAction<dataTypes[]>>;
  isAdmin?: boolean;
};

const ModalClient = ({
  title,
  type,
  data,
  setData,
  isAdmin,
}: ModalClientProps) => {
  const [nameInGame, setNameInGame] = useState(data?.nameInGame || "");
  const [nameZalo, setNameZalo] = useState(data?.nameZalo || "");
  const { setLoading } = useGlobalContext();
  const [selectedValue, setSelectedValue] = useState(
    data?.role.toString() || "6"
  );

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
    setLoading(true);
    if (type === "add") {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/users`,
          { nameInGame, nameZalo, role: selectedValue, order: 999 }
        );
        if (res.status === 201) {
          toast.success("Thêm thành công");
        }
        setData?.((prev) => {
          let rawData = [...prev, res.data.user];
          return sortData(rawData);
        });
      } catch (error) {
        console.log(error);
        toast.error("Thêm thất bại");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const res = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/users?id=${data?._id}`,
          {
            nameInGame,
            nameZalo,
            role: Number(selectedValue),
            order: data?.order,
          }
        );

        if (res.status === 200) {
          toast.success("Sửa thành công");
        }

        setData?.((prev) => {
          let rawData = [...prev];
          const index = rawData.findIndex((item) => item._id === data?._id);
          rawData[index] = res.data.user;
          return sortData(rawData);
        });
      } catch (error) {
        console.log(error);
        toast.error("Sửa thất bại");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleOnChangeSelect = (value: string) => {
    setSelectedValue(value);
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
      {isAdmin && (
        <div className="mb-4">
          <Select value={selectedValue} onValueChange={handleOnChangeSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Chức vụ" />
            </SelectTrigger>
            <SelectContent>
              {roleObject.map((role) => (
                <SelectItem key={role.value} value={`${role.value}`}>
                  {role.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      <DialogTrigger asChild>
        <Button type="submit">{title}</Button>
      </DialogTrigger>
    </form>
  );
};

export default ModalClient;
