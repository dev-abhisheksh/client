import { useState } from 'react';
import { specialProjectsContent } from '../data/siteData';
import {
  useSpecialProjects,
  useCreateSpecialProject,
  useUpdateSpecialProject,
  useDeleteSpecialProject,
  useUploadSpecialProjectPhoto,
  useDeleteSpecialProjectPhoto,
} from '../hooks';
import { useAuth } from '../context/AuthContext';
import { optimizeCloudinaryUrl } from '../utils/cloudinary';

/**
 * Reusable Special Projects Component
 *
 * Connects with backend for uploading and deleting gallery photos via Cloudinary,
 * as well as creating, editing, and deleting special projects dynamically (Admin only).
 * Visitors see a clean, public-facing view of all special projects.
 */

// Default special project data with Manipur
const defaultProjects = specialProjectsContent?.projects || [
  {
    id: 'manipur',
    slug: 'manipur',
    title: 'Manipur',
    badge: 'Special Relief Project',
    description:
      'Standing alongside vulnerable families and displaced communities in Manipur with critical relief supplies, food assistance, student education support, and rehabilitation care.',
    images: [],
    emptySlotsCount: 4,
  },
];

// Reusable card for a single special project
export function SpecialProjectCard({ project, onEditProject, onDeleteProject }) {
  const { isAdmin } = useAuth();

  const uploadPhotoMutation = useUploadSpecialProjectPhoto();
  const deletePhotoMutation = useDeleteSpecialProjectPhoto();

  // Combine database photos (from backend) and fallback images
  const dbPhotos = (project.photos || []).map((p) => ({
    _id: p._id,
    url: p.url,
    publicId: p.publicId,
  }));

  const staticPhotos = (project.images || []).map((img) =>
    typeof img === 'string' ? { url: img } : img
  );

  const allPhotos = [...dbPhotos, ...staticPhotos];

  const projectId = project._id || project.slug || project.id || 'manipur';
  const isUploading = uploadPhotoMutation.isPending;

  // Handle image upload through backend (Admin only - supports multi-upload)
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length || !isAdmin) return;

    uploadPhotoMutation.mutate(
      { id: projectId, files },
      {
        onError: (err) => {
          alert('Upload failed: ' + (err.message || 'Error uploading photo(s)'));
        },
      }
    );

    e.target.value = '';
  };

  // Handle photo deletion (Admin only)
  const handleDeletePhoto = (photo) => {
    if (!isAdmin || !photo._id) return;

    if (window.confirm('Are you sure you want to delete this photo from the special project?')) {
      deletePhotoMutation.mutate(
        { id: projectId, photoId: photo._id },
        {
          onError: (err) => {
            alert('Delete failed: ' + (err.message || 'Error deleting photo'));
          },
        }
      );
    }
  };

  const emptySlotsCount = project.emptySlotsCount ?? 4;
  const slotsToShow =
    allPhotos.length === 0
      ? Array.from({ length: emptySlotsCount })
      : Array.from({ length: 1 });

  return (
    <div className="bg-[var(--card)] border border-[var(--ln)] rounded-3xl p-6 sm:p-10 shadow-sm transition-all duration-300">
      {/* 1. Project Title & Admin Controls */}
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

        <div className="flex items-center gap-2 flex-wrap self-start sm:self-center">
          {isAdmin && (
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
              Admin Mode
            </span>
          )}

          {allPhotos.length > 0 && (
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[var(--soft)] text-[var(--mu)]">
              {allPhotos.length} {allPhotos.length === 1 ? 'Photo' : 'Photos'}
            </span>
          )}

          {/* Edit Project Button (Admin only) */}
          {isAdmin && onEditProject && (
            <button
              type="button"
              onClick={() => onEditProject(project)}
              title="Edit Project Details"
              className="text-[11px] font-semibold text-amber-500 hover:text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 px-2.5 py-1 rounded-full border border-amber-500/25 transition-colors cursor-pointer"
            >
              ✏️ Edit
            </button>
          )}

          {/* Delete Project Button (Admin only) */}
          {isAdmin && onDeleteProject && (
            <button
              type="button"
              onClick={() => onDeleteProject(project)}
              title="Delete Project"
              className="text-[11px] font-semibold text-red-500 hover:text-red-700 bg-red-500/10 hover:bg-red-500/20 px-2.5 py-1 rounded-full border border-red-500/25 transition-colors cursor-pointer"
            >
              🗑 Delete
            </button>
          )}
        </div>
      </div>

      {/* 2. Project Description */}
      {project.description && (
        <p className="text-[14px] sm:text-[15px] text-[var(--mu)] leading-relaxed max-w-3xl mb-8">
          {project.description}
        </p>
      )}

      {/* 3. Project Gallery */}
      {(allPhotos.length > 0 || isAdmin) && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--mu)] flex items-center gap-2">
              <span>📷 Project Gallery</span>
            </h4>
            {isAdmin && (
              <span className="text-xs text-[var(--mu)] italic">
                Space to add images
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {/* A. Render Uploaded & Existing Photos */}
            {allPhotos.map((photo, idx) => (
              <div
                key={photo._id || `img-${idx}`}
                className="group relative rounded-2xl overflow-hidden border border-[var(--ln)] bg-[var(--soft)] aspect-4/3 sm:aspect-square flex flex-col justify-end shadow-sm hover:shadow-md transition-all duration-300"
              >
                <img
                  src={optimizeCloudinaryUrl(photo.url, { width: 480, quality: 'auto' })}
                  alt={`${project.title} photo ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                />

                {/* Admin Delete Action */}
                {isAdmin && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePhoto(photo);
                    }}
                    title="Delete Photo"
                    className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-red-600/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-700 cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                )}

                {photo.caption && (
                  <div className="absolute inset-x-0 bottom-0 p-2 text-xs text-white bg-gradient-to-t from-black/80 to-transparent">
                    {photo.caption}
                  </div>
                )}
              </div>
            ))}

            {/* B. Render Upload Slots (ADMIN ONLY) */}
            {isAdmin &&
              slotsToShow.map((_, idx) => (
                <label
                  key={`slot-${idx}`}
                  className="relative rounded-2xl border-2 border-dashed border-[var(--ln)] hover:border-amber-400 bg-[var(--soft)]/40 hover:bg-[var(--soft)] aspect-4/3 sm:aspect-square flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-all duration-300 group"
                >
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    disabled={isUploading}
                    className="hidden"
                  />

                  {isUploading ? (
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mb-2" />
                      <span className="text-xs font-semibold text-[var(--tx)]">Uploading to Cloud...</span>
                    </div>
                  ) : (
                    <>
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
                        {allPhotos.length === 0 ? 'Upload Photos (Multi-Select)' : 'Upload More Photos'}
                      </span>
                      <span className="text-[11px] text-[var(--mu)] mt-0.5">
                        Select one or more images
                      </span>
                    </>
                  )}
                </label>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Main Reusable Component for Special Projects Section
export default function SpecialProjects({
  title = 'Our Special Projects',
  subtitle = 'Focused regional relief and targeted initiatives responding to urgent humanitarian needs.',
  projects = defaultProjects,
}) {
  const { isAdmin } = useAuth();
  const { data: dbData } = useSpecialProjects();
  const createProjectMutation = useCreateSpecialProject();
  const updateProjectMutation = useUpdateSpecialProject();
  const deleteProjectMutation = useDeleteSpecialProject();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  // Create Form states
  const [newTitle, setNewTitle] = useState('');
  const [newBadge, setNewBadge] = useState('Special Relief Project');
  const [newDescription, setNewDescription] = useState('');

  // Edit Form states
  const [editTitle, setEditTitle] = useState('');
  const [editBadge, setEditBadge] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const dbProjects = dbData?.data?.projects || [];

  // Merge canonical fallback projects with all database projects
  const displayProjects = [...projects];

  if (Array.isArray(dbProjects) && dbProjects.length > 0) {
    dbProjects.forEach((dbProj) => {
      const idx = displayProjects.findIndex(
        (p) =>
          p.id === dbProj.slug ||
          p.slug === dbProj.slug ||
          p.title?.toLowerCase() === dbProj.title?.toLowerCase() ||
          p._id === dbProj._id
      );
      if (idx !== -1) {
        displayProjects[idx] = { ...displayProjects[idx], ...dbProj };
      } else {
        displayProjects.push(dbProj);
      }
    });
  }

  // Open Edit Modal pre-filled
  const handleOpenEdit = (project) => {
    if (!isAdmin) return;
    setEditingProject(project);
    setEditTitle(project.title || '');
    setEditBadge(project.badge || '');
    setEditDescription(project.description || '');
  };

  // Handle saving edited special project (Admin only)
  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editTitle.trim() || !editingProject || !isAdmin) return;

    const updatedData = {
      title: editTitle.trim(),
      badge: editBadge.trim(),
      description: editDescription.trim(),
    };

    const idToUpdate = editingProject._id || editingProject.slug || editingProject.id;
    updateProjectMutation.mutate(
      { id: idToUpdate, data: updatedData },
      {
        onSuccess: () => {
          setEditingProject(null);
        },
        onError: (err) => {
          alert('Failed to update project: ' + (err.message || 'Error updating project'));
        },
      }
    );
  };

  // Handle creating a new special project (Admin only)
  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !isAdmin) return;

    const slug = newTitle
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const projectData = {
      title: newTitle.trim(),
      slug: slug || `project-${Date.now()}`,
      badge: newBadge.trim() || 'Special Relief Project',
      description: newDescription.trim(),
      order: displayProjects.length,
      photos: [],
      images: [],
      emptySlotsCount: 4,
    };

    createProjectMutation.mutate(projectData, {
      onSuccess: () => {
        setIsModalOpen(false);
        setNewTitle('');
        setNewBadge('Special Relief Project');
        setNewDescription('');
      },
      onError: (err) => {
        alert('Failed to save project to database: ' + (err.message || 'Error creating project'));
      },
    });
  };

  // Handle deleting a special project (Admin only)
  const handleDeleteProject = (proj) => {
    if (!isAdmin) return;

    const idToDelete = proj._id;
    if (!idToDelete) {
      alert('This is a static default project from siteData.js. To remove it permanently, edit siteData.js.');
      return;
    }

    if (window.confirm(`Are you sure you want to delete "${proj.title}"?`)) {
      deleteProjectMutation.mutate(idToDelete, {
        onError: (err) => {
          alert('Failed to delete project: ' + (err.message || 'Error deleting project'));
        },
      });
    }
  };

  return (
    <section className="sec">
      <div className="w">
        {/* Section Heading & Admin Add Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 pb-6 border-b border-[var(--ln)]">
          <div>
            {title && <h2 className="c text-left sm:text-left text-2xl sm:text-3xl font-bold font-serif">{title}</h2>}
            {subtitle && (
              <p className="text-[14px] sm:text-[15px] text-[var(--mu)] leading-relaxed mt-1 max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>

          {isAdmin && (
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-sm shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer self-start sm:self-center shrink-0"
            >
              <span className="text-base leading-none font-black">+</span>
              <span>Add Special Project</span>
            </button>
          )}
        </div>

        {/* List of Special Projects */}
        <div className="flex flex-col gap-8">
          {displayProjects.map((project) => (
            <SpecialProjectCard
              key={project._id || project.slug || project.id || project.title}
              project={project}
              onEditProject={isAdmin ? handleOpenEdit : null}
              onDeleteProject={isAdmin ? handleDeleteProject : null}
            />
          ))}
        </div>
      </div>

      {/* Modal: Add New Special Project (Admin Only) */}
      {isAdmin && isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[var(--card)] border border-[var(--ln)] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl text-[var(--tx)] relative">
            <div className="flex items-center justify-between pb-3 mb-5 border-b border-[var(--ln)]">
              <div>
                <h3 className="text-xl font-bold font-serif text-[var(--tx)]">Add Special Project</h3>
                <p className="text-xs text-[var(--mu)] mt-0.5">Create a new targeted relief initiative card</p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[var(--soft)] text-[var(--mu)] hover:text-[var(--tx)] flex items-center justify-center text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-[var(--tx)]">
                  Project Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Assam Flood Relief, Winter Blanket Drive"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--ln)] bg-[var(--bg)] text-[var(--tx)] text-sm focus:outline-hidden focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-[var(--tx)]">
                  Badge / Tag
                </label>
                <input
                  type="text"
                  value={newBadge}
                  onChange={(e) => setNewBadge(e.target.value)}
                  placeholder="e.g. Special Relief Project, Emergency Aid"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--ln)] bg-[var(--bg)] text-[var(--tx)] text-sm focus:outline-hidden focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-[var(--tx)]">
                  Description
                </label>
                <textarea
                  rows="3"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Standing alongside vulnerable families and communities with essential supplies and support..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--ln)] bg-[var(--bg)] text-[var(--tx)] text-sm focus:outline-hidden focus:border-amber-400 resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[var(--ln)] mt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-semibold rounded-xl border border-[var(--ln)] hover:bg-[var(--soft)] text-[var(--tx)] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createProjectMutation.isPending}
                  className="px-5 py-2 text-sm font-bold rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-900 shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  {createProjectMutation.isPending ? 'Saving...' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Special Project (Admin Only) */}
      {isAdmin && editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[var(--card)] border border-[var(--ln)] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl text-[var(--tx)] relative">
            <div className="flex items-center justify-between pb-3 mb-5 border-b border-[var(--ln)]">
              <div>
                <h3 className="text-xl font-bold font-serif text-[var(--tx)]">Edit Special Project</h3>
                <p className="text-xs text-[var(--mu)] mt-0.5">Update project title, badge, or description</p>
              </div>
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="w-8 h-8 rounded-full bg-[var(--soft)] text-[var(--mu)] hover:text-[var(--tx)] flex items-center justify-center text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-[var(--tx)]">
                  Project Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--ln)] bg-[var(--bg)] text-[var(--tx)] text-sm focus:outline-hidden focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-[var(--tx)]">
                  Badge / Tag
                </label>
                <input
                  type="text"
                  value={editBadge}
                  onChange={(e) => setNewBadge(e.target.value)}
                  placeholder="e.g. Special Relief Project, Emergency Aid"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--ln)] bg-[var(--bg)] text-[var(--tx)] text-sm focus:outline-hidden focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-[var(--tx)]">
                  Description
                </label>
                <textarea
                  rows="3"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--ln)] bg-[var(--bg)] text-[var(--tx)] text-sm focus:outline-hidden focus:border-amber-400 resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[var(--ln)] mt-2">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 text-sm font-semibold rounded-xl border border-[var(--ln)] hover:bg-[var(--soft)] text-[var(--tx)] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateProjectMutation.isPending}
                  className="px-5 py-2 text-sm font-bold rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-900 shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  {updateProjectMutation.isPending ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
