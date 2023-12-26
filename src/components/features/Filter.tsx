function Filter({ allLocation, location, setlocation }: any) {
  console.log(allLocation);
  return (
    <div>
      <div className="flex gap-4 flex-wrap pt-2">
        {allLocation.map((val: string, index: number) => (
          <div
            className={
              location.includes(val)
                ? " bg-green-500 text-white  px-2 py-1 border-green-500 rounded capitalize cursor-pointer"
                : " border px-2 py-1  border-gray-500 rounded text-white capitalize cursor-pointer"
            }
            key={index}
            onClick={() =>
              setlocation((v: any) => {
                if (v.includes(val)) {
                  // If the genre is already selected, remove it
                  return v.filter((vv: any) => vv !== val);
                } else {
                  // If the genre is not selected, add it
                  return [...v, val];
                }
              })
            }
          >
            <div className="flex gap-4">
              <p>{val} </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Filter;
