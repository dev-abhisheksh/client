import React from 'react';
import Button from './Button';

export default function Hero({
  variant = 'dk',
  eyebrow,
  title,
  subtitle,
  description,
  actions = [],
  face = '🧒',
  children,
}) {
  return (
    <section className={`hero ${variant}`}>
      <div className="w grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-5 items-center relative z-10">
        <div className="hero-animate">
          {eyebrow && <div className="eb">{eyebrow}</div>}
          {title && <h1>{title}</h1>}
          {subtitle && <em>{subtitle}</em>}
          {description && <p>{description}</p>}

          {actions && actions.length > 0 && (
            <div className="flex gap-3 flex-wrap mt-4">
              {actions.map((btn, index) => (
                <Button
                  key={index}
                  variant={btn.variant}
                  target={btn.target}
                  href={btn.href}
                  onClick={btn.onClick}
                >
                  {btn.label || btn.text}
                </Button>
              ))}
            </div>
          )}

          {children}
        </div>

        {face && (
          <div className="face" aria-hidden="true">
            {face}
          </div>
        )}
      </div>
    </section>
  );
}
