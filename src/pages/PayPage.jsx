import React from 'react';
import Button from '../components/Button';
import CopyButton from '../components/CopyButton';
import QrCodeSvg from '../components/QrCodeSvg';
import { donateContent } from '../data/siteData';

export default function PayPage({ onNavigate }) {
  const { upi, receipt } = donateContent;

  const receiptWhatsappUrl = `https://wa.me/${receipt.whatsappNumber}?text=${encodeURIComponent(receipt.whatsappMessage)}`;

  const handleNavClick = (e, target) => {
    e.preventDefault();
    if (target === 'rcpt') {
      window.open(receiptWhatsappUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    if (onNavigate) {
      onNavigate(target);
    } else {
      window.location.hash = target;
    }
  };

  return (
    <div className="pay-page py-12 sm:py-16 bg-[var(--soft)]/50 min-h-[85vh] flex items-center justify-center">
      <div className="w w-full" style={{ maxWidth: '580px' }}>
        <div className="cd scan bg-[var(--card)] p-6 sm:p-10 shadow-2xl border border-[var(--ln)] rounded-3xl">
          <div className="qi select-none text-2xl mb-3" aria-hidden="true">
            ▦
          </div>

          <h2 className="c text-2xl sm:text-3xl font-bold font-serif mb-2">
            Scan to Donate
          </h2>

          <p className="c text-[13.5px] sm:text-[14.5px] text-[var(--mu)] leading-relaxed max-w-sm mx-auto mb-5">
            Open GPay, PhonePe, Paytm, BHIM or any UPI app on your phone and scan this QR code to donate securely.
          </p>

          {/* High-Resolution Vector UPI QR Code */}
          <div
            className="qr mx-auto my-4 p-4 bg-white rounded-2xl shadow-lg border border-[var(--ln)] flex items-center justify-center"
            style={{ width: 'min(290px, 80vw)', height: 'min(290px, 80vw)' }}
          >
            <QrCodeSvg className="w-full h-full block" />
          </div>

          <p className="font-bold text-[16px] text-[var(--nv)] m-0 mb-3">
            {upi.orgName}
          </p>

          {/* Copyable UPI ID Box */}
          <div className="bf bg-[var(--soft)]/70 p-3 rounded-xl border border-[var(--ln)] max-w-xs mx-auto mb-5">
            <small className="text-[var(--mu)] block mb-1">UPI ID</small>
            <div className="flex items-center justify-between">
              <b className="text-[var(--nv)] text-sm sm:text-base select-all">
                {upi.upiId}
              </b>
              <CopyButton
                text={upi.upiId}
                className="bg-[var(--soft)] text-[var(--bl)] border-[var(--ln)]"
              />
            </div>
          </div>

          {/* Deep link direct launch for mobile devices */}
          <a
            className="btn g w-full text-center justify-center py-3 text-sm font-bold shadow-md block mb-4"
            id="upi"
            href={upi.payUrl}
          >
            OPEN UPI APP (ON MOBILE) →
          </a>

          {/* Bottom Actions */}
          <div className="flex gap-3 justify-center flex-wrap pt-2 border-t border-[var(--ln)]/60">
            <Button
              target="donate"
              variant="outline"
              onClick={(e) => handleNavClick(e, 'donate')}
            >
              ← Back to Donate
            </Button>
            <Button
              target="rcpt"
              variant="default"
              onClick={(e) => handleNavClick(e, 'rcpt')}
            >
              Request Receipt 💬
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
