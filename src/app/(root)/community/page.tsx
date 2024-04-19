import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
// import { Button } from "@/components/ui/button";
import { UserFilters } from "@/constants/filters";
// import Link from "next/link";
import Filter from "@/components/shared/filter/Filter";
import React from "react";
import { getAllUsers } from "@/lib/actions/user.action";
import Link from "next/link";
import UserCard from "@/components/cards/UserCard";

const Community = async ({ searchParams }: any) => {
  const result: any = await getAllUsers({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for amazing minds"
          otherClasses="flex-1"
        />
        <Filter
          filters={UserFilters}
          otherClasses="min-h-[56] sm:min-w-[170px]"
        />
      </div>
      <section className="mt-12 flex flex-wrap gap-4">
        {result.users.length > 0 ? (
          result.users.map((user: any) => (
            <UserCard key={user._id} user={user} />
          ))
        ) : (
          <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
            <div className="">
              <p>No users yet</p>
              <Link href="/sign-up" className="mt-1 font-bold text-accent-blue">
                Join to be the first
              </Link>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Community;
