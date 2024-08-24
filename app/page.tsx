"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Modal from "@/components/Modal";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useGlobalContext } from "@/contexts/LoadingContext";

export type dataTypes = {
  _id?: string;
  nameInGame: string;
  nameZalo: string;
};

export default function Home() {
  const [data, setData] = useState<dataTypes[]>([]);
  const { setLoading } = useGlobalContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Bạn có chắc chắn muốn xóa?");
    if (!confirm) return;
    setLoading(true);
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/users?id=${id}`);
      setData((prev) => prev.filter((item) => item._id !== id));
      toast.success("Xóa thành công");
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mt-5 w-10/12 mx-auto">
      <Modal title="Thêm" type="add" setData={setData} />
      <Table>
        <TableCaption>Danh sách thành viên S19 Tái Sinh</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Tên Ingame</TableHead>
            <TableHead className="text-center">Tên Zalo</TableHead>
            <TableHead className="text-center"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item._id}>
              <TableCell className="text-center">{item.nameInGame}</TableCell>
              <TableCell className="text-center">{item.nameZalo}</TableCell>
              <TableCell className="flex justify-center items-center gap-3">
                <Modal title="Sửa" type="edit" data={item} setData={setData} />
                <Button onClick={() => handleDelete(item._id || "")}>
                  Xóa
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
