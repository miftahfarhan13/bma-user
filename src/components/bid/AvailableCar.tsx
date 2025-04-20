import { getAvailableCars } from "@/service/car";
import { useAuth } from "@/utils/context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePagination } from "@/utils/hooks/usePagination";
import { Form, Formik } from "formik";
import { InputField } from "../input/InputField";
import { Loader2 } from "lucide-react";
import { SortCar } from "./SortCar";
import { FilterDefectCar } from "./FilterDefectCar";
import { FilterBrand } from "./FilterBrand";
import CarItem from "../car/CarItem";
import EmptyState from "../state/EmptyState";
import CarItemList from "../car/CarItemList";
import CarItemSkeleton from "../car/CarItemSkeleton";

export default function AvaiableCar({ isFavorite }: { isFavorite: boolean }) {
  const { token } = useAuth();
  const [listType, setListType] = useState("grid");

  const {
    perPage,
    search,
    orderBy,
    sort,
    brandName,
    defectStatus,
    handleSearchChange,
    handleOrderByChange,
    handleBrandNameChange,
    handleDefectStatusChange,
  } = usePagination();

  const { data, isLoading, isPending } = useQuery({
    queryKey: [
      "available-cars",
      token,
      search,
      orderBy,
      sort,
      brandName,
      defectStatus,
      perPage
    ],
    queryFn: () =>
      getAvailableCars({
        isPaginate: "true",
        search,
        sort,
        orderBy,
        brandName,
        defectStatus,
        perPage,
        isFavorite: isFavorite ? "true" : undefined,
      }),
    refetchOnWindowFocus: false,
    enabled: !!token,
  });

  return (
    <div className="flex flex-col gap-5">
      <Formik
        initialValues={{ search: "" }}
        enableReinitialize
        onSubmit={(e) => {
          handleSearchChange(e.search);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="flex flex-row gap-5 w-full">
              <InputField
                placeholder="Cari Mobil"
                name="search"
                error={errors?.search}
                touched={touched?.search}
                type="text"
                leftAddon={<Icon icon="bx:search" />}
              />

              <Button
                type="submit"
                className="bg-red-800 hover:bg-red-900 font-bold"
                disabled={isLoading}
              >
                {isLoading && isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Icon icon="bx:search" />
                )}
                Cari
              </Button>
            </div>
          </Form>
        )}
      </Formik>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-2.5 w-full md:w-[50%] self-end">
        <div className="mb-2.5 md:mb-0">
          <SortCar
            orderBy={orderBy}
            sort={sort}
            handleChange={handleOrderByChange}
          />
        </div>
        <div className="grid grid-cols-2 gap-2.5 col-span-2">
          <FilterDefectCar
            defectStatus={defectStatus}
            handleChangeDefectStatus={handleDefectStatusChange}
          />
          <FilterBrand
            brandName={brandName}
            handleChangeBrandName={(value) => handleBrandNameChange(value)}
          />
        </div>
      </div>

      <div className="flex flex-row items-center justify-between w-full">
        <p>
          <b>{data?.data?.total} Mobil</b> yang tersedia
        </p>

        <div className="block md:hidden">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setListType(listType === "grid" ? "list" : "grid")}
          >
            <Icon icon={listType !== "grid" ? "si:grid-fill" : "el:list"} />
          </Button>
        </div>
      </div>

      {!isLoading && !isPending ? (
        <>
          {data?.data && data?.data?.total > 0 ? (
            <>
              {listType === "grid" ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                    {data?.data?.data?.map((car) => (
                      <CarItem key={car?.id} car={car} />
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col gap-5">
                    {data?.data?.data?.map((car) => (
                      <CarItemList key={car?.id} car={car} />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <EmptyState
                message="Tidak ada Mobil yang tersedia. <br> Silakan Menunggu Waktu Lelang Selanjutnya !"
                isUseSearch={isFavorite}
              />
            </>
          )}
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
            <CarItemSkeleton />
            <CarItemSkeleton />
            <CarItemSkeleton />
            <CarItemSkeleton />
          </div>
        </>
      )}
    </div>
  );
}
