"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import Interaction from "@/database/interaction.model";
import { ViewQuestionParams } from "./shared.types";

export async function viewQuestion(params: ViewQuestionParams) {
  try {
    console.log("viewQuestion called"); // Add this line
    connectToDatabase();

    const { questionId, userId } = params;

    // update view count
    await Question.findByIdAndUpdate(questionId, { $inc: { views: 0.5 } }); //using 0.5 as the component is rendering 2 times

    if (userId) {
      const existingInteraction = await Interaction.findOne({
        user: userId,
        action: "view",
        question: questionId,
      });

      if (existingInteraction)
        return console.log("User has already viewed this question.");

      // create interaction
      await Interaction.create({
        user: userId,
        action: "view",
        question: questionId,
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}