import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import type { PDFDocumentProxy } from 'react-pdf/node_modules/pdfjs-dist';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button, Spinner } from '@tih/ui';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function ResumePdf() {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber] = useState(1);

  const onPdfLoadSuccess = (pdf: PDFDocumentProxy) => {
    setNumPages(pdf.numPages);
  };

  return (
    <div>
      <Document
        className="h-[calc(100vh-17rem)] overflow-scroll"
        file="/test_resume.pdf"
        loading={<Spinner display="block" label="" size="lg" />}
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
        />
        <p className="text-md text-gray-600">
          Page {pageNumber} of {numPages}
        </p>
        <Button
          disabled={pageNumber === numPages}
          icon={ArrowRightIcon}
          isLabelHidden={true}
          label="Next"
          variant="tertiary"
        />
      </div>
    </div>
  );
}
