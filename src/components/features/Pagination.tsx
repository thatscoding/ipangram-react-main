function Pagination({ page, setPage, total, limit }: any) {
  const totalPages = Math.ceil(total / limit);
  return (
    <div className="flex gap-4 justify-center">
      {totalPages > 0
        ? [...Array(totalPages)].map((val, index) => (
            <div
              key={index}
              onClick={() => setPage(index + 1)}
              className={
                page === index + 1
                  ? `bg-red-500 w-8 h-6 flex justify-center items-center text-white rounded cursor-pointer`
                  : `bg-green-500 w-8 h-6 flex justify-center items-center text-white rounded cursor-pointer`
              }
            >
              <button>{index + 1}</button>
            </div>
          ))
        : null}
      <button></button>
    </div>
  );
}

export default Pagination;
