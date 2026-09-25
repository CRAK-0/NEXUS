import SearchBar from "../search/SearchBar.tsx";

const Topbar = () => {
  return (
    <header className="flex h-16 items-center border-b border-border px-6">
      <SearchBar />
    </header>
  );
};

export default Topbar;