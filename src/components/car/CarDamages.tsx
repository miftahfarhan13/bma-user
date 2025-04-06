"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Icon } from "@iconify/react";
import { ICarResponse } from "@/types/car";
import Gallery from "../layout/Gallery";

export default function CarDamages({
  data,
}: {
  data: ICarResponse | undefined;
}) {
  const { car_defects_interior, car_defects_eksterior, car_defects_others } =
    data || {};

  const formattedDefectsInterior = car_defects_interior
    ?.filter((item) => item.defect_pict)
    ?.map((item) => ({
      url: item.defect_pict,
      label: item.defect_title,
    }));

  const formattedDefectsEksterior = car_defects_eksterior
    ?.filter((item) => item.defect_pict)
    ?.map((item) => ({
      url: item.defect_pict,
      label: item.defect_title,
    }));

  const formattedDefectsOther = car_defects_others
    ?.filter((item) => item.defect_pict)
    ?.map((item) => ({
      url: item.defect_pict,
      label: item.defect_title,
    }));

  return (
    <Accordion type="multiple" className="w-full">
      <AccordionItem value="interior" className="border-none mb-2">
        <AccordionTrigger className="flex items-center gap-2 bg-red-900 px-2.5 text-white font-bold mb-1">
          <div className="flex flex-row items-center gap-2.5">
            <Icon icon="iconoir:tools" className="w-5 h-5" />
            <p>Kerusakan Eksterior</p>
          </div>
        </AccordionTrigger>
        <AccordionContent className="p-3 border rounded-2xl">
          <Gallery images={formattedDefectsInterior || []} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="eksterior" className="border-none mb-2">
        <AccordionTrigger className="flex items-center gap-2 bg-red-900 px-2.5 text-white font-bold mb-1">
          <div className="flex flex-row items-center gap-2.5">
            <Icon icon="iconoir:tools" className="w-5 h-5" />
            <p>Kerusakan Eksterior</p>
          </div>
        </AccordionTrigger>
        <AccordionContent className="p-3 border rounded-2xl">
          <Gallery images={formattedDefectsEksterior || []} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="others" className="border-none">
        <AccordionTrigger className="flex items-center gap-2 bg-red-900 px-2.5 text-white font-bold mb-1">
          <div className="flex flex-row items-center gap-2.5">
            <Icon icon="iconoir:tools" className="w-5 h-5" />
            <p>Others</p>
          </div>
        </AccordionTrigger>
        <AccordionContent className="p-3 border rounded-2xl">
          <Gallery images={formattedDefectsOther || []} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
