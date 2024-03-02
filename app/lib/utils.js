import { revalidatePath } from "next/cache";

export function generatePagination(currentPage, totalPages) {
  const page = currentPage + 1;
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (page > 5 && page < totalPages - 2) {
    return [page - 4, page - 3, page - 2, page - 1, page, "---", totalPages];
  }

  if (page > 5 && page >= totalPages - 2) {
    return [
      totalPages - 6,
      totalPages - 5,
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [1, 2, 3, 4, 5, "---", totalPages];
}

export async function newVersionCheck() {
  const response = await fetch("http://localhost:3004/version", {
    cache: "no-store",
  });

  return await response.text();
}

export async function versionCheck() {
  const currentVersion = "1.0.0";
  const data = await newVersionCheck();

  if (data !== currentVersion) {
    return true;
  } else {
    return false;
  }
}
