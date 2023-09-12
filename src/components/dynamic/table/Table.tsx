import { TableProps } from "../../../types/component-types";

/**
 * Represents a generic table component.
 *
 * @template T - The type of data in the table.
 * @param {TableProps<T>} props - The props for the Table component.
 * @returns {JSX.Element | null} The rendered Table component.
 */
export function Table<T extends object>({
  data,
  renderers = {},
  headers,
}: TableProps<T>): JSX.Element | null {
  // If there is no data, return null (no table to display)
  if (data.length === 0) return null;

  // Get the column names from the first item in the data array
  const columns = Object.keys(data[0]) as Array<keyof T>;

  return (
    <table className="w-[20vw] text-left border-collapse">
      <thead className="font-sans bg-blue-500 text-white">
        <tr>
          {/* Render table headers */}
          {columns.map((column) => (
            <th key={String(column)} className="p-4 border border-gray-300">
              {headers?.[column] || String(column)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="font-sans">
        {/* Render table rows */}
        {data.map((item, rowIndex) => (
          <tr
            key={rowIndex}
            className={`${rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
          >
            {columns.map((column) => (
              <td
                key={String(column)}
                className="p-4 border border-gray-300"
                style={{
                  maxWidth: "20vw",
                  whiteSpace: "pre-wrap",
                  wordWrap: "break-word",
                }}
              >
                <p>
                  {/* Render cell content using custom renderer or default behavior */}
                  {renderers[column]
                    ? renderers[column]!(item[column])
                    : typeof item[column] === "boolean"
                    ? item[column]
                      ? "true"
                      : "false"
                    : item[column]}
                </p>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
