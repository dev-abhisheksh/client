import { useState } from 'react';
import { specialProjectsContent } from '../data/siteData';

/**
 * Reusable Special Projects Component
 *
 * Props:
 * - title: Section heading (defaults to "Our Special Projects")
 * - subtitle: Section description
 * - projects: Array of special project objects (defaults to Manipur project)
 *
 * To add images:
 * 1. Add image URLs to the project's `images` array in siteData.js or props.
 * 2. Or click any "+ Image Space" box below to preview an image directly.
 */

// Default special project data with Manipur
const defaultProjects = specialProjectsContent?.projects || [
  {
    id: 'manipur',
    title: 'Manipur',
    badge: 'Special Relief Project',
    description:
      'Standing alongside vulnerable families and displaced communities in Manipur with critical relief supplies, food assistance, student education support, and rehabilitation care.',
    // Add image URLs or paths here, e.g. ['/images/manipur-1.jpg', 'https://...']
    images: [],
    // Number of empty image placeholder slots to display
    emptySlotsCount: 4,
  },
];

// Reusable card for a single special project
export function SpecialProjectCard({ project }) {
  const [images, setImages] = useState(project.images || []);

  // Simple handler to preview a selected local image
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImages((prev) => [...prev, previewUrl]);
    }
  };

  const emptySlotsCount = project.emptySlotsCount ?? 4;
  // If no images exist, show emptySlotsCount placeholders.
  // If images exist, show 1 additional "+ Add Image" slot.
  const slotsToShow =
    images.length === 0
      ? Array.from({ length: emptySlotsCount })
      : Array.from({ length: 1 });

  return (
    <div className="bg-[var(--card)] border border-[var(--ln)] rounded-3xl p-6 sm:p-10 shadow-sm transition-all duration-300">
      {/* 1. Project Title & Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div>
          {project.badge && (
            <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 mb-2">
              {project.badge}
            </span>
          )}
          <h3 className="text-2xl sm:text-3xl font-bold text-[var(--tx)] tracking-tight">
            {project.title}
          </h3>
        </div>

        {images.length > 0 && (
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[var(--soft)] text-[var(--mu)] self-start sm:self-center">
            {images.length} {images.length === 1 ? 'Photo' : 'Photos'}
          </span>
        )}
      </div>

      {/* 2. Project Description */}
      {project.description && (
        <p className="text-[14px] sm:text-[15px] text-[var(--mu)] leading-relaxed max-w-3xl mb-8">
          {project.description}
        </p>
      )}

      {/* 3. Space to Add Images (Image Gallery & Placeholder Slots) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--mu)] flex items-center gap-2">
            <span>📷 Project Gallery</span>
          </h4>
          <span className="text-xs text-[var(--mu)] italic">
            Space to add images
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* A. Render Existing / Added Images */}
          {images.map((img, idx) => {
            const url = typeof img === 'string' ? img : img?.url;
            const caption = typeof img === 'object' ? img?.caption : null;

            return (
              <div
                key={`img-${idx}`}
                className="group relative rounded-2xl overflow-hidden border border-[var(--ln)] bg-[var(--soft)] aspect-4/3 sm:aspect-square flex flex-col justify-end shadow-sm hover:shadow-md transition-all duration-300"
              >
                <img
                  src={url}
                  alt={`${project.title} image ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {caption && (
                  <div className="absolute inset-x-0 bottom-0 p-2 text-xs text-white bg-gradient-to-t from-black/80 to-transparent">
                    {caption}
                  </div>
                )}
              </div>
            );
          })}

          {/* B. Render Space / Placeholder Slots to Add Images */}
          {slotsToShow.map((_, idx) => (
            <label
              key={`slot-${idx}`}
              className="relative rounded-2xl border-2 border-dashed border-[var(--ln)] hover:border-amber-400 bg-[var(--soft)]/40 hover:bg-[var(--soft)] aspect-4/3 sm:aspect-square flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-all duration-300 group"
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <div className="w-12 h-12 rounded-full bg-[var(--card)] border border-[var(--ln)] flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 group-hover:border-amber-400 transition-all">
                <svg
                  className="w-5 h-5 text-[var(--mu)] group-hover:text-amber-500 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <span className="text-xs font-semibold text-[var(--tx)] group-hover:text-amber-500 transition-colors">
                {images.length === 0 ? `Image Space ${idx + 1}` : 'Add Another Image'}
              </span>
              <span className="text-[11px] text-[var(--mu)] mt-0.5">
                Click to add or drop photo
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

// Main Reusable Component for Special Projects Section
export default function SpecialProjects({
  title = 'Our Special Projects',
  subtitle = 'Focused regional relief and targeted initiatives responding to urgent humanitarian needs.',
  projects = defaultProjects,
}) {
  return (
    <section className="sec">
      <div className="w">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="c">{title}</h2>
          {subtitle && (
            <p className="text-[14px] sm:text-[15px] text-[var(--mu)] leading-relaxed mt-2">
              {subtitle}
            </p>
          )}
        </div>

        {/* List of Special Projects */}
        <div className="flex flex-col gap-8">
          {projects.map((project) => (
            <SpecialProjectCard
              key={project.id || project.title}
              project={project}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
