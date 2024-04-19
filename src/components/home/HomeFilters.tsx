"use client";

import { HomePageFilters } from "@/constants/filters";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formURLQuery, removeKeysFromQuery } from "@/lib/utils";

const HomeFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [active, setActive] = useState("newest");

  const handleTypeClick = (item: string) => {
    if (active === item) {
      setActive("");
      const newURL = formURLQuery({
        params: searchParams.toString(),
        key: "filter",
        value: null,
      });

      router.push(newURL, { scroll: false });
    } else {
      setActive(item);
      const newURL = formURLQuery({
        params: searchParams.toString(),
        key: "filter",
        value: item.toLowerCase(),
      });
      router.push(newURL, { scroll: false });
    }
  };

  return (
    <div className="mt-10 hidden flex-wrap gap-3 md:flex">
      {HomePageFilters.map((filter) => {
        return (
          <Button
            key={filter.value}
            onClick={() => handleTypeClick(filter.value)}
            className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${
              active === filter.value
                ? "bg-primary-100 text-primary-500"
                : "dark:text-light-500 bg-light-800 text-light-500  dark:bg-dark-300"
            }`}
          >
            {filter.name}
          </Button>
        );
      })}
    </div>
  );
};

export default HomeFilters;
