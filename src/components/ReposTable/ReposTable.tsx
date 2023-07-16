// Core
import React, {useState, useMemo} from "react";
// Styles
import styles from "./ReposTable.module.css";

interface Props {
    data: object[];
    elements: JSX.Element[];
    options: {
        filters: string[];
        favTab: boolean;
        pageSize: number;
    };
}

/**
 * ReposTable component
 * @param data Data to be displayed and used for filtering
 * @param elements Elements to be displayed
 * @param options Options to be applied
 * @constructor
 * @return JSX.Element
 * @category Components
 */

const ReposTable: React.FC<Props> = ({data, elements, options}) => {
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState<number>(1);

    /**
     * Function to handle search text change
     * @param e Change event
     */
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchText = e.target.value;
        setSearchText(newSearchText);
        setCurrentPage(1); // Reset current page when search text changes
    };

    /**
     * Memoized filtered items
     */
    const filteredItems = useMemo(() => {
        return elements.filter((_, i) => {

            // Filtering based on the tab selected
            // @ts-ignore
            if(options.favTab && data[i]['isFav'] !== true) return false;

            let elementData = Object.entries(data[i]);
            // Filtering properties based on the filters provided
            if (options.filters) {
                elementData = elementData.filter(([key, _]) => options.filters.includes(key));
            }

            for (const [, value] of elementData) {
                if (
                    typeof value === "string" && value.toLowerCase().includes(searchText.toLowerCase())){
                    return true;
                }
            }
            return false;
        });
    }, [elements, data, options, searchText, currentPage]);

    /**
     * Memoized total number of pages
     */
    const totalPages = useMemo(() => Math.ceil(filteredItems.length / options.pageSize), [
        filteredItems.length,
        options.pageSize,
    ]);

    /**
     * Function to handle page change
     * @param page Page number
     */
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };


    // Calculate start and end index of items for current page
    const startIndex = (currentPage - 1) * options.pageSize;
    const endIndex = startIndex + options.pageSize;
    // Get current items based on the page selected
    const currentItems: JSX.Element[] = totalPages > 1 ? filteredItems.slice(startIndex, endIndex): filteredItems;

    return (
        <div className={styles['ReposTable']}>
            <div className={styles['search']}>
                <input
                    type="text"
                    placeholder="SearchBar"
                    value={searchText}
                    onChange={handleSearchChange}
                    className="border border-gray-300 rounded-md"
                />
            </div>

            <div className={styles['content']}>
                <ul className={styles['cards']}>{currentItems}</ul>
            </div>


            { totalPages > 1 &&
                <div className={styles['pagination']}>
                {Array.from({length: totalPages}, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-2 rounded-md ${
                            page === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"
                        }`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            }
        </div>
    );
};

export default ReposTable;
