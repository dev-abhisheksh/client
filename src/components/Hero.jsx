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
      <div className="w grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-6 sm:gap-8 items-center relative z-10">
        <div className="hero-animate">
          {eyebrow && <div className="eb mb-1 sm:mb-2">{eyebrow}</div>}
          {title && <h1 className="tracking-tight">{title}</h1>}
          {subtitle && <em>{subtitle}</em>}
          {description && (
            <p className="text-[14px] sm:text-[15px] leading-relaxed max-w-[560px] text-white/90">
              {description}
            </p>
          )}

          {actions && actions.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 mt-5 w-full sm:w-auto">
              {actions.map((btn, index) => (
                <Button
                  key={index}
                  variant={btn.variant}
                  target={btn.target}
                  href={btn.href}
                  onClick={btn.onClick}
                  className="w-full sm:w-auto text-center"
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
