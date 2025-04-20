import { SelectOption } from "@/types/type";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MultiValue } from "react-select";

interface UsePaginationProps {
  perPage: number;
  page: number;
  search: string | undefined;
  orderBy: string;
  sort: "asc" | "desc";
  brandName: string[];
  defectStatus: string[];
  handlePerPageChange: (value: number) => void;
  handlePageChange: (value: number) => void;
  handleSearchChange: (value: string) => void;
  handleOrderByChange: (orderBy: string, sort: "asc" | "desc") => void;
  handleBrandNameChange: (value: MultiValue<SelectOption>) => void;
  handleDefectStatusChange: (value: MultiValue<SelectOption>) => void;
}

export const usePagination = (): UsePaginationProps => {
  const router = useRouter();
  const [perPage, setPerPage] = useState<number>(1000);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string | undefined>();
  const [orderBy, setOrderBy] = useState<string>("");
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [brandName, setBrandName] = useState<string[]>([]);
  const [defectStatus, setDefectStatus] = useState<string[]>([]);

  const handlePerPageChange = (value: number) => {
    setPerPage(value);
    setPage(1);
    router.replace({
      query: {
        ...router.query,
        per_page: value.toString(),
        page: "1",
      },
    });
  };

  const handlePageChange = (value: number) => {
    setPage(value);
    router.replace({
      query: {
        ...router.query,
        page: value.toString(),
      },
    });
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
    router.replace({
      query: {
        ...router.query,
        search: value.toString(),
      },
    });
  };

  const handleOrderByChange = (orderBy: string, sort: "asc" | "desc") => {
    setOrderBy(orderBy);
    setSort(sort);
    setPage(1);
    router.replace({
      query: {
        ...router.query,
        order_by: orderBy,
        sort,
      },
    });
  };

  const handleBrandNameChange = (values: MultiValue<SelectOption>) => {
    const selectedValues = values.map((v) => v.value);
    setBrandName(selectedValues);
    setPage(1);

    router.replace({
      query: {
        ...router.query,
        brand_name: selectedValues, // this will become brand_name[]=Toyota&brand_name[]=Honda
      },
    });
  };

  const handleDefectStatusChange = (values: MultiValue<SelectOption>) => {
    const selectedValues = values.map((v) => v.value);
    setDefectStatus(selectedValues);
    setPage(1);

    router.replace({
      query: {
        ...router.query,
        defect_status: selectedValues, // this will become brand_name[]=Toyota&brand_name[]=Honda
      },
    });
  };

  useEffect(() => {
    const queryPerPage = router.query.per_page;
    const queryPage = router.query.page;
    const queryOrderBy = router.query.order_by;
    const querySort = router.query.sort;
    const querySearch = router.query.search;
    const queryBrandName = router.query.brand_name;
    const queryDefectStatus = router.query.defect_status;

    if (queryPerPage && !isNaN(Number(queryPerPage))) {
      setPerPage(Number(queryPerPage));
    }
    if (queryPage && !isNaN(Number(queryPage))) {
      setPage(Number(queryPage));
    }
    if (queryOrderBy && typeof queryOrderBy === "string") {
      setOrderBy(queryOrderBy);
    }
    if (querySort && (querySort === "asc" || querySort === "desc")) {
      setSort(querySort);
    }
    if (querySearch && typeof querySearch === "string") {
      setSearch(querySearch);
    }
    if (queryBrandName) {
      if (Array.isArray(queryBrandName)) {
        setBrandName(queryBrandName);
      } else if (typeof queryBrandName === "string") {
        setBrandName([queryBrandName]);
      }
    }
    if (queryDefectStatus) {
      if (Array.isArray(queryDefectStatus)) {
        setDefectStatus(queryDefectStatus);
      } else if (typeof queryDefectStatus === "string") {
        setDefectStatus([queryDefectStatus]);
      }
    }
  }, [router.query]);

  return {
    perPage,
    page,
    search,
    orderBy,
    sort,
    brandName,
    defectStatus,
    handlePerPageChange,
    handlePageChange,
    handleSearchChange,
    handleOrderByChange,
    handleBrandNameChange,
    handleDefectStatusChange,
  };
};
