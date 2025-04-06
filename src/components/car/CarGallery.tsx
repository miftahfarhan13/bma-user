import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";

export function CarGallery({
  images,
}: {
  images: Array<{ id: number; img_path: string }>;
}) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(images?.length);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(images?.length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api, images]);

  return (
    <div className="flex flex-col gap-2.5">
      <div className="mx-auto w-full relative">
        <Carousel
          setApi={setApi}
          className="w-full relative"
          opts={{ loop: true }}
        >
          <CarouselContent>
            {images?.map((image) => (
              <CarouselItem key={image.id}>
                <div className="relative">
                  <div className="relative h-[300px] md:h-[500px]">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${image?.img_path}`}
                      alt={`Image ${image.id}`}
                      fill
                      className="h-full w-full object-cover rounded-xl"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 z-10 -translate-y-1/2 bg-white/80 rounded-full hover:bg-white shadow-md cursor-pointer" />
          <CarouselNext className="absolute right-4 top-1/2 z-10 -translate-y-1/2 bg-white/80 rounded-full hover:bg-white shadow-md cursor-pointer" />
        </Carousel>
        <div className="absolute z-10 bottom-5 right-5 px-5 py-1 rounded-md bg-gray-50 text-gray-700 opacity-50 text-sm">
          {current}/{count}
        </div>
      </div>
      <div className="flex flex-row gap-2.5 overflow-auto">
        {images?.map((img, index) => (
          <div
            key={`images-${img.id}`}
            className="cursor-pointer"
            onClick={() => api?.scrollTo(index)}
          >
            <div className="relative h-[80px] md:h-[120px] w-[80px] md:w-[120px] rounded-xl">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${img?.img_path}`}
                alt={`Image ${img.id}`}
                fill
                className="h-full w-full object-cover rounded-xl"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
