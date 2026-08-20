import React, { useState } from 'react';
import { Maximize2, X } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ProfilePhotoProps {
  className?: string;
  variant?: 'circle' | 'rounded';
}

export const ProfilePhoto: React.FC<ProfilePhotoProps> = ({
  className = '',
  variant = 'circle',
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const fallbackUrl = `${import.meta.env.BASE_URL}assets/profile-photo.jpg`;
  const [imgSrc, setImgSrc] = useState<string>(
    PERSONAL_INFO.avatarUrl || fallbackUrl
  );

  const handleImageError = () => {
    if (imgSrc !== fallbackUrl) {
      setImgSrc(fallbackUrl);
    }
  };

  const shapeClasses =
    variant === 'circle'
      ? 'rounded-full'
      : 'rounded-3xl';

  return (
    <>
      <div className={`relative flex items-center justify-center ${className}`}>
        {/* Soft background ambient gradient glow */}
        <div className="absolute -inset-3 bg-gradient-to-tr from-blue-600/15 via-indigo-500/10 to-sky-400/15 rounded-full blur-2xl opacity-80 pointer-events-none" />
        
        {/* Subtle decorative concentric ring */}
        <div className="absolute -inset-2 rounded-full border border-blue-200/50 pointer-events-none scale-105" />

        {/* Profile Image Frame */}
        <div
          className={`relative group/photo w-56 h-56 sm:w-68 sm:h-68 lg:w-80 lg:h-80 ${shapeClasses} ring-4 ring-white shadow-2xl overflow-hidden bg-slate-100 cursor-pointer transition-transform duration-300 hover:scale-[1.02]`}
          onClick={() => setShowPreviewModal(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setShowPreviewModal(true)}
          title="Click to view full portrait"
        >
          <img
            src={imgSrc}
            alt={PERSONAL_INFO.name}
            className={`w-full h-full object-cover object-center transition-all duration-500 ${
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-90'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={handleImageError}
            referrerPolicy="no-referrer"
            loading="eager"
          />

          {/* Subtle Hover Zoom Overlay */}
          <div className="absolute inset-0 bg-slate-900/25 opacity-0 group-hover/photo:opacity-100 transition-opacity duration-200 flex items-center justify-center text-white">
            <div className="bg-slate-900/75 backdrop-blur-xs px-3.5 py-1.5 rounded-full text-xs font-mono font-medium flex items-center gap-1.5 shadow-lg border border-white/20">
              <Maximize2 className="w-3.5 h-3.5" />
              <span>View Portrait</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {showPreviewModal && (
        <div
          id="profile-photo-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setShowPreviewModal(false)}
        >
          <div
            className="relative max-w-lg w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  {PERSONAL_INFO.name}
                </h4>
                <p className="text-xs text-slate-500 font-mono">
                  {PERSONAL_INFO.title}
                </p>
              </div>
              <button
                id="close-profile-modal-btn"
                onClick={() => setShowPreviewModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Photo In Modal */}
            <div className="flex flex-col items-center">
              <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-2xl overflow-hidden ring-4 ring-slate-100 shadow-lg bg-slate-100 relative mb-4">
                <img
                  src={PERSONAL_INFO.avatarFullUrl || imgSrc}
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover object-center"
                  onError={handleImageError}
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-semibold bg-blue-50 text-blue-700 rounded-full border border-blue-100 mb-2">
                  <span>Chennai, India • NMV University</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end">
              <button
                id="modal-done-btn"
                onClick={() => setShowPreviewModal(false)}
                className="px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-blue-600 rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
