function Pagination({ total, limit, page, setPage }) {
  const numPages = Math.ceil(total / limit);

  return (
    <>
      <nav className="flex justify-center items-center gap-1 m-4">
        {page === 1 ? (
          <button
            className="page-link text-xl active  py-3 px-2  block border-0 bg-transparent outline-none transition-all duration-300 rounded-md text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          ></button>
        ) : (
          <button
            className="page-link text-xl active  disabled:bg-gray-400 py-3 px-6  block border-0 bg-transparent outline-none transition-all duration-300 rounded-md text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
            onClick={() => setPage(page - 1)}
          >
            &lt;
          </button>
        )}

        {Array(numPages)
          .fill()
          .map((_, i) => (
            <div key={i}>
              {page === i + 1 ? (
                <button
                  className="page-link text-xl active bg-white	 py-2 px-2  block border-0 bg-transparent outline-none transition-all duration-300 rounded-md text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                  key={(i + 1).toString}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ) : (
                <button
                  className="page-link text-xl py-3 px-6 bg-white	 block border-0 bg-transparent outline-none transition-all duration-300 rounded-md text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                  key={(i + 1000).toString}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              )}
            </div>
          ))}
        {page === numPages ? (
          <button
            className="page-link text-xl active  py-3 px-6  block border-0 bg-transparent outline-none transition-all duration-300 rounded-md text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
            onClick={() => setPage(page + 1)}
            disabled={page === numPages}
          ></button>
        ) : (
          <button
            className="page-link text-xl active  disabled:bg-gray-400 py-3 px-6  block border-0 bg-transparent outline-none transition-all duration-300 rounded-md text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
            onClick={() => setPage(page + 1)}
            disabled={page === numPages}
          >
            &gt;
          </button>
        )}
      </nav>
    </>
  );
}

export default Pagination;
