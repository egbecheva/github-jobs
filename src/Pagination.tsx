import React, { useState } from "react";

function usePagination(data:any, itemsPerPage:number, country:string | undefined) {
  const [currentPage, setCurrentPage] = useState(1);
  let filteredCountryResults:any
  country ? filteredCountryResults = data.filter((e:any)=>e.candidate_required_location===country) : filteredCountryResults = data
  const maxPage = Math.ceil(filteredCountryResults?.length > itemsPerPage
     ? filteredCountryResults?.length / itemsPerPage
     : 1) ;
  


  function currentData() {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return filteredCountryResults?.slice(begin, end);
  }

  function next() {
    setCurrentPage(currentPage => Math.min(currentPage + 1, maxPage));
  }

  function prev() {
    setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
  }

  function jump(page:number) {
    const pageNumber = Math.max(1, page);
    setCurrentPage(currentPage => Math.min(pageNumber, maxPage));
  }

  return { next, prev, jump, currentData, currentPage, maxPage,filteredCountryResults };
}

export default usePagination;
