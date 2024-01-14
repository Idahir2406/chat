import { IoIosSearch } from "react-icons/io";
export const SearchBar = () => {
  return (
    <div className="bg-white rounded-md relative">
            <IoIosSearch className="absolute left-4 top-3 text-gray-400"/>
            <input
              className="px-12 py-2 bg-transparent"
              placeholder="Buscar"
            />
          </div>
  )
}
