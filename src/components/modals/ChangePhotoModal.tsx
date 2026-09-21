import React, { useState, useRef } from 'react';
import { 
  X, 
  Upload, 
  Camera, 
  Check, 
  RefreshCw, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Trash2,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { UserProfile } from '../../types/landsync';

interface ChangePhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onUpdateAvatar: (newAvatarUrl: string) => void;
}

// Curated collection of high-resolution professional GIS officer & surveyor portraits
const PRESET_AVATARS = [
  {
    id: 'avatar-1',
    label: 'Officer 1 (Default)',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=250&auto=format&fit=crop&q=80',
  },
  {
    id: 'avatar-2',
    label: 'Senior Surveyor Venkat',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=250&auto=format&fit=crop&q=80',
  },
  {
    id: 'avatar-3',
    label: 'GIS Field Lead',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=250&auto=format&fit=crop&q=80',
  },
  {
    id: 'avatar-4',
    label: 'Cartographer Specialist',
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=250&auto=format&fit=crop&q=80',
  },
  {
    id: 'avatar-5',
    label: 'Directorate Officer',
    url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=250&auto=format&fit=crop&q=80',
  },
  {
    id: 'avatar-6',
    label: 'Urban Planning Head',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=250&auto=format&fit=crop&q=80',
  },
  {
    id: 'avatar-7',
    label: 'Chief Land Commissioner',
    url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=250&auto=format&fit=crop&q=80',
  },
  {
    id: 'avatar-8',
    label: 'Remote Sensing Analyst',
    url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=250&auto=format&fit=crop&q=80',
  },
];

