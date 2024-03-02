import Filter from "@/app/ui/filter";
import BrowseFiles from "@/app/ui/media/browse-files";
import { Suspense } from "react";

import FileShowCase from "@/app/ui/media/file-showcase";
import {
  fetchFilePages,
  retrieveImageTypes,
  retrieveImages,
} from "@/app/lib/data";

export default async function Media({ searchParams }) {
  const imageTitle = searchParams?.title || "";
  const imageType = searchParams?.type || "";
  const imageTime = searchParams?.time || "";
  const currentPage = searchParams?.page || 1;
  const files = await retrieveImages(
    imageTitle,
    imageType,
    imageTime,
    currentPage - 1
  );
  const types = await retrieveImageTypes();
  const totalPages = await fetchFilePages(imageTitle, imageType, imageTime);
  return (
    <>
      <BrowseFiles />
      <Suspense>
        <Filter first={JSON.parse(types)} />
      </Suspense>
      <FileShowCase files={JSON.parse(files)} totalPages={totalPages} />
    </>
  );
}
