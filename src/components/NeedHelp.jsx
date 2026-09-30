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
        <div className="hp">
          <div style={{ maxWidth: '540px' }}>
            <h2>{title}</h2>
            <p>{description}</p>

            <div className="chips">
              {topics.map((topic, index) => (
                <button
                  key={index}
                  type="button"
                  className={`chip ${selectedTopic === topic ? 'on' : ''}`}
                  onClick={() => setSelectedTopic(topic)}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              minWidth: '260px',
            }}
          >
            <Button href={emailHref} variant="default">
              {emailButtonText}
            </Button>
            <Button
              href={whatsappHref}
              variant="green"
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
