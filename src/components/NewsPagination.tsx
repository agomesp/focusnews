import {
    Pagination,
    PaginationContent, PaginationEllipsis,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination.tsx";
import useNewsStore from "@/store/useNewsStore.ts";

const NewsPagination = () => {
    const {currentPage, totalPages, setCurrentPage} = useNewsStore();

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#"
                                        onClick={() => handlePageChange(currentPage === 1 ? currentPage : currentPage - 1)}/>
                </PaginationItem>
                {currentPage > 2 ? (
                    <>
                        <PaginationItem>
                            <PaginationLink isActive={currentPage === 1} href="#" onClick={() => handlePageChange(1)}>1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis/>
                        </PaginationItem>
                    </>
                ) : null}

                {
                    Array.from({length: totalPages > 5 ? 4 : totalPages}, (_, index) => (
                        <PaginationItem key={index}>
                            {currentPage > 5 ?
                                <PaginationLink isActive={currentPage === currentPage - 3 + index} href="#"
                                                onClick={() => handlePageChange(currentPage - 3 + index)}>{currentPage - 3 + index}</PaginationLink> :
                                <PaginationLink isActive={currentPage === currentPage + index} href="#"
                                                onClick={() => handlePageChange(currentPage + index)}>{currentPage + index}</PaginationLink>
                            }

                        </PaginationItem>
                    ))
                }

                {(totalPages > 5 && currentPage !== totalPages && currentPage !== totalPages - 1) ? (
                    <PaginationItem>
                        <PaginationEllipsis/>
                    </PaginationItem>
                ) : null}

                {(totalPages > 5 && currentPage !== totalPages) ? (
                    <PaginationItem>
                        <PaginationLink href="#"
                                        onClick={() => handlePageChange(totalPages)}>{totalPages}</PaginationLink>
                    </PaginationItem>
                ) : null}

                <PaginationItem>
                    <PaginationNext href="#"
                                    onClick={() => handlePageChange(currentPage === totalPages ? currentPage : currentPage + 1)}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}

export default NewsPagination;