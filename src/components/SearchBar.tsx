import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRecoilState } from "recoil";

import { searchAtom } from "../atoms/searchAtom";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useRecoilState(searchAtom);

  return (
    <div className="flex justify-center">
      <div className="relative text-gray-600">
        <input
          type="search"
          name="search"
          placeholder="Search"
          className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
          {/* import search from heroicons */}
          <MagnifyingGlassIcon className="h-4 w-4 text-gray-500" />
        </button>
      </div>
    </div>
  );
}
