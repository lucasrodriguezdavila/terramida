"use client";
import { useEventComments, usePostEventComment } from "@/utils/events/client";
import { useParams } from "next/navigation";
import React, { useRef, useCallback } from "react";

import dayjs from "dayjs";

interface Props {}

const Activity: React.FC<Props> = ({}) => {
  const params = useParams<{ id: string }>();
  const commentRef = useRef<HTMLTextAreaElement>(null);

  const { data: comments } = useEventComments(params.id);

  const { mutate: postEventComment, isLoading } = usePostEventComment();

  const handleOnClickComment = useCallback(() => {
    // put commentRef in focus and scroll to the bottom of the page
    commentRef.current?.focus();
    window.scrollTo(0, document.body.scrollHeight);
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
        <h2 className="text-xl font-bold text-gray-500 mb-4">Actividad</h2>

        {comments?.map((comment) => {
          return (
            <div
              key={comment.id}
              className=" rounded-lg bg-gray-100 py-2 px-3 text-sm border border-gray-200 shadow-sm"
            >
              <div className="flex justify-between">
                <span className="text-gray-600 font-semibold">
                  {comment.user}
                </span>
                <p>
                  <span className="text-gray-600">
                    {dayjs(comment.createdAt).format("DD-MM-YYYY")}
                  </span>
                </p>
              </div>
              <p className="mt-2">{comment.comment}</p>
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
        <p className="text-xl font-bold text-gray-500 ">Comentar</p>
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
            {isLoading ? "Enviando..." : "Enviar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Activity;
