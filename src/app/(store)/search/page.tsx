async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const { query } = await searchParams; // Removed `await` since `searchParams` is not asynchronous
  return <div>SearchPage for {query}</div>;
}

export default SearchPage;
