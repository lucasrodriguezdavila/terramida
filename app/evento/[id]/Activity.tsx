"use client";
import { useEventComments, usePostEventComment } from "@/utils/events/client";
import { useParams } from "next/navigation";
import React, { useRef, useCallback } from "react";

import dayjs from "dayjs";
import Link from "next/link";

interface Props {}

const Activity: React.FC<Props> = ({}) => {
  const params = useParams<{ id: string }>();
  const commentRef = useRef<HTMLTextAreaElement>(null);

  const { data: comments } = useEventComments(params.id);

  const { mutate: postEventComment, isLoading } = usePostEventComment();

  const handleOnClickComment = useCallback(() => {
    // put commentRef in focus and scroll to the bottom of the page
    commentRef.current?.focus();
    window?.scrollTo(0, document.body.scrollHeight);
  }, []);

  const handleOnSubmitComment = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const comment = commentRef.current?.value;
      if (!comment) return;
      await postEventComment({ comment, eventId: params.id });
      commentRef.current.value = "";
    },
    [params.id, postEventComment]
  );

  return (
    <div className="relative col-span-12 md:col-span-8 ">
      <div className="bg-white shadow rounded-lg p-6 gap-4 flex flex-col">
        <h2 className="text-xl font-bold text-gray-500 mb-4">Activity</h2>

        {comments?.map((comment) => {
          return (
            <div
              key={comment.id}
              className={`rounded-lg py-2 px-3 text-sm border flex flex-col shadow-sm  gap-2 ${
                comment?.user?.organization
                  ? "text-green-500 bg-green-500/30 border-green-500"
                  : "bg-gray-100 border-gray-200 text-gray-600"
              }`}
            >
              <div className="flex items-start gap-2">
                <img
                  src={comment.user.imageProfile}
                  className="w-5 h-5 rounded-full"
                />
                <div className="flex flex-col gap-1 mr-auto">
                  <span className=" font-semibold">
                    {comment.user.username}
                  </span>
                  <p className="">{comment.comment}</p>
                </div>
                <span className="">
                  {dayjs(comment.createdAt).format("DD-MM-YYYY")}
                </span>
              </div>
              {comment?.user?.organization && (
                <>
                  <hr className="border-green-500" />

                  <div className="flex items-center gap-1">
                    It`s a member of{" "}
                    <Link
                      href={"/organizacion/" + comment.user.organization.id}
                      className="cursor-pointer underline"
                    >
                      {comment.user.organization.name}
                    </Link>
                    <span data-tooltip="Esta organizacion es goburnamental">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5 ml-1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9.674 2.075a.75.75 0 01.652 0l7.25 3.5A.75.75 0 0117 6.957V16.5h.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H3V6.957a.75.75 0 01-.576-1.382l7.25-3.5zM11 6a1 1 0 11-2 0 1 1 0 012 0zM7.5 9.75a.75.75 0 00-1.5 0v5.5a.75.75 0 001.5 0v-5.5zm3.25 0a.75.75 0 00-1.5 0v5.5a.75.75 0 001.5 0v-5.5zm3.25 0a.75.75 0 00-1.5 0v5.5a.75.75 0 001.5 0v-5.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </div>
                </>
              )}
            </div>
          );
        })}
        {/* <div className=" rounded-lg bg-gray-100 py-2 px-3 text-sm border border-gray-200 shadow-sm">
          <div className="flex justify-between">
            <span className="text-gray-600 font-semibold">Comentario</span>
            <p>
              <span className="text-gray-600 mr-2">Campana</span>
              <span className="text-gray-600">23-07-2023</span>
            </p>
          </div>
          <p className="mt-2">
            El incendio se origino por una quema de basura en el vertedero de la
            comunidad, ya esta controlado por los bomberos del cuartel n°77.
          </p>
        </div>

        <div className=" rounded-lg bg-green-500/30 py-2 px-3 text-md border border-green-500 shadow-sm">
          <div className="flex justify-between">
            <span className="text-green-500 font-bold">Comentario</span>
            <p>
              <span className="text-green-500 mr-2">Campana</span>
              <span className="text-green-500">23-07-2023</span>
            </p>
          </div>
          <p className="mt-2 text-green-500">
            El incendio se origino por una quema de basura en el vertedero de la
            comunidad, ya esta controlado por los bomberos del cuartel n°77.
          </p>
        </div>
        <div className=" rounded-lg bg-green-500/30 py-2 px-3 text-md border border-green-500 shadow-sm">
          <div className="flex justify-between">
            <span className="text-green-500 font-bold">Comentario</span>
            <p>
              <span className="text-green-500 mr-2">Campana</span>
              <span className="text-green-500">23-07-2023</span>
            </p>
          </div>
          <p className="mt-2 text-green-500">
            El incendio se origino por una quema de basura en el vertedero de la
            comunidad, ya esta controlado por los bomberos del cuartel n°77.
          </p>
        </div>
        <div className=" rounded-lg bg-green-500/30 py-2 px-3 text-md border border-green-500 shadow-sm">
          <div className="flex justify-between">
            <span className="text-green-500 font-bold">Comentario</span>
            <p>
              <span className="text-green-500 mr-2">Campana</span>
              <span className="text-green-500">23-07-2023</span>
            </p>
          </div>
          <p className="mt-2 text-green-500">
            El incendio se origino por una quema de basura en el vertedero de la
            comunidad, ya esta controlado por los bomberos del cuartel n°77.
          </p>
        </div>
        <div className=" rounded-lg bg-green-500/30 py-2 px-3 text-md border border-green-500 shadow-sm">
          <div className="flex justify-between">
            <span className="text-green-500 font-bold">Comentario</span>
            <p>
              <span className="text-green-500 mr-2">Campana</span>
              <span className="text-green-500">23-07-2023</span>
            </p>
          </div>
          <p className="mt-2 text-green-500">
            El incendio se origino por una quema de basura en el vertedero de la
            comunidad, ya esta controlado por los bomberos del cuartel n°77.
          </p>
        </div>
        <div className=" rounded-lg bg-green-500/30 py-2 px-3 text-md border border-green-500 shadow-sm">
          <div className="flex justify-between">
            <span className="text-green-500 font-bold">Comentario</span>
            <p>
              <span className="text-green-500 mr-2">Campana</span>
              <span className="text-green-500">23-07-2023</span>
            </p>
          </div>
          <p className="mt-2 text-green-500">
            El incendio se origino por una quema de basura en el vertedero de la
            comunidad, ya esta controlado por los bomberos del cuartel n°77.
          </p>
        </div>
        <div className=" rounded-lg bg-green-500/30 py-2 px-3 text-md border border-green-500 shadow-sm">
          <div className="flex justify-between">
            <span className="text-green-500 font-bold">Comentario</span>
            <p>
              <span className="text-green-500 mr-2">Campana</span>
              <span className="text-green-500">23-07-2023</span>
            </p>
          </div>
          <p className="mt-2 text-green-500">
            El incendio se origino por una quema de basura en el vertedero de la
            comunidad, ya esta controlado por los bomberos del cuartel n°77.
          </p>
        </div> */}
      </div>
      <form
        className="sticky  -bottom-[8rem]  cursor-pointer  mt-6 bg-white shadow rounded-lg p-6 py-4 gap-4 flex flex-col "
        onClick={handleOnClickComment}
        onSubmit={handleOnSubmitComment}
      >
        <p className="text-xl font-bold text-gray-500 ">Comment</p>
        <textarea
          ref={commentRef}
          id="comment"
          className=" w-full h-14 rounded-lg text-gray-500 bg-gray-100 py-2 px-3 text-sm border border-gray-200 shadow-sm"
        />
        <div className="flex justify-end">
          <button
            className={` text-white rounded-md py-2 px-4 ${
              isLoading ? "bg-gray-400" : "bg-blue-400"
            }`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Activity;
