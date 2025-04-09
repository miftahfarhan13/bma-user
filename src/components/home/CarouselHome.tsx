import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

export default function CarouselHome() {
  const banners = [
    "/images/banner/banner-1.png",
    "/images/banner/banner-2.png",
    "/images/banner/banner-3.png",
    "/images/banner/banner-4.png",
    "/images/banner/banner-5.png",
  ];

  return (
    <>
      <div className="p-4 md:p-5">
        <div className="max-w-[1440px] mx-auto">
          <Carousel
            className="w-full"
            opts={{ loop: true }}
            plugins={[
              Autoplay({
                delay: 5000,
              }),
            ]}
          >
            <CarouselContent>
              {banners.map((banner, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <div className="relative w-full aspect-[6/1]">
                      <Image
                        src={banner}
                        alt="Background"
                        fill
                        className="object-contain rounded-sm md:rounded-xl"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious />
            </div>
            <div className="hidden md:block">
              <CarouselNext />
            </div>
          </Carousel>
        </div>
      </div>
    </>
  );
}
