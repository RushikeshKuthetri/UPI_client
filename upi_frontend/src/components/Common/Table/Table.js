'use client';
import React from "react";

const Table1 = ({
  columns = [],
  data = [],
  renderActions,
}) => {
  return (
    <div className="w-full">
            {/* Adjust border color according to theme */}
      <div className="w-full overflow-x-auto rounded-xl border-t border-l border-r  border-[var(--form-border)]"> 

        <table className="w-full border-collapse">

          {/* adjust bg color and gradiant accordint to the theme */}
          <thead className="bg-gradient-to-r from-orange-400 to-orange-300 text-black">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="text-[14px] text-left px-2 py-1 font-semibold whitespace-nowrap border-b border-[var(--form-border)]"
                >
                  {col.label}
                </th>
              ))}

              {renderActions && (
                <th className="text-[14px] px-2 py-1 text-left font-semibold border-b border-[var(--form-border)]">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          {/* adjust color for table body according to theme */}
          <tbody className="border-b border-[var(--form-border)] ">
            {data.map((row, index) => (
                // if want add color for hover effect
              <tr
                key={index}
                className="border-b border-[var(--form-border)]    transition "
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="text-[13px] px-2 py-1 whitespace-nowrap text-sm"
                  >
                    {col.render
                      ? col.render(row[col.key], row)
                      : row[col.key]}
                  </td>
                ))}

                {renderActions && (
                  <td className="px-6 py-1 ">
                    {renderActions(row)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default Table1;
