import { dataTypes } from "@/app/page";
import useFetch from "@/hooks/useFetch";
import { sortData } from "@/lib/utils";
import axios from "axios";
import React from "react";

type SearchComponentProps = {
  setData: React.Dispatch<React.SetStateAction<dataTypes[]>>;
};

const SearchComponent = ({ setData }: SearchComponentProps) => {
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setData([]);
    setTimeout(async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
        if (value === "") {
          setData(sortData(res.data));
          return;
        }
        const newData = res.data.filter((item: dataTypes) => {
          return item.nameZalo.toLowerCase().includes(value.toLowerCase());
        });
        setData(sortData(newData));
      } catch (error) {
        console.log(error);
      }
    }, 300);
  };

  return (
    <form>
      <label
        htmlFor="search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search"
          onChange={handleSearch}
        />
      </div>
    </form>
  );
};

export default SearchComponent;
