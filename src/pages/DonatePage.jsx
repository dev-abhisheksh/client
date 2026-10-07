import React from 'react';
import Hero from '../components/Hero';
import Button from '../components/Button';
import CopyButton from '../components/CopyButton';
import NeedHelp from '../components/NeedHelp';
import ImpactStrip from '../components/ImpactStrip';
import { donateContent } from '../data/siteData';
import { usePageHero } from '../hooks';
import { HeroBackground, HeroControls } from '../components/ProjectMediaViewer';

export default function DonatePage({ onNavigate }) {
  const { hero, bank, upi, taxCertificates, receipt } = donateContent;
  const heroMedia = usePageHero('donate');

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
    <div className="donate-page">
      {/* 1. Hero Section */}
      <Hero
        variant="dk"
        eyebrow={hero.eyebrow}
        title={hero.title}
        subtitle={hero.subtitle}
        description={hero.description}
        actions={[
          {
            label: 'Donate Now →',
            target: 'pay',
            variant: 'red',
            onClick: (e) => handleNavClick(e, 'pay'),
          },
          {
            label: 'Request a Receipt →',
            target: 'rcpt',
            variant: 'white-outline',
            onClick: (e) => handleNavClick(e, 'rcpt'),
          },
        ]}
        face={heroMedia.hasPhotos ? null : hero.avatar}
        bgMedia={
          heroMedia.hasPhotos ? (
            <HeroBackground
              photos={heroMedia.photos}
              viewMode={heroMedia.mediaMode}
              activeIndex={heroMedia.activeIndex}
              title={hero.title}
            />
          ) : null
        }
        media={
          heroMedia.isAdmin ? (
            <HeroControls
              photos={heroMedia.photos}
              viewMode={heroMedia.mediaMode}
              setViewMode={heroMedia.handleToggleMediaMode}
              activeIndex={heroMedia.activeIndex}
              setActiveIndex={heroMedia.setActiveIndex}
              onSelectCoverPhoto={heroMedia.handleSelectCoverPhoto}
              onDeletePhoto={heroMedia.handleDeletePhoto}
              isAdmin={heroMedia.isAdmin}
              isSaving={heroMedia.isSaving}
              onUploadPhoto={heroMedia.handleUploadPhoto}
              isUploading={heroMedia.isUploading}
            />
          ) : null
        }
      />

      {/* 2. Bank Transfer & Scan to Donate Section */}
      <section className="sec">
        <div className="w grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Column 1: Bank Transfer Card */}
          <div className="bank flex flex-col justify-between">
            <div>
              <div className="bt select-none" aria-hidden="true">
                🏦
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif mb-4">
                {bank.title}
              </h2>

              <div className="bf">
                <small>Account Name</small>
                <div>
                  <b>{bank.accountName}</b>
                  <CopyButton text={bank.accountName} />
                </div>
              </div>

              <div className="bf">
                <small>Bank</small>
                <div>
                  <b>{bank.bank}</b>
                  <CopyButton text={bank.bank} />
                </div>
              </div>

              <div className="bf">
                <small>Account No.</small>
                <div>
                  <b>{bank.accountNo}</b>
                  <CopyButton text={bank.accountNo} />
                </div>
              </div>

              <hr />

              <div className="bf">
                <small>Branch</small>
                <div>
                  <b>{bank.branch}</b>
                  <CopyButton text={bank.branch} />
                </div>
              </div>

              <div className="bf">
                <small>RTGS / NEFT IFS Code</small>
                <div>
                  <b>{bank.ifsc}</b>
                  <CopyButton text={bank.ifsc} />
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/20 text-xs text-white/80">
              Direct transfer via IMPS, NEFT, RTGS or net banking accepted.
            </div>
          </div>

          {/* Column 2: Scan to Donate UPI Card */}
          <div className="cd scan flex flex-col justify-between">
            <div>
              <div className="qi select-none" aria-hidden="true">
                ▦
              </div>
              <h2 className="c text-2xl sm:text-3xl font-bold font-serif mb-2">
                Scan to Donate
              </h2>
              <p className="c text-[13.5px] sm:text-[14.5px] text-[var(--mu)] leading-relaxed max-w-sm mx-auto mb-6">
                Use any UPI app (Google Pay, PhonePe, Paytm, BHIM) to donate quickly and securely.
              </p>

              <div className="bf bg-[var(--soft)]/70 p-3.5 rounded-xl border border-[var(--ln)]">
                <small className="text-[var(--mu)]">UPI ID</small>
                <div>
                  <b className="text-[var(--nv)] text-base sm:text-lg select-all">
                    {upi.upiId}
                  </b>
                  <CopyButton
                    text={upi.upiId}
                    className="bg-[var(--soft)] text-[var(--bl)] border-[var(--ln)]"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button
                target="pay"
                variant="red"
                className="w-full text-center justify-center py-3 text-sm shadow-md"
                onClick={(e) => handleNavClick(e, 'pay')}
              >
                PAY WITH UPI APP →
              </Button>
              <small className="block text-center text-xs text-[var(--mu)] mt-2">
                Tap to open QR code scanner or mobile app direct link
              </small>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Tax Certifications (80G, Darpan ID, Registration) */}
      <section className="sec soft" style={{ padding: '40px 0' }}>
        <div className="w st">
          {taxCertificates.map((cert, idx) => (
            <div key={idx} className="my-2">
              <b>{cert.label}</b>
              <span className="text-[13.5px] sm:text-[14.5px] text-[var(--mu)]">
                {cert.value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Need a Receipt? WhatsApp Section */}
      <section className="sec">
        <div className="w">
          <div className="rc">
            <div className="max-w-xl">
              <h2 className="text-2xl font-bold font-serif mb-2">
                {receipt.title}
              </h2>
              <p className="text-[14px] text-[var(--tx)]/90 leading-relaxed mb-3">
                {receipt.desc}
              </p>
              <ol className="list-decimal pl-5 space-y-1 text-[13.5px] text-[var(--tx)]/85">
                {receipt.steps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </div>

            <div>
              <a
                href={receiptWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn text-center justify-center shadow-md hover:scale-105"
                style={{ backgroundColor: 'var(--gr)', borderColor: 'var(--gr)' }}
              >
                💬 REQUEST RECEIPT ON WHATSAPP →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Need Help Interactive Chips Section */}
      <NeedHelp />

      {/* 6. Closing Impact Strip */}
      <ImpactStrip />
    </div>
  );
}
