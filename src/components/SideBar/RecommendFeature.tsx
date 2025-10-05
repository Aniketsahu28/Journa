"use client";
import React, { useRef, useState } from "react";
import InputBox from "../FormElements/InputBox";
import SecondaryButton from "../Buttons/SecondaryButton";
import PrimaryButton from "../Buttons/PrimaryButton";
import Loader from "../utils/Loader";
import TextAreaBox from "../FormElements/TextAreaBox";
import toast from "react-hot-toast";
import { useAppSelector } from "@/lib/utils/reduxHooks";
import { recommendNewFeature } from "@/actions/SupportAndFeedback/recommendNewFeature";

const RecommendFeature = ({
  setOpenRecommendFeatureDialogBox,
}: {
  setOpenRecommendFeatureDialogBox: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const featureTitleRef = useRef<HTMLInputElement>(null);
  const featureDescriptionRef = useRef<HTMLTextAreaElement>(null);
  const userId = useAppSelector((state) => state.userInfo.userInfo?.id);

  const handleRecommendFeature = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (
        !featureTitleRef.current?.value ||
        !featureDescriptionRef.current?.value
      ) {
        toast.error("Title and description cannot be empty.");
        return;
      }

      const recommendedFeature = await recommendNewFeature({
        userId: Number(userId),
        title: featureTitleRef.current?.value,
        description: featureDescriptionRef.current?.value,
      });

      if (recommendedFeature.success) {
        toast.success(recommendedFeature.message!, { duration: 5000 });
        setOpenRecommendFeatureDialogBox(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong, please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-6 w-[85vw] sm:w-[60vw] lg:w-[40vw]"
      onSubmit={handleRecommendFeature}
    >
      <span className="flex flex-col gap-1">
        <h1 className="text-lg font-poppins font-medium">Recommend Feature</h1>
        <p className="font-nunito">
          Please explain the feature in brief and also if possible, provide
          examples where you have seen.
        </p>
      </span>

      <InputBox
        name="featureTitle"
        label="Title"
        placeholder="Ex. Add Dark Mode"
        ref={featureTitleRef}
        required={true}
      />
      <TextAreaBox
        name="featureDescription"
        placeholder="Explain the feature in detail"
        minRows={8}
        maxRows={8}
        required={true}
        ref={featureDescriptionRef}
      />
      <span className="flex gap-3 w-full mt-2">
        <SecondaryButton
          className="w-full"
          onClick={() => setOpenRecommendFeatureDialogBox(false)}
        >
          Cancel
        </SecondaryButton>
        <PrimaryButton className="w-full" type="submit">
          {loading ? <Loader className="mx-auto" /> : "Submit"}
        </PrimaryButton>
      </span>
    </form>
  );
};

export default RecommendFeature;
