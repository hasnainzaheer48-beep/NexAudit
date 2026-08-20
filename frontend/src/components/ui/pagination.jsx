export default function Pagination({ pagination, onPageChange }) {

    const totalPages = pagination.totalPages;
    const currentPage = pagination.page;
    let pages;

    if (totalPages <= 5) {
        pages = Array.from(
            { length: totalPages },
            (_, index) => index + 1
        );
    }
    else if (currentPage <= 3) {
        pages = [1, 2, 3, "...", totalPages];
    }
    else if (currentPage >= totalPages - 2) {
        pages = [1, "...", totalPages - 2, totalPages - 1, totalPages];
    }
    else {
        pages = [
            1,
            "...",
            currentPage - 1,
            currentPage,
            currentPage + 1,
            "...",
            totalPages
        ];
    }

    if (pagination.totalPages <= 1) {
        return null;
    }
    return (
        <div className="flex justify-center items-center gap-5 text-lg py-2">
            <button className="border border-[#cbcbcb] px-2 py-1 hover:bg-[#174d38] hover:text-white hover:cursor-pointer transition " disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
                ‹
            </button>
            {
                pages.map((page, index) => {

                    if (page === "...") {
                        return (
                            <span key={index}>
                                ...
                            </span>
                        );
                    }

                    return (
                        <button
                            className={` ${page === currentPage
                                ? "bg-[#174d38] text-white px-3 py-1 rounded"
                                : " hover:bg-gray-100"} border
                                 border-[#cbcbcb]
                                  px-3 py-2 text-sm font-medium 
                                   hover:cursor-pointer transition `}
                            key={page}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    );
                })
            }
            <button className="border border-[#cbcbcb] px-2 py-1 hover:bg-[#174d38] hover:text-white hover:cursor-pointer transition " disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
                ›
            </button>
        </div>
    )

}