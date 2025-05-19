
import React, { useState } from 'react';

const Table = ({ 
  columns, 
  data, 
  searchable = true, 
  filterable = true,
  pagination = true,
  itemsPerPageOptions = [10, 25, 50, 100],
  defaultItemsPerPage = 10
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
  const [filters, setFilters] = useState({});

  // Search functionality
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Filter functionality
  const handleFilterChange = (column, value) => {
    setFilters(prev => ({
      ...prev,
      [column]: value
    }));
    setCurrentPage(1);
  };

  // Apply filters and search
  const filteredData = data.filter(item => {
    // Apply search term
    if (searchTerm) {
      const searchableValues = columns
        .filter(col => !col.noSearch)
        .map(col => item[col.accessor])
        .join(' ')
        .toLowerCase();
      
      if (!searchableValues.includes(searchTerm.toLowerCase())) {
        return false;
      }
    }
    
    // Apply filters
    for (const [key, value] of Object.entries(filters)) {
      if (value && item[key] !== value && item[key]?.toString() !== value) {
        return false;
      }
    }
    
    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = pagination
    ? filteredData.slice(startIndex, startIndex + itemsPerPage)
    : filteredData;

  return (
    <div className="card">
      {(searchable || filterable) && (
        <div className="filter-section">
          {searchable && (
            <div className="filter-item">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
                className="form-control"
              />
            </div>
          )}
          
          {filterable && columns.map(column => (
            column.filterable && (
              <div key={column.accessor} className="filter-item">
                {column.filterComponent ? (
                  column.filterComponent(filters[column.accessor], value => 
                    handleFilterChange(column.accessor, value)
                  )
                ) : (
                  <input
                    type="text"
                    placeholder={`Filter ${column.header}`}
                    value={filters[column.accessor] || ''}
                    onChange={(e) => handleFilterChange(column.accessor, e.target.value)}
                    className="form-control"
                  />
                )}
              </div>
            )
          ))}
        </div>
      )}
      
      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              {columns.map(column => (
                <th key={column.accessor} style={column.style}>
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr key={index}>
                  {columns.map(column => (
                    <td key={`${index}-${column.accessor}`} style={column.style}>
                      {column.cell ? column.cell(item) : item[column.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center py-4">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {pagination && totalPages > 1 && (
        <div className="flex justify-between items-center p-4 border-t">
          <div className="flex items-center">
            <span className="mr-2">Show:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="form-control"
              style={{ width: '80px' }}
            >
              {itemsPerPageOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center">
            <span className="mr-4">
              {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length}
            </span>
            
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="btn btn-sm btn-secondary"
              >
                &lt;&lt;
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="btn btn-sm btn-secondary"
              >
                &lt;
              </button>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="btn btn-sm btn-secondary"
              >
                &gt;
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="btn btn-sm btn-secondary"
              >
                &gt;&gt;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
