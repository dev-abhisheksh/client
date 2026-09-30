import React from 'react';

/**
 * Reusable Button Component with luxury glassmorphic shine and pointer tracking
 *
 * @param {string} variant - 'default' (blue), 'gold' ('g'), 'white-outline' ('wo'), 'white-solid' ('w2'), 'outline' ('o'), 'green' ('gr')
 * @param {string} target - Page id to navigate to (e.g., 'about', 'donate')
 * @param {string} href - External URL or mailto/wa link
 * @param {function} onClick - Click handler
 * @param {React.ReactNode} children - Button text or children
 * @param {string} className - Additional CSS classes
 */
export default function Button({
  variant = 'default',
  target,
  href,
  onClick,
  children,
  className = '',
  ...props
}) {
  const getVariantClass = () => {
    switch (variant) {
      case 'gold':
      case 'g':
        return 'g';
      case 'white-outline':
      case 'wo':
        return 'wo';
      case 'white-solid':
      case 'w2':
        return 'w2';
      case 'outline':
      case 'o':
        return 'o';
      case 'green':
      case 'gr':
        return 'gr';
      default:
        return '';
    }
  };

  const handlePointerMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  const handleClick = (e) => {
    if (target) {
      e.preventDefault();
      window.location.hash = target;
    }
    if (onClick) {
      onClick(e);
    }
  };

  const combinedClass = `btn ${getVariantClass()} ${className}`.trim();

  if (href) {
    return (
      <a
        href={href}
        className={combinedClass}
        target="_blank"
        rel="noopener noreferrer"
        onPointerMove={handlePointerMove}
        onClick={onClick}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      href={target ? `#${target}` : undefined}
      className={combinedClass}
      onPointerMove={handlePointerMove}
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  );
}