export const ChangePhotoModal: React.FC<ChangePhotoModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpdateAvatar,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'preset' | 'url'>('upload');
  const [previewUrl, setPreviewUrl] = useState<string>(user.avatarUrl || PRESET_AVATARS[0].url);
  const [customUrlInput, setCustomUrlInput] = useState<string>('');
  const [urlError, setUrlError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isProcessingFile, setIsProcessingFile] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Process and compress chosen image to a fast, clean Data URL
  const processImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (PNG, JPG, WebP).');
      return;
    }

    setIsProcessingFile(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Resize image to max 400x400 for snappy storage and crisp display
        const canvas = document.createElement('canvas');
        const maxDim = 400;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.88);
          setPreviewUrl(compressedDataUrl);
        } else {
          setPreviewUrl(e.target?.result as string);
        }
        setIsProcessingFile(false);
      };
      img.onerror = () => {
        setIsProcessingFile(false);
        alert('Could not process this image.');
      };
      img.src = e.target?.result as string;
    };

    reader.onerror = () => {
      setIsProcessingFile(false);
      alert('Failed to read image file.');
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleApplyUrl = () => {
    setUrlError(null);
    const trimmed = customUrlInput.trim();
    if (!trimmed) {
      setUrlError('Please enter a valid image web address');
      return;
    }
    if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://') && !trimmed.startsWith('data:image/')) {
      setUrlError('URL must begin with https:// or http://');
      return;
    }
    setPreviewUrl(trimmed);
  };

  const handleSave = () => {
    onUpdateAvatar(previewUrl);
    onClose();
  };

  const handleResetToDefault = () => {
    setPreviewUrl(PRESET_AVATARS[0].url);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl border border-[#E2E8F0] shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center border border-[#DBEAFE]">
              <Camera className="w-5 h-5 text-[#2563EB]" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-[#0F172A] tracking-tight font-heading">
                Change Profile Photo
              </h2>
              <p className="text-xs text-[#64748B]">
                Upload a custom picture or choose an authorized officer portrait
              </p>
            </div>
          </div>
          <button
            id="btn-close-change-photo"
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl text-[#94A3B8] hover:text-[#0F172A] hover:bg-[#E2E8F0]/50 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current & Preview Banner */}
        <div className="p-6 pb-4 flex items-center gap-5 border-b border-[#F1F5F9]">
          <div className="relative shrink-0">
            <img
              src={previewUrl}
              alt="Avatar preview"
              className="w-20 h-20 rounded-full object-cover border-3 border-[#2563EB] shadow-md ring-4 ring-[#EFF6FF]"
              onError={(e) => {
                // Fallback if URL is invalid
                (e.target as HTMLImageElement).src = PRESET_AVATARS[0].url;
              }}
            />
            <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[#16A34A] ring-2 ring-white flex items-center justify-center">
              <Check className="w-3 h-3 text-white stroke-3" />
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[#0F172A] truncate">
                {user.name}
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-[#EFF6FF] text-[#2563EB] rounded-full border border-[#DBEAFE]">
                Active Profile
              </span>
            </div>
            <div className="text-xs text-[#64748B] mt-0.5 truncate">
              {user.role} • {user.department}
            </div>
            <p className="text-[11px] text-[#2563EB] font-medium mt-1">
              Photo will appear across Map inspections, Rover logs &amp; Reports
            </p>
          </div>
        </div>

        {/* Selection Method Tabs */}
        <div className="p-6 pt-4 space-y-4">
          <div className="flex bg-[#F1F5F9] p-1 rounded-2xl border border-[#E2E8F0]">
            <button
              id="tab-photo-upload"
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'upload' 
                  ? 'bg-white text-[#2563EB] shadow-xs' 
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Photo</span>
            </button>

            <button
              id="tab-photo-preset"
              type="button"
              onClick={() => setActiveTab('preset')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'preset' 
                  ? 'bg-white text-[#2563EB] shadow-xs' 
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Officer Gallery</span>
            </button>

            <button
              id="tab-photo-url"
              type="button"
              onClick={() => setActiveTab('url')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'url' 
                  ? 'bg-white text-[#2563EB] shadow-xs' 
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              <LinkIcon className="w-3.5 h-3.5" />
              <span>Web URL</span>
            </button>
          </div>

          {/* TAB 1: Upload from Computer / Mobile Device */}
          {activeTab === 'upload' && (
            <div className="space-y-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                className="hidden"
                onChange={handleFileChange}
              />

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`p-6 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-[#2563EB] bg-[#EFF6FF]'
                    : 'border-[#CBD5E1] bg-[#F8FAFC] hover:bg-[#EFF6FF]/60 hover:border-[#2563EB]'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-[#E2E8F0] flex items-center justify-center mb-2.5 text-[#2563EB]">
                  {isProcessingFile ? (
                    <RefreshCw className="w-6 h-6 animate-spin text-[#2563EB]" />
                  ) : (
                    <Upload className="w-6 h-6 text-[#2563EB]" />
                  )}
                </div>

                <span className="text-xs font-bold text-[#0F172A]">
                  Click to select photo or drag and drop
                </span>
                <span className="text-[11px] text-[#64748B] mt-0.5">
                  PNG, JPG, WebP up to 10MB • Auto-centered &amp; cropped
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-[#64748B] px-1">
                <span>Supports device photos &amp; selfie snapshots</span>
                <button
                  type="button"
                  onClick={handleResetToDefault}
                  className="text-xs text-[#2563EB] hover:underline font-semibold"
                >
                  Reset to default
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: Curated Officer Avatars */}
          {activeTab === 'preset' && (
            <div className="space-y-2">
              <span className="text-xs font-semibold text-[#64748B] block">
                Select an official GIS surveyor portrait:
              </span>

              <div className="grid grid-cols-4 gap-3 max-h-48 overflow-y-auto p-1">
                {PRESET_AVATARS.map((avatar) => {
                  const isSelected = previewUrl === avatar.url;
                  return (
                    <button
                      key={avatar.id}
                      type="button"
                      onClick={() => setPreviewUrl(avatar.url)}
                      className={`relative group rounded-2xl p-1 border-2 transition-all cursor-pointer flex flex-col items-center text-center ${
                        isSelected 
                          ? 'border-[#2563EB] bg-[#EFF6FF] shadow-xs' 
                          : 'border-[#E2E8F0] hover:border-[#93C5FD] bg-white'
                      }`}
                    >
                      <img
                        src={avatar.url}
                        alt={avatar.label}
                        className="w-14 h-14 rounded-xl object-cover"
                      />
                      <span className="text-[9px] font-semibold text-[#0F172A] mt-1 leading-tight line-clamp-1">
                        {avatar.label}
                      </span>
                      {isSelected && (
                        <div className="absolute top-1 right-1 w-4 h-4 bg-[#2563EB] text-white rounded-full flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 stroke-3" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: Custom Web URL */}
          {activeTab === 'url' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#0F172A] mb-1">
                  Image Web Link (URL)
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={customUrlInput}
                    onChange={(e) => {
                      setCustomUrlInput(e.target.value);
                      setUrlError(null);
                    }}
                    placeholder="https://example.com/my-photo.jpg"
                    className="flex-1 px-3.5 py-2.5 text-xs text-[#0F172A] border border-[#E2E8F0] rounded-xl focus:outline-hidden focus:border-[#2563EB] bg-[#F8FAFC]"
                  />
                  <button
                    type="button"
                    onClick={handleApplyUrl}
                    className="px-4 py-2 bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#1D4ED8] font-bold text-xs rounded-xl border border-[#DBEAFE] cursor-pointer"
                  >
                    Preview
                  </button>
                </div>
                {urlError && (
                  <div className="flex items-center gap-1.5 text-xs text-[#DC2626] mt-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{urlError}</span>
                  </div>
                )}
              </div>
              <span className="text-[11px] text-[#64748B] block">
                Paste any direct image link from your agency intranet, LinkedIn, or cloud storage.
              </span>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-6 pt-3 border-t border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-[#E2E8F0] bg-white text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] text-xs font-bold cursor-pointer transition-colors"
          >
            Cancel
          </button>

          <div className="flex items-center gap-2">
            <button
              id="btn-save-profile-photo"
              type="button"
              onClick={handleSave}
              className="px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <Check className="w-4 h-4" />
              <span>Apply Photo</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
