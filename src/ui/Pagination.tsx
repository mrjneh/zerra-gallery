// import { Link } from "react-router-dom";

// type Props = {
//   currentPage: number;
//   totalPages: number;
//   siblingCount?: number; // how many pages around current
//   makeHref?: (page: number) => string; // optional: customize links
// };

// const DOTS = "…" as const;
// type PageItem = number | typeof DOTS;

// function range(start: number, end: number) {
//   const len = Math.max(end - start + 1, 0);
//   return Array.from({ length: len }, (_, i) => start + i);
// }

// function getPagination(
//   currentPage: number,
//   totalPages: number,
//   siblingCount: number
// ): PageItem[] {
//   const totalNumbers = siblingCount * 2 + 5; // first + last + current + 2 dots

//   if (totalPages <= totalNumbers) return range(1, totalPages);

//   const leftSibling = Math.max(currentPage - siblingCount, 1);
//   const rightSibling = Math.min(currentPage + siblingCount, totalPages);

//   const showLeftDots = leftSibling > 2;
//   const showRightDots = rightSibling < totalPages - 1;

//   if (!showLeftDots && showRightDots) {
//     const leftRange = range(1, 3 + 2 * siblingCount);
//     return [...leftRange, DOTS, totalPages];
//   }
//   if (showLeftDots && !showRightDots) {
//     const rightRange = range(
//       totalPages - (3 + 2 * siblingCount) + 1,
//       totalPages
//     );
//     return [1, DOTS, ...rightRange];
//   }
//   const middleRange = range(leftSibling, rightSibling);
//   return [1, DOTS, ...middleRange, DOTS, totalPages];
// }

// export default function Pagination({
//   currentPage,
//   totalPages,
//   siblingCount = 1,
//   makeHref,
// }: Props) {
//   if (totalPages <= 1) return null;

//   const items = getPagination(currentPage, totalPages, siblingCount)
//     // extra safety: collapse any accidental adjacent duplicates (numbers or dots)
//     .filter((v, i, a) => i === 0 || v !== a[i - 1]);

//   const href = makeHref ?? ((p: number) => `/products/${p}`);

//   return (
//     <nav aria-label="Pagination" className="flex gap-2 items-center">
//       <Link
//         to={href(Math.max(1, currentPage - 1))}
//         aria-disabled={currentPage === 1}
//         className={`px-3 py-1 border rounded-full ${
//           currentPage === 1
//             ? "pointer-events-none opacity-50"
//             : "hover:bg-gray-200"
//         }`}
//       >
//         Prev
//       </Link>

//       {items.map((it, idx) =>
//         it === DOTS ? (
//           <span key={`dots-${idx}`} className="px-2 select-none">
//             {DOTS}
//           </span>
//         ) : (
//           <Link
//             key={`p-${it}`}
//             to={href(it)}
//             aria-current={currentPage === it ? "page" : undefined}
//             className={`h-8 w-8 flex items-center justify-center border rounded-full ${
//               currentPage === it
//                 ? "bg-black text-white border-black"
//                 : "border-[#201815] hover:bg-gray-200"
//             }`}
//           >
//             {it}
//           </Link>
//         )
//       )}

//       <Link
//         to={href(Math.min(totalPages, currentPage + 1))}
//         aria-disabled={currentPage === totalPages}
//         className={`px-3 py-1 border rounded-full ${
//           currentPage === totalPages
//             ? "pointer-events-none opacity-50"
//             : "hover:bg-gray-200"
//         }`}
//       >
//         Next
//       </Link>
//     </nav>
//   );
// }

import { Link, useSearchParams } from "react-router-dom";

type Props = {
  currentPage: number;
  totalPages: number;
  siblingCount?: number;
};

const DOTS = "…" as const;
type PageItem = number | typeof DOTS;

function range(start: number, end: number) {
  const len = Math.max(end - start + 1, 0);
  return Array.from({ length: len }, (_, i) => start + i);
}

function getPagination(
  currentPage: number,
  totalPages: number,
  siblingCount: number
): PageItem[] {
  const totalNumbers = siblingCount * 2 + 5;

  if (totalPages <= totalNumbers) return range(1, totalPages);

  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages);

  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < totalPages - 1;

  if (!showLeftDots && showRightDots) {
    const leftRange = range(1, 3 + 2 * siblingCount);
    return [...leftRange, DOTS, totalPages];
  }
  if (showLeftDots && !showRightDots) {
    const rightRange = range(
      totalPages - (3 + 2 * siblingCount) + 1,
      totalPages
    );
    return [1, DOTS, ...rightRange];
  }
  const middleRange = range(leftSibling, rightSibling);
  return [1, DOTS, ...middleRange, DOTS, totalPages];
}

export default function Pagination({
  currentPage,
  totalPages,
  siblingCount = 1,
}: Props) {
  const [searchParams] = useSearchParams();

  if (totalPages <= 1) return null;

  const items = getPagination(currentPage, totalPages, siblingCount).filter(
    (v, i, a) => i === 0 || v !== a[i - 1]
  );

  // helper to keep all other query params but replace "page"
  const makeHref = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    return `?${params.toString()}`;
  };

  return (
    <nav aria-label="Pagination" className="flex gap-2 items-center">
      <Link
        to={makeHref(Math.max(1, currentPage - 1))}
        aria-disabled={currentPage === 1}
        className={`px-3 py-1 border rounded-full ${
          currentPage === 1
            ? "pointer-events-none opacity-50"
            : "hover:bg-gray-200"
        }`}
      >
        Prev
      </Link>

      {items.map((it, idx) =>
        it === DOTS ? (
          <span key={`dots-${idx}`} className="px-2 select-none">
            {DOTS}
          </span>
        ) : (
          <Link
            key={`p-${it}`}
            to={makeHref(it)}
            aria-current={currentPage === it ? "page" : undefined}
            className={`h-8 w-8 flex items-center justify-center border rounded-full ${
              currentPage === it
                ? "bg-black text-white border-black"
                : "border-[#201815] hover:bg-gray-200"
            }`}
          >
            {it}
          </Link>
        )
      )}

      <Link
        to={makeHref(Math.min(totalPages, currentPage + 1))}
        aria-disabled={currentPage === totalPages}
        className={`px-3 py-1 border rounded-full ${
          currentPage === totalPages
            ? "pointer-events-none opacity-50"
            : "hover:bg-gray-200"
        }`}
      >
        Next
      </Link>
    </nav>
  );
}
