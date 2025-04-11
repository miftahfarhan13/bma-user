import { SelectOption } from "@/types/type";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MultiValue } from "react-select";

interface UsePaginationProps {
  pageSize: number;
  page: number;
  search: string | undefined;
  orderBy: string;
  sort: "asc" | "desc";
  brandName: string[];
  defectStatus: string[];
  handlePageSizeChange: (value: number) => void;
  handlePageChange: (value: number) => void;
  handleSearchChange: (value: string) => void;
  handleOrderByChange: (orderBy: string, sort: "asc" | "desc") => void;
  handleBrandNameChange: (value: MultiValue<SelectOption>) => void;
  handleDefectStatusChange: (value: MultiValue<SelectOption>) => void;
}

export const usePagination = (): UsePaginationProps => {
  const router = useRouter();
  const [pageSize, setPageSize] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string | undefined>();
  const [orderBy, setOrderBy] = useState<string>("created_at");
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [brandName, setBrandName] = useState<string[]>([]);
  const [defectStatus, setDefectStatus] = useState<string[]>([]);

  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
    setPage(1);
    router.replace({
      query: {
        ...router.query,
        page_size: value.toString(),
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
    const queryPageSize = router.query.page_size;
    const queryPage = router.query.page;
    const queryOrderBy = router.query.order_by;
    const querySort = router.query.sort;
    const querySearch = router.query.search;
    const queryBrandName = router.query.brand_name;
    const queryDefectStatus = router.query.defect_status;

    if (queryPageSize && !isNaN(Number(queryPageSize))) {
      setPageSize(Number(queryPageSize));
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
    pageSize,
    page,
    search,
    orderBy,
    sort,
    brandName,
    defectStatus,
    handlePageSizeChange,
    handlePageChange,
    handleSearchChange,
    handleOrderByChange,
    handleBrandNameChange,
    handleDefectStatusChange,
  };
};
