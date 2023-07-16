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
    };
}

const ReposTable: React.FC<Props> = ({data, elements, options}) => {
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [tab, setTab] = useState<number>(0);

    const pageSize = 4; // Number of items per page

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
        return elements.filter((element, i) => {

            // Filtering based on the tab selected
            if(options.favTab && tab === 1 && data[i]['isFav'] !== true) return false;

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
    }, [elements, data, options.filters, searchText, tab]);

    /**
     * Memoized total number of pages
     */
    const totalPages = useMemo(() => Math.ceil(filteredItems.length / pageSize), [
        filteredItems.length,
        pageSize,
    ]);

    /**
     * Function to handle page change
     * @param page Page number
     */
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Calculate start and end index of items for current page
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Get items for current page
    const currentItems: JSX.Element[] = filteredItems.slice(startIndex, endIndex);

    const handleTabs = (id: number) => {
        setTab(id);
    }
    console.log(tab)

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

                {options.favTab &&
                    <div className={styles['tabs']}>
                        <button className={`${tab === 0 ? 'bg-blue-500' : 'bg-gray-200'}`} onClick={() => handleTabs(0)}>All</button>
                        <button className={`${tab === 1 ? 'bg-blue-500' : 'bg-gray-200'}`} onClick={() => handleTabs(1)}>Favorites</button>
                    </div>
                }


            </div>

            <div className={styles['content']}>
                <ul className={styles['cards']}>{currentItems}</ul>
            </div>


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
        </div>
    );
};

export default ReposTable;
