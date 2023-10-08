import React from "react";
import { IconFacebook } from "../Icons/IconFacebook";
import { IconIntagram } from "../Icons/IconInstagram";
import { IconYoutube } from "../Icons/IconYoutube";
import { IconLinkedin } from "../Icons/IconLinkedin";
import { IconTwitter } from "../Icons/IconTwitter";

export default function SocialNetworks({
  listSocialNetworks,
}: {
  listSocialNetworks: { type: string; url: string }[];
}) {
  const selectedIcon = (type: string) => {
    if (type === "facebook") {
      return <IconFacebook />;
    }
    if (type === "instagram") {
      return <IconIntagram />;
    }
    if (type === "youtube") {
      return <IconYoutube />;
    }
    if (type === "linkedin") {
      return <IconLinkedin />;
    }
    if (type === "twitter") {
      return <IconTwitter />;
    }
  };

  return (
    <>
      <h3 className="font-semibold text-center mt-3 -mb-2">Encuéntrame en</h3>
      <div className="flex justify-center items-center gap-6 my-6">
        {listSocialNetworks?.map((item: { type: string; url: string }) => {
          return (
            <a
              key={item.type}
              className="text-gray-700 hover:text-orange-600"
              aria-label="Visit TrendyMinds YouTube"
              href={item.url}
              target="_blank"
            >
              {selectedIcon(item.type)}
            </a>
          );
        })}
      </div>
    </>
  );
}
