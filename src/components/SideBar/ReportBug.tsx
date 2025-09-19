"use client";
import React, { useRef, useState } from "react";
import InputBox from "../FormElements/InputBox";
import SecondaryButton from "../Buttons/SecondaryButton";
import PrimaryButton from "../Buttons/PrimaryButton";
import Loader from "../utils/Loader";
import HotToast from "../utils/HotToast";
import TextAreaBox from "../FormElements/TextAreaBox";
import toast from "react-hot-toast";
import { reportNewBug } from "@/actions/SupportAndFeedback/reportNewBug";
import { useAppSelector } from "@/lib/utils/reduxHooks";

const ReportBug = ({
  setOpenReportBugDialogBox,
}: {
  setOpenReportBugDialogBox: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const bugTitleRef = useRef<HTMLInputElement>(null);
  const bugDescriptionRef = useRef<HTMLTextAreaElement>(null);
  const userId = useAppSelector((state) => state.userInfo.userInfo?.id);

  const handleReportBug = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (!bugTitleRef.current?.value || !bugDescriptionRef.current?.value) {
        toast.error("Title and description cannot be empty.");
        return;
      }

      const reportedBug = await reportNewBug({
        userId: Number(userId),
        title: bugTitleRef.current?.value,
        description: bugDescriptionRef.current?.value,
      });

      if (reportedBug.success) {
        toast.success(reportedBug.message!, { duration: 5000 });
        setOpenReportBugDialogBox(false);
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
    <>
      <form
        className="flex flex-col gap-6 w-[85vw] sm:w-[60vw] lg:w-[40vw]"
        onSubmit={handleReportBug}
      >
        <span className="flex flex-col gap-1">
          <h1 className="text-lg font-poppins font-medium">Report Bug</h1>
          <p className="font-nunito">
            Please explain the bug in brief and also provide steps to re-create
            the bug if possible. Thank you for your efforts.
          </p>
        </span>

        <InputBox
          name="bugTitle"
          label="Title"
          placeholder="Ex. Unable to add Bucketlist"
          ref={bugTitleRef}
          required={true}
        />
        <TextAreaBox
          name="bugDescription"
          placeholder="Explain the bug in detail and give steps to re-create the bug"
          minRows={8}
          maxRows={8}
          required={true}
          ref={bugDescriptionRef}
        />
        <span className="flex gap-3 w-full mt-2">
          <SecondaryButton
            className="w-full"
            onClick={() => setOpenReportBugDialogBox(false)}
          >
            Cancel
          </SecondaryButton>
          <PrimaryButton className="w-full" type="submit">
            {loading ? <Loader className="mx-auto" /> : "Submit"}
          </PrimaryButton>
        </span>
      </form>
      <HotToast />
    </>
  );
};

export default ReportBug;
