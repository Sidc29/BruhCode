"usec client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import RenderTag from "./RenderTag";

const RightSidebar = () => {
  const hotQuestions = [
    {
      _id: "1",
      title:
        "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
    },
    {
      _id: "2",
      title: "Async/Await Function Not Handling Errors Properly",
    },
    {
      _id: "3",
      title: "Next JS router",
    },
    {
      _id: "4",
      title: "How can I get (query string) parameters from the URL in Next.js?",
    },
    {
      _id: "5",
      title:
        "What is the best modern tech stack we can use to create a Stackoverflow clone?",
    },
  ];

  const popularTags = [
    {
      _id: "1",
      name: "Javascript",
      totalQuestions: 5,
    },
    {
      _id: "2",
      name: "Python",
      totalQuestions: 5,
    },
    {
      _id: "3",
      name: "NextJS",
      totalQuestions: 5,
    },
    {
      _id: "4",
      name: "PHP",
      totalQuestions: 5,
    },
    {
      _id: "5",
      name: "Node",
      totalQuestions: 5,
    },
  ];

  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden lg:w-[350px]">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestions.map((question) => {
            return (
              <Link
                key={question._id}
                href={`/questions/${question._id}`}
                className="flex cursor-pointer items-center justify-between gap-7"
              >
                <p className="body-medium text-dark500_light700">
                  {question.title}
                </p>
                <Image
                  src="assets/icons/chevron-right.svg"
                  className="invert-colors"
                  height={20}
                  width={20}
                  alt="chevron-right"
                />
              </Link>
            );
          })}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map((tag) => {
            return (
              <RenderTag
                key={tag._id}
                _id={tag._id}
                name={tag.name}
                totalQuestions={tag.totalQuestions}
                showCount
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
