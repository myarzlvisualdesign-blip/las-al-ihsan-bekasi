"use client";

type CrudColumn<T> = {
  key: string;
  label: string;
  render: (item: T) => React.ReactNode;
};

type ItemCrudTableProps<T extends { id?: string }> = {
  columns: CrudColumn<T>[];
  items: T[];
  emptyMessage: string;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
};

export function ItemCrudTable<T extends { id?: string }>({
  columns,
  items,
  emptyMessage,
  onEdit,
  onDelete,
}: ItemCrudTableProps<T>) {
  if (items.length === 0) {
    return (
      <div className="rounded-[24px] border border-dashed border-[#d8d0c5] bg-[#f8f5f0] px-5 py-10 text-center text-sm text-[#556476]">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[24px] border border-[#ddd6cb] bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[#f8f5f0] text-[#556476]">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-4 py-3 font-semibold">
                  {column.label}
                </th>
              ))}
              <th className="px-4 py-3 font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr
                key={item.id ?? index}
                className="border-t border-[#eee8df] align-top"
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-4 text-[#182433]">
                    {column.render(item)}
                  </td>
                ))}
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(item)}
                      className="rounded-xl border border-[#d8d0c5] bg-[#f8f5f0] px-3 py-2 font-semibold text-[#182433] transition hover:bg-white"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(item)}
                      className="rounded-xl border border-[#efc6c1] bg-[#fff6f5] px-3 py-2 font-semibold text-[#b33b2e] transition hover:bg-white"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
