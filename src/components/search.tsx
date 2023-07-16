import {useState} from "react";

interface Props {
    data: Object[];
}

const Search: React.FC<Props> = ({data,}) => {
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 4; // Number of items per page

    // Function to handle search text change
    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
        setCurrentPage(1); // Reset current page when search text changes
    };

    // Function to handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Function to filter items based on search text


    // Get filtered items based on search text
    const filteredItems = data.filter((item) => {
        const values = Object.values(item);
        for (let i = 0; i < values.length; i++) {
            const propertyValue = values[i];
            if (
                typeof propertyValue === 'string' &&
                propertyValue.toLowerCase().includes(searchText.toLowerCase())
            ) {
                return true;
            }
        }
        return false;
    });

    // Calculate total pages
    const totalPages = Math.ceil(filteredItems.length / pageSize);

    // Calculate start and end index of items for current page
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Get items for current page
    const currentItems = filteredItems.map((item) => JSON.stringify(item)).slice(startIndex, endIndex);

    return (

        <div>
            <input
                type="text"
                placeholder="Search"
                value={searchText}
                onChange={handleSearchChange}
                className="border border-gray-300 rounded-md px-4 py-2"
            />

            <ul className="mt-4">
                {currentItems.map((item, index) => (
                    <li key={index} className="py-2">
                        {item}
                    </li>
                ))}
            </ul>

            <div className="mt-4">
                {Array.from({length: totalPages}, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-2 rounded-md mx-1 ${
                            page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'
                        }`}
                    >
                        {page}
                    </button>
                ))}
            </div>
        </div>

    )
}

export default Search;
