"use client";
import { addSupportQuery } from "@/actions/SupportAndFeedback/addSupportQuery";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import TextAreaBox from "@/components/FormElements/TextAreaBox";
import IconRenderer from "@/components/IconRenderer/page";
import HotToast from "@/components/utils/HotToast";
import Loader from "@/components/utils/Loader";
import { useAppSelector } from "@/lib/utils/reduxHooks";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";

export default function GetSupport() {
  const [loading, setLoading] = useState<boolean>(false);
  const [supportReason, setSupportReason] = useState<string>("");
  const supportDescriptionRef = useRef<HTMLTextAreaElement>(null);
  const userId = useAppSelector((state) => state.userInfo.userInfo?.id);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (!supportReason || !supportDescriptionRef.current?.value) {
        toast.error("Please select a reason and provide a description.");
        return;
      }

      const addedSupportQuery = await addSupportQuery({
        reason: supportReason,
        description: supportDescriptionRef.current.value,
        userId: Number(userId),
      });

      if (addedSupportQuery?.success) {
        toast.success(
          addedSupportQuery.message || "Your query has been submitted.",
          { duration: 5000 }
        );
        setSupportReason("");
        if (supportDescriptionRef.current)
          supportDescriptionRef.current.value = "";
      } else {
        toast.error(
          addedSupportQuery?.error || "Something went wrong. Please try again."
        );
      }
    } catch (error: any) {
      toast.error(error?.message || "Server error. Please try later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full bg-white p-5 pt-4 pb-16 flex flex-col gap-10 overflow-y-auto font-nunito">
      <h1 className="ml-5 lg:ml-0 text-xl font-poppins font-medium">
        Get Support
      </h1>
      <div className="flex items-center gap-24 mx-auto">
        <span className="flex gap-2 items-center">
          <span className="border border-black/20 rounded-sm p-2">
            <IconRenderer name="ContactMail" />
          </span>
          <p>journa028@gmail.com</p>
        </span>
        <span className="flex gap-2 items-center">
          <span className="border border-black/20 rounded-sm p-2">
            <IconRenderer name="Instagram" />
          </span>
          <p>instagram.com/ideaplots/</p>
        </span>
        <span className="flex gap-2 items-center">
          <span className="border border-black/20 rounded-sm p-2">
            <IconRenderer name="Linkedin" />
          </span>
          <p>journa028@gmail.com</p>
        </span>
      </div>
      <div className="mx-auto w-[50%] text-center flex flex-col gap-6">
        <p className="font-poppins font-light">
          Have a question or need help? Fill out the form below and our team
          will get back to you shortly.
        </p>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
          <select
            name="supportReason"
            className="border border-black/25 rounded-md px-3 py-2 bg-white cursor-pointer flex justify-between items-center font-nunito text-base"
            required
            value={supportReason}
            onChange={(event) => setSupportReason(event.target.value)}
          >
            <option value="" className="hover:bg-yellow_400">
              Select a reason
            </option>
            <option value="account">Account Issues</option>
            <option value="billing">Billing & Payments</option>
            <option value="technical">Technical Support</option>
            <option value="general">General Inquiry</option>
            <option value="feedback">Feedback</option>
            <option value="other">Other</option>
          </select>
          <TextAreaBox
            name="support"
            placeholder="How can we help you...."
            minRows={10}
            maxRows={10}
            required
            className="text-base"
            ref={supportDescriptionRef}
          />
          <PrimaryButton className="w-full" type="submit">
            {loading ? <Loader className="mx-auto" /> : "Submit"}
          </PrimaryButton>
        </form>
      </div>
      <HotToast />
    </div>
  );
}
