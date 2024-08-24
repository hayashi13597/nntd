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
import SearchComponent from "@/components/SearchComponent";
import { cn, sortData } from "@/lib/utils";
import { Reorder } from "framer-motion";
import { roleObject } from "@/constants";

export type dataTypes = {
  _id?: string;
  nameInGame: string;
  nameZalo: string;
  role: number;
  order: number;
};

export default function Manager() {
  const [data, setData] = useState<dataTypes[]>([]);
  const { setLoading } = useGlobalContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
        const sortedData = sortData(res.data);
        setData(sortedData);
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

  const handleReorder = async (newData: dataTypes[]) => {
    // update order
    const updatedData = newData.map((item, index) => ({
      ...item,
      order: index,
    }));
    setData(updatedData);
    setLoading(true);
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/order`,
        updatedData
      );
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mt-5 w-10/12 mx-auto mb-5">
      <div className="flex justify-between items-center mb-5">
        <Modal title="Thêm" type="add" setData={setData} isAdmin={true} />
        <SearchComponent setData={setData} />
      </div>
      <Reorder.Group axis="y" values={data} onReorder={handleReorder}>
        <Table>
          <TableCaption>
            Danh sách thành viên S19 TMG - Ngự Uyển Viên
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Tên Ingame</TableHead>
              <TableHead className="text-center">Tên Zalo</TableHead>
              <TableHead className="text-center">Chức Vụ</TableHead>
              <TableHead className="text-center"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((item) => (
                <Reorder.Item
                  key={item._id}
                  value={item}
                  as="tr"
                  className="border-b"
                >
                  <TableCell className="text-center">
                    {item.nameInGame}
                  </TableCell>
                  <TableCell className="text-center">{item.nameZalo}</TableCell>
                  <TableCell
                    className={`text-center bg-gradient-to-r ${cn(
                      "from-yellow-400 to-yellow-600",
                      {
                        "from-rose-500 to-red-700": item.role === 1,
                        "from-green-300 to-indigo-500": item.role === 2,
                        "from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%":
                          item.role === 3,
                        "from-indigo-500 via-purple-500 to-pink-500":
                          item.role === 4,
                        "from-cyan-500 to-blue-500": item.role === 5,
                        "text-black": item.role === 6,
                      },
                      "text-transparent bg-clip-text"
                    )}`}
                  >
                    {roleObject.find((role) => role.value === item.role)?.label}
                  </TableCell>
                  <TableCell className="flex justify-center items-center gap-3">
                    <Modal
                      title="Sửa"
                      type="edit"
                      data={item}
                      setData={setData}
                      isAdmin={true}
                    />
                    <Button onClick={() => handleDelete(item._id || "")}>
                      Xóa
                    </Button>
                  </TableCell>
                </Reorder.Item>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  Không có dữ liệu
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Reorder.Group>
    </main>
  );
}
