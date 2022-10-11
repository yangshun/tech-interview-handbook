import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import type { PDFDocumentProxy } from 'react-pdf/node_modules/pdfjs-dist';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
} from '@heroicons/react/20/solid';
import { Button, Spinner } from '@tih/ui';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

type Props = Readonly<{
  url: string;
}>;

export default function ResumePdf({ url }: Props) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);

  const onPdfLoadSuccess = (pdf: PDFDocumentProxy) => {
    setNumPages(pdf.numPages);
  };

  return (
    <div>
      <div className="group relative">
        <Document
          className="flex h-[calc(100vh-17rem)] flex-row justify-center overflow-auto"
          file={url}
          loading={<Spinner display="block" size="lg" />}
          noData=""
          onLoadSuccess={onPdfLoadSuccess}>
          <Page pageNumber={pageNumber} scale={scale} width={750} />
          <div className="absolute top-2 right-5 hidden hover:block group-hover:block">
            <Button
              className="rounded-r-none focus:ring-0 focus:ring-offset-0"
              disabled={scale === 0.5}
              icon={MagnifyingGlassMinusIcon}
              isLabelHidden={true}
              label="Zoom Out"
              variant="tertiary"
              onClick={() => setScale(scale - 0.25)}
            />
            <Button
              className="rounded-l-none focus:ring-0 focus:ring-offset-0"
              disabled={scale === 1.5}
              icon={MagnifyingGlassPlusIcon}
              isLabelHidden={true}
              label="Zoom In"
              variant="tertiary"
              onClick={() => setScale(scale + 0.25)}
            />
          </div>
        </Document>
      </div>

      <div className="flex flex-row items-center justify-between p-4">
        <Button
          disabled={pageNumber === 1}
          icon={ArrowLeftIcon}
          isLabelHidden={true}
          label="Previous"
          variant="tertiary"
          onClick={() => setPageNumber(pageNumber - 1)}
        />
        <p className="text-md text-gray-600">
          Page {pageNumber} of {numPages}
        </p>
        <Button
          disabled={pageNumber >= numPages}
          icon={ArrowRightIcon}
          isLabelHidden={true}
          label="Next"
          variant="tertiary"
          onClick={() => setPageNumber(pageNumber + 1)}
        />
      </div>
    </div>
  );
}
