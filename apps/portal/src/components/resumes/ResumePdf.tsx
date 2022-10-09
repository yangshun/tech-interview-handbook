import axios from 'axios';
import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import type { PDFDocumentProxy } from 'react-pdf/node_modules/pdfjs-dist';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button, Spinner } from '@tih/ui';

import { RESUME_STORAGE_KEY } from '~/constants/file-storage-keys';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

type Props = Readonly<{
  url: string;
}>;

export default function ResumePdf({ url }: Props) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber] = useState(1);
  const [file, setFile] = useState<File>();

  const onPdfLoadSuccess = (pdf: PDFDocumentProxy) => {
    setNumPages(pdf.numPages);
  };

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(`/api/file-storage?key=${RESUME_STORAGE_KEY}&url=${url}`, {
          responseType: 'blob',
        })
        .then((res) => {
          setFile(res.data);
        });
    }
    fetchData();
  }, [url]);

  return (
    <div>
      <Document
        className="h-[calc(100vh-17rem)] overflow-scroll"
        file={file}
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
