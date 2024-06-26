import Answer from "@/components/forms/Answer";
import AllAnswers from "@/components/shared/all-answers/AllAnswers";
import Metric from "@/components/shared/metric/Metric";
import ParseHTML from "@/components/shared/parse-html/ParseHTML";
import RenderTag from "@/components/shared/right-sidebar/RenderTag";
import Votes from "@/components/shared/votes/Votes";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { formatNumber, getTimeStamp } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const QuestionDetails = async ({ params, searchParams }: any) => {
  const result = await getQuestionById({ questionId: params.id });

  const { userId: clerkId } = auth();

  let mongoUser;

  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId });
  }

  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`/profile/${result.author.clerkId}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={result.author.picture}
              alt="author profile pic"
              className="rounded-full"
              width={22}
              height={22}
            />
            <p className="paragraph-semibold- text-dark_300_light700">
              {result.author.name}
            </p>
          </Link>
          <div className="flex justify-end">
            <Votes
              type="Question"
              itemId={JSON.stringify(result._id)}
              userId={JSON.stringify(mongoUser._id)}
              upvotes={result.upvotes.length}
              hasUpvoted={result.upvotes.includes(mongoUser._id)}
              downvotes={result.downvotes.length}
              hasDownvoted={result.downvotes.includes(mongoUser._id)}
              hasSaved={mongoUser?.saved.includes(result._id)}
            />
          </div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5">
          {result.title}
        </h2>
      </div>
      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgURL="/assets/icons/clock.svg"
          alt="clock icon"
          value={`asked ${getTimeStamp(result.createdAt)}`}
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgURL="/assets/icons/message.svg"
          alt="message"
          value={formatNumber(result.answers.length)}
          title="Answers"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgURL="/assets/icons/eye.svg"
          alt="eye"
          value={formatNumber(result.views)}
          title="Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>
      <ParseHTML data={result.content} />

      <div>
        {result.tags.map((tag: any) => (
          <RenderTag
            key={tag._id}
            _id={tag._id}
            name={tag.name}
            showCount={false}
          />
        ))}
      </div>

      <AllAnswers
        questionId={result._id}
        userId={mongoUser._id}
        totalAnswers={result.answers.length}
        page={searchParams?.page}
        filter={searchParams?.filter}
      />

      <Answer
        question={result.content}
        questionId={JSON.stringify(result._id)}
        authorId={JSON.stringify(mongoUser._id)}
      />
    </>
  );
};

export default QuestionDetails;
