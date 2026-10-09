import React from 'react';

export default function NeedHelp() {
  return (
    <section className="sec" id="help">
      <div className="w">
        <div className="hp flex-row flex-nowrap items-center p-5 sm:p-8 gap-6 transform-gpu">
          {/* Proof / Certificate Image */}
          <img
            src="https://res.cloudinary.com/dhdegqchc/image/upload/v1791467313/demo.jpg"
            alt="Government Proof Documents"
            className="w-full flex-1 rounded-xl object-contain"
          />

          {/* Certificate Links — right side */}
          <div className="flex flex-col items-center gap-4 w-auto min-w-[220px] shrink-0">
            <a
              href="https://drive.google.com/file/d/1_1bMqvDZRM6U__pCkXnNMSoleIsjKjzv/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg border border-[var(--bd)] bg-[var(--bg2)] px-6 py-3 text-[15px] font-medium text-[var(--tx)] transition-colors hover:bg-[var(--ac)] hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              12 A Certificate
            </a>

            <a
              href="https://drive.google.com/file/d/1ueqzbz5eOhv3L3bNhFPV3nI8TA4BQAHU/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg border border-[var(--bd)] bg-[var(--bg2)] px-6 py-3 text-[15px] font-medium text-[var(--tx)] transition-colors hover:bg-[var(--ac)] hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              80 G Certificate
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
