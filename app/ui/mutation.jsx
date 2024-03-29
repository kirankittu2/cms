"use client";

import Button from "@/app/ui/button";
import Image from "next/image";
import dropdown from "@/public/collapse-icon/collapse-icon.svg";
import { Suspense, useState } from "react";
import {
  deleteArticleCategory,
  deleteArticles,
  deleteImages,
} from "@/app/lib/data";
import Pagination from "./pagination";

export default function Mutation({
  name,
  data,
  mutateData = "",
  totalPages = "",
  storeImageID = "",
  unique_name,
}) {
  const [toggle, handleToggle] = useState(false);
  const [value, updateValue] = useState("Select An Option");

  function dropdownToggle() {
    handleToggle(!toggle);
  }

  async function deleteData() {
    if (name == "media") {
      if (value == "Delete") {
        const response = await fetch("/files/delete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ filenames: mutateData }),
        });

        const data = await response.json();
        if (data.status == true) {
          storeImageID([]);
          await deleteImages(mutateData);
        }
      }
    }

    if (name == "article_category") {
      if (value == "Delete") {
        storeImageID([]);
        deleteArticleCategory(mutateData, unique_name);
      }
    }

    if (name == "articles") {
      if (value == "Delete") {
        storeImageID([]);
        deleteArticles(mutateData, unique_name);
      }
    }
  }

  return (
    <div className="bg-white p-10 border-t border-[#EBEBEB flex items-center w-full">
      <h3 className="text-15-grey mr-4">Action</h3>
      <div
        className="relative cursor-pointer "
        onMouseEnter={dropdownToggle}
        onMouseLeave={dropdownToggle}>
        <div className="w-full bg-[#F8F8F8] pl-[1.24rem] pb-[1.24rem] pt-[1.24rem] pr-[100px] rounded h-[48px] flex items-center text-15-black border border-[#DCDCDC]">
          {value}
        </div>
        <Image
          className="absolute -rotate-90 top-[18px] right-[18px] w-auto h-auto"
          src={dropdown}
          width={8}
          height={14}
          alt="Dropdown icon"
        />
        {toggle && (
          <div className="w-full bg-[#F8F8F8] border border-[#DCDCDC] rounded absolute z-[100]">
            {data.map((item) => {
              return (
                <div
                  key={item}
                  data-option={item}
                  className="h-[48px] hover:bg-black hover:text-white text-15-black flex items-center p-[1.24rem] border-b border-[#DCDCDC]"
                  onClick={(e) =>
                    updateValue(e.currentTarget.getAttribute("data-option"))
                  }>
                  {item}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="w-4"></div>
      <Button name="Apply to Selected Items" onClick={deleteData} />
      <Suspense>
        <Pagination totalPages={totalPages} />
      </Suspense>
    </div>
  );
}
