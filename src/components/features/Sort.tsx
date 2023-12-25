import { LuArrowDownUp } from "react-icons/lu";

function Sort({ sort, setSort }: any) {
  console.log(sort);

  const handleSortOrderToggle = () => {
    // Toggle the sort order between "asc" and "desc"
    const newOrder = sort.order === "asc" ? "desc" : "asc";
    setSort({ sort: sort.sort, order: newOrder });
  };

  return (
    <div className="py-4 flex justify-between">
      <select
        name=""
        id=""
        className="border w-1/2"
        value={sort.sort} // Use value instead of defaultValue for controlled component
        onChange={(e) => setSort({ sort: e.target.value, order: sort.order })}
      >
        {/* <option value="year">Year</option>
        <option value="rating">Rating</option> */}
      </select>

      <div className="" onClick={handleSortOrderToggle}>
        <LuArrowDownUp size={30} color="white" />
      </div>
    </div>
  );
}

export default Sort;
