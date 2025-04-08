import { getGarageCars } from "@/service/car";
import { useAuth } from "@/utils/context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import React from "react";
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

export default function GarageCar() {
  const { token } = useAuth();

  const {
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

  const { data, isLoading } = useQuery({
    queryKey: [
      "available-cars",
      token,
      search,
      orderBy,
      sort,
      brandName,
      defectStatus,
    ],
    queryFn: () =>
      getGarageCars({
        isPaginate: "true",
        search,
        sort,
        orderBy,
        brandName,
        defectStatus,
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
                {isLoading ? (
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

      <div className="flex flex-col-reverse md:flex-row gap-5 items-center justify-between w-full">
        <p>
          <b>{data?.data?.data?.length} Mobil</b> yang tersedia
        </p>

        <div className="flex flex-col md:flex-row gap-2.5 w-full md:w-fit">
          <SortCar
            orderBy={orderBy}
            sort={sort}
            handleChange={handleOrderByChange}
          />
          <FilterDefectCar
            defectStatus={defectStatus}
            handleChangeDefectStatus={handleDefectStatusChange}
          />
          <FilterBrand
            brandName={brandName}
            handleChangeBrandName={handleBrandNameChange}
          />
        </div>
      </div>

      {data?.data?.data && data?.data?.data?.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
            {data?.data?.data?.map((car) => (
              <CarItem key={car?.car?.id} car={car?.car} />
            ))}
          </div>
        </>
      ) : (
        <>
          <EmptyState
            message="Tidak ada Mobil yang tersedia. <br> Cari Mobil anda sekarang!"
            isUseSearch
          />
        </>
      )}
    </div>
  );
}
