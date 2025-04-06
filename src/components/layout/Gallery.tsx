import React from "react";
import LightGallery from "lightgallery/react";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

// If you want you can use SCSS instead of css
import "lightgallery/scss/lightgallery.scss";
import "lightgallery/scss/lg-zoom.scss";

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import Image from "next/image";

export default function Gallery({
  images,
}: {
  images: Array<{ url: string | undefined; label: string }>;
}) {
  const onInit = () => {
    console.log("lightGallery has been initialized");
  };
  return (
    <>
      <div className="App">
        <LightGallery
          elementClassNames="grid grid-cols-2 md:grid-cols-5 gap-5"
          onInit={onInit}
          speed={500}
          plugins={[lgThumbnail, lgZoom]}
        >
          {images?.map((image, index) => {
            const url = `${process.env.NEXT_PUBLIC_API_URL}/storage/${image?.url}`;
            return (
              <a key={index} data-src={url} href={url}>
                <div className="flex flex-col gap-2.5">
                  <p className="self-center font-bold">{image?.label}</p>
                  <div className="relative h-[200px] rounded-xl overflow-hidden">
                    <Image
                      alt={image?.label}
                      src={url}
                      fill
                      objectFit="cover"
                    />
                  </div>
                </div>
              </a>
            );
          })}
        </LightGallery>
      </div>
    </>
  );
}
