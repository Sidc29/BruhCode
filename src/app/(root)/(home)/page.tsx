import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import Filter from "@/components/shared/filter/Filter";
import Link from "next/link";
import { HomePageFilters } from "@/constants/filters";
import HomeFilters from "@/components/home/HomeFilters";
import NoResults from "@/components/shared/no-results/NoResults";
import QuestionCard from "@/components/cards/QuestionCard";
import { getQuestions } from "@/lib/actions/question.action";
export default async function Home({ searchParams }: any) {
  const result = await getQuestions({
    searchQuery: searchParams.q,
  });

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="right"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? (
          result.questions.map((question) => {
            return (
              <QuestionCard
                key={question._id}
                _id={question._id}
                title={question.title}
                tags={question.tags}
                author={question.author}
                upvotes={question.upvotes}
                views={question.views}
                answers={question.answers}
                createdAt={question.createdAt}
              />
            );
          })
        ) : (
          <NoResults
            title="There's no question to show"
            description=" Be the first to break the silence! 🚀 Ask a Question and kickstart the
          discussion. Our query could be the next big thing others learn from.Get
          involved! 💡"
            link="/ask-question"
            linkTitle="Ask Question"
          />
        )}
      </div>
    </>
  );
}
