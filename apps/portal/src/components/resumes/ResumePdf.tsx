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
    <div className="mb-12 h-screen">
      <Document
        file="/test_resume.pdf"
        loading={<Spinner display="block" label="" size="lg" />}
        onLoadSuccess={onPdfLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>

      <div className="m-4 flex h-10 flex-row items-center justify-between">
        <Button
          icon={ArrowLeftIcon}
          isDisabled={pageNumber === 1}
          isLabelHidden={true}
          label="Previous"
          variant="tertiary"
        />
        <p className="text-md text-gray-600">
          Page {pageNumber} of {numPages}
        </p>
        <Button
          icon={ArrowRightIcon}
          isDisabled={pageNumber === numPages}
          isLabelHidden={true}
          label="Next"
          variant="tertiary"
        />
      </div>
    </div>
  );
}
