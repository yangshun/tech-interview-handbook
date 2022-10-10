import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import type { PDFDocumentProxy } from 'react-pdf/node_modules/pdfjs-dist';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button, Spinner } from '@tih/ui';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

type Props = Readonly<{
  url: string;
}>;

export default function ResumePdf({ url }: Props) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const onPdfLoadSuccess = (pdf: PDFDocumentProxy) => {
    setNumPages(pdf.numPages);
  };

  return (
    <div>
      <Document
        className="flex h-[calc(100vh-17rem)] flex-row justify-center overflow-scroll"
        file={url}
        loading={<Spinner display="block" label="" size="lg" />}
        noData=""
        onLoadSuccess={onPdfLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>

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
