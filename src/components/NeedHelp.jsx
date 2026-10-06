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
        <div className="hp flex-col lg:flex-row items-stretch lg:items-center p-5 sm:p-8 transform-gpu">
          {/* Left Content & Topic Chips */}
          <div className="w-full lg:max-w-[540px]">
            <h2 className="text-[22px] sm:text-[26px]">{title}</h2>
            <p className="text-[14px] sm:text-[15px] leading-relaxed text-[var(--mu)]">
              {description}
            </p>

            {/* Symmetrical, perfectly aligned grid on smaller screens */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap gap-2 sm:gap-2.5 my-4 sm:my-5 w-full">
              {topics.map((topic, index) => (
                <button
                  key={index}
                  type="button"
                  className={`chip w-full lg:w-auto text-center flex items-center justify-center text-[12px] sm:text-[13px] py-2.5 px-2.5 sm:px-4 transition-colors duration-150 ${
                    selectedTopic === topic ? 'on shadow-sm' : ''
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
