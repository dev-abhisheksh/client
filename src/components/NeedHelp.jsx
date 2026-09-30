import React, { useState } from 'react';
import { homeContent, siteConfig } from '../data/siteData';
import Button from './Button';

export default function NeedHelp() {
  const { title, description, topics, emailButtonText, whatsappButtonText } =
    homeContent.help;
  const { email, whatsappHelp } = siteConfig.contact;

  const [selectedTopic, setSelectedTopic] = useState(topics[0] || 'General query');

  const buildBody = (topic) =>
    `Hello Bethesda Charitable Trust,\nI need help with: ${topic}.\n\nName: \nPhone: \nMy question / request: \n\nThank you.`;

  const emailHref = `mailto:${email}?subject=${encodeURIComponent(
    `Help request: ${selectedTopic}`
  )}&body=${encodeURIComponent(buildBody(selectedTopic))}`;

  const whatsappHref = `https://wa.me/${whatsappHelp}?text=${encodeURIComponent(
    buildBody(selectedTopic)
  )}`;

  return (
    <section className="sec" id="help">
      <div className="w">
        <div className="hp flex-col lg:flex-row items-stretch lg:items-center p-5 sm:p-8">
          {/* Left Content & Topic Chips */}
          <div className="w-full lg:max-w-[540px]">
            <h2 className="text-[22px] sm:text-[26px]">{title}</h2>
            <p className="text-[14px] sm:text-[15px] leading-relaxed text-[var(--mu)]">
              {description}
            </p>

            <div className="chips flex flex-wrap gap-2 my-4">
              {topics.map((topic, index) => (
                <button
                  key={index}
                  type="button"
                  className={`chip text-xs sm:text-[13px] py-2 px-3.5 transition-all ${
                    selectedTopic === topic ? 'on' : ''
                  }`}
                  onClick={() => setSelectedTopic(topic)}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-col gap-3 w-full lg:w-auto min-w-full sm:min-w-[260px] mt-2 lg:mt-0">
            <Button
              href={emailHref}
              variant="default"
              className="w-full text-center justify-center py-3"
            >
              {emailButtonText}
            </Button>
            <Button
              href={whatsappHref}
              variant="green"
              className="w-full text-center justify-center py-3"
              style={{
                backgroundColor: 'var(--gr)',
                borderColor: 'var(--gr)',
              }}
            >
              {whatsappButtonText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
