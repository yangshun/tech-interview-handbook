import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import {
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
} from '@heroicons/react/20/solid';

import { Button, Pagination, Spinner } from '~/ui';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

type Props = Readonly<{
  url: string;
}>;

export default function ResumePdf({ url }: Props) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageWidth, setPageWidth] = useState(750);
  const [componentWidth, setComponentWidth] = useState(780);

  const onPageResize = () => {
    setComponentWidth(
      document.querySelector('#pdfView')?.getBoundingClientRect().width ?? 780,
    );
  };

  useEffect(() => {
    onPageResize();
  }, [pageWidth]);

  return (
    <div
      className="w-full flex-col overflow-y-auto lg:flex lg:h-full"
      id="pdfView">
      <div className="group relative grow bg-slate-100 lg:h-0">
        <Document
          className="flex flex-row justify-center overflow-auto py-8 lg:h-full"
          file={url}
          loading={<Spinner display="block" size="lg" />}
          noData=""
          onLoadSuccess={(pdf) => {
            setNumPages(pdf.numPages);
          }}>
          <div
            style={{
              paddingLeft: clsx(
                pageWidth > componentWidth
                  ? `${pageWidth - componentWidth}px`
                  : '',
              ),
            }}>
            <Page
              pageNumber={pageNumber}
              renderTextLayer={false}
              width={pageWidth}
            />
          </div>
          <div className="absolute top-2 right-5 hidden hover:block group-hover:block">
            <Button
              className="rounded-r-none focus:ring-0 focus:ring-offset-0"
              disabled={pageWidth === 450}
              icon={MagnifyingGlassMinusIcon}
              isLabelHidden={true}
              label="Zoom Out"
              variant="tertiary"
              onClick={() => setPageWidth(pageWidth - 150)}
            />
            <Button
              className="rounded-l-none focus:ring-0 focus:ring-offset-0"
              disabled={pageWidth === 1050}
              icon={MagnifyingGlassPlusIcon}
              isLabelHidden={true}
              label="Zoom In"
              variant="tertiary"
              onClick={() => setPageWidth(pageWidth + 150)}
            />
          </div>
        </Document>
      </div>
      <div className="flex justify-center border-t border-slate-200 bg-white py-4">
        <Pagination
          current={pageNumber}
          end={numPages}
          label="pagination"
          start={1}
          onSelect={(page) => setPageNumber(page)}
        />
      </div>
    </div>
  );
}
