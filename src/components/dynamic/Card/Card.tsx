interface CardProps<T> {
  item: T;
  headers?: {
    [key in keyof T]?: string;
  };
  renderers: { [key in keyof T]?: (item: T[key]) => JSX.Element | undefined };
}

export const Card = <T extends object>({
  item,
  headers,
  renderers,
}: CardProps<T>) => {
  const columns = Object.keys(item) as Array<keyof T>;

  return (
    <div className="flex flex-col border rounded-md shadow-md p-4 ">
      {columns.map((column) => (
        <div
          key={String(column)}
          className="mb-4"
          style={{
            maxWidth: "20vw",
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
          }}
        >
          <h2 className="text-xl font-semibold mb-2">
            {headers?.[column] || String(column)}
          </h2>
          <div className="text-gray-600">
            {renderers[column]
              ? renderers[column]!(item[column])
              : typeof item[column] === "boolean"
              ? item[column]
                ? "true"
                : "false"
              : item[column]}
          </div>
        </div>
      ))}
    </div>
  );
};
