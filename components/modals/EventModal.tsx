"use client";
import { useModal } from "@/stores/modals";
import React, { Fragment, useCallback, useEffect, useMemo } from "react";
import ModalTemplate from "./ModalTemplate";
import { useAddressFromLatLng } from "@/utils/geocode";
import { New, useNews } from "@/utils/news";
import Link from "next/link";
import { Disclosure } from "@headlessui/react";

import dayjs from "dayjs";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import {
  useGetEventsInArea,
  usePostEvent,
  useThermalAnomalies,
} from "@/utils/terramida";
import { useAuthUser, useSignInWithGoogle } from "@/utils/auth";
import { useRouter } from "next/navigation";

function _getDistanceFromLatLonInKm(
  lat1: any,
  lon1: any,
  lat2: any,
  lon2: any
) {
  var R = 6371; // Radius of the earth in kilometers
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in KM
  return d;
}

function deg2rad(deg: any) {
  return deg * (Math.PI / 180);
}

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
      return dayjs().diff(_date, "month") + " month";
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
  const router = useRouter();

  const data = useModal((state) => state.eventModal.data);
  const setData = useModal((state) => state.eventModal.setData!);

  const { data: addresGeocoded } = useAddressFromLatLng(data?.lat, data?.lng);
  const { data: authUser, isFetching: isFetchingAuthUser } = useAuthUser();

  const { mutate: login } = useSignInWithGoogle();
  const {
    mutate: postEvent,
    isSuccess,
    data: postedEventData,
    isLoading: isPostingEventLoading,
    reset: resetPostEvent,
  } = usePostEvent();

  const { data: news } = useNews(addresGeocoded?.locality);

  const {
    mutate: postThermalEvent,
    data: thermalAnomalies,
    isLoading: thermalAnomaliesLoading,
  } = useThermalAnomalies();

  const {
    mutate: getEventsInArea,
    data: eventsInArea,
    isLoading: eventsInAreaLoading,
  } = useGetEventsInArea();

  useEffect(() => {
    if (data) {
      getEventsInArea({
        lat: data.lat,
        lng: data.lng,
        radius: 1,
      });
      postThermalEvent({
        lat: data.lat,
        lng: data.lng,
        radius: 1,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleCloseModal = useCallback(() => {
    setData(null);
  }, [setData]);

  const handlePostEvent = React.useCallback(() => {
    if (!data) return;
    postEvent({
      lat: data?.lat,
      lng: data?.lng,
      radius: 2,
    });
  }, [postEvent, data]);

  const handleNavigateToEvent = React.useCallback(() => {
    if (!postedEventData?.id) return;

    router.push(`/evento/${postedEventData?.id}`);
    handleCloseModal();
    resetPostEvent();
  }, [postedEventData?.id, router, handleCloseModal, resetPostEvent]);

  return (
    <ModalTemplate closeModal={handleCloseModal} isOpen={!!data}>
      <h1 className="font-extrabold text-2xl text-gray-600 self-start items-center gap-1">
        {addresGeocoded?.address}
        <p className="text-xs text-gray-400 font-normal mt-1">
          {data?.lat} - {data?.lng}
        </p>
      </h1>
      {isSuccess ? (
        <>
          <p className="text-center text-2xl text-gray-600 my-6">
            Event reported successfully!
          </p>
          <div className="w-full gap-4 flex">
            {postedEventData?.id ? (
              <button
                className="bg-blue-400 w-full text-white rounded-md py-2 px-4 mt-2"
                onClick={handleNavigateToEvent}
              >
                View event
              </button>
            ) : (
              <button
                className="bg-blue-400 w-full text-white rounded-md py-2 px-4 mt-2"
                onClick={handleNavigateToEvent}
              >
                Close
              </button>
            )}
          </div>
        </>
      ) : (
        <>
          {news?.length && (
            <>
              <hr className="border-gray-300 w-full -mb-2" />

              <div className="flex flex-col justify-start w-full">
                <Disclosure>
                  {({ open }) => {
                    return (
                      <>
                        <Disclosure.Button className="py-2 text-left w-full flex gap-2 items-center text-gray-600">
                          Related news
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
                              <NewItem
                                key={article.title._text}
                                newItem={article}
                              />
                            ))}
                          </ul>
                        </Disclosure.Panel>
                      </>
                    );
                  }}
                </Disclosure>
              </div>
            </>
          )}
          <hr className="border-gray-300 w-full -mt-2" />
          {!thermalAnomaliesLoading && !eventsInAreaLoading ? (
            <>
              {!thermalAnomalies?.length && !eventsInArea?.length ? (
                <p className="text-red-400 text-center">
                  We didn&apos;t find any thermic anomalies
                </p>
              ) : null}
              {thermalAnomalies?.length ? (
                <p className="text-center">
                  There is at least {thermalAnomalies?.length} thermic anomalies
                  in the area
                </p>
              ) : null}

              {eventsInArea?.length ? (
                <div className="w-full gap-1 flex flex-col">
                  {eventsInArea?.map((event: any) => {
                    return (
                      <Link
                        href={`/evento/${event.id}`}
                        onClick={handleCloseModal}
                        key={event.id}
                        className="bg-blue-400 w-full text-white rounded-md py-2 px-4 mt-2"
                      >
                        View event at{" "}
                        {_getDistanceFromLatLonInKm(
                          data?.lat,
                          data?.lng,
                          event.initialLatitude,
                          event.initialLongitude
                        )?.toFixed(3)}{" "}
                        kms
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="w-full gap-4 flex">
                  {authUser ? (
                    <>
                      <button
                        className="bg-red-400 w-full text-white rounded-md py-2 px-4 mt-2"
                        onClick={() => {
                          setData(null);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-blue-400 w-full text-white rounded-md py-2 px-4 mt-2"
                        onClick={handlePostEvent}
                        disabled={isPostingEventLoading}
                      >
                        {isPostingEventLoading ? "Reporting..." : "Report"}
                      </button>
                    </>
                  ) : (
                    <button
                      className="bg-blue-400 w-full text-white rounded-md py-2 px-4 mt-2"
                      onClick={() => {
                        login();
                      }}
                    >
                      Login to report
                    </button>
                  )}
                </div>
              )}
            </>
          ) : null}
        </>
      )}
    </ModalTemplate>
  );
};

export default EventModal;
