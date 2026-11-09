export default function SpecsTable({ specs }) {
  if (!specs?.length) return null;
  return (
    <section aria-labelledby="specs-title" className="section !pt-0">
      <div className="container-x">
        <div className="reveal grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <div>
            <p className="eyebrow mb-3">Hardware</p>
            <h2 id="specs-title" data-split className="t-h2">
              Specifications
            </h2>
          </div>
          <table className="w-full border-collapse text-left text-[15px]">
            <tbody>
              {specs.map(([k, v]) => (
                <tr key={k} className="border-b border-grey-200 first:border-t">
                  <th scope="row" className="w-[34%] py-4 pr-6 align-top font-semibold">
                    {k}
                  </th>
                  <td className="py-4 text-grey-600">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
