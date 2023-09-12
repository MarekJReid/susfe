import { Card } from "../Card/Card";

interface CardGridProps<T> {
  data: T[];
  renderers: { [key in keyof T]?: (item: T[key]) => JSX.Element | undefined };
  headers?: {
    [key in keyof T]?: string;
  };
}

export function CardGrid<T extends object>({
  data,
  renderers = {},
  headers,
}: CardGridProps<T>) {
  if (data.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 p-4 w-full">
      {data.map((item, rowIndex) => (
        <Card
          key={rowIndex}
          item={item}
          headers={headers}
          renderers={renderers}
        />
      ))}
    </div>
  );
}
