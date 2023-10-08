"use client";
import { useModal } from "@/stores/modals";
import React, { Fragment, useCallback, useMemo } from "react";
import ModalTemplate from "./ModalTemplate";
import { useAddressFromLatLng, useReverseGeocode } from "@/utils/geocode";
import { New, useNews } from "@/utils/news";
import Link from "next/link";
import { Disclosure } from "@headlessui/react";

import dayjs from "dayjs";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

interface NewItemProps {
  newItem: New;
}

const NewItem: React.FC<NewItemProps> = ({ newItem }) => {
  const date = useMemo(() => {
    const _date = dayjs(new Date(newItem.pubDate._text));

    if (dayjs().diff(_date, "hour") < 1) {
      return dayjs().diff(_date, "m") + "m";
    }
    if (dayjs().diff(_date, "day") < 1) {
      return dayjs().diff(_date, "h") + "h";
    }
    if (dayjs().diff(_date, "month") < 1) {
      return dayjs().diff(_date, "day") + "d";
    }
    if (dayjs().diff(_date, "year") < 1) {
      return dayjs().diff(_date, "month") + " meses";
    }
    return _date.format("dddd DD, MMM");
  }, [newItem.pubDate._text]);

  return (
    <Fragment>
      <Link href={newItem.link._text} target="_blank">
        <li className="flex flex-col gap-3 my-1 w-full text-sm">
          <div className="flex items-start justify-between gap-3 ">
            <div className="flex flex-col max-w-[80%] gap-1">
              <p className="font-bold text-gray-600 truncate ">
                {newItem.title._text}
              </p>
              <p className="text-gray-400 truncate">{newItem.source._text}</p>
            </div>
            <p>{date}</p>
          </div>
        </li>
      </Link>
      <hr />
    </Fragment>
  );
};

const EventModal = () => {
  const data = useModal((state) => state.eventModal.data);
  const setData = useModal((state) => state.eventModal.setData!);

  const { data: addresGeocoded } = useAddressFromLatLng(data?.lat, data?.lng);

  const { data: news } = useNews(addresGeocoded);

  const handleCloseModal = useCallback(() => {
    setData(null);
  }, [setData]);

  return (
    <ModalTemplate closeModal={handleCloseModal} isOpen={!!data}>
      <h1 className="font-extrabold text-2xl text-gray-500 self-start items-center gap-1">
        {addresGeocoded}
        <p className="text-xs text-gray-400 font-normal">
          {data?.lat} - {data?.lng}
        </p>
      </h1>
      <hr className="border-gray-300 w-full -mb-2" />

      <div className="flex flex-col justify-start w-full">
        <Disclosure>
          {({ open }) => {
            return (
              <>
                <Disclosure.Button className="py-2 text-left w-full flex gap-2 items-center text-gray-600">
                  Noticias relacionadas
                  <ChevronRightIcon
                    className={
                      open
                        ? "-rotate-90 transform w-5 h-5"
                        : "rotate-90 transform w-5 h-5"
                    }
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="text-gray-500 w-full">
                  <ul className="max-h-52 overflow-y-auto w-full">
                    {news?.map((article) => (
                      <NewItem key={article.title._text} newItem={article} />
                    ))}
                  </ul>
                </Disclosure.Panel>
              </>
            );
          }}
        </Disclosure>
      </div>
      <hr className="border-gray-300 w-full -mt-2" />
    </ModalTemplate>
  );
};

export default EventModal;
