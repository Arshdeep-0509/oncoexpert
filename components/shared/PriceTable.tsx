import { priceTableLabels } from "@/content/shared/sections";

type PriceTableProps = {
  caption: string;
  rows: readonly { name: string; price: string; includes: readonly string[] }[];
};

/**
 * The package prices as a real, visually hidden table (screen readers, and answer engines, which
 * quote tables). In a div: a table ignores sr-only's 1px width and could widen the page.
 */
export function PriceTable({ caption, rows }: PriceTableProps) {
  return (
    <div className="sr-only">
      <table>
        <caption>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">{priceTableLabels.package}</th>
            <th scope="col">{priceTableLabels.price}</th>
            <th scope="col">{priceTableLabels.includes}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name}>
              <th scope="row">{r.name}</th>
              <td>{r.price}</td>
              <td>{r.includes.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
