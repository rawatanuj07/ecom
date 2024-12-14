async function SearchPage({
  searchParams,
}: {
  searchParams: {
    query: string;
  };
}) {
  const { query } = searchParams; // Removed `await` since `searchParams` is not asynchronous
  return <div>SearchPage for {query}</div>;
}

export default SearchPage;
