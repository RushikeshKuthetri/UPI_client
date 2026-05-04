import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className=" w-fit">
      <div className="flex items-center rounded-md px-2 transition-colors duration-300 bg-[var(--search-bg)] border border-[var(--search-border)] ">
        
        <Search size={18} className="mr-2" style={{ color: "var(--search-placeholder)" }} />        
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none w-full placeholder-[var(--search-placeholder)]"
        />
        
      </div>
    </div>
  );
} 
