'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { uploadThumbnailToLocal, getLocalPortfolioImages, getLocalPortfolioFolders, deletePortfolioImage } from './actions';

const VALID_FOLDER_REGEX = /^[a-zA-Z0-9_-]+$/;

/** Extract folder name from path like /assets/portfolio/FolderName/file.png */
function pathToFolder(p: string): string {
  const parts = p.split('/').filter(Boolean);
  return parts[2] ?? ''; // assets, portfolio, folderName, ...
}

type ThumbnailFieldProps = {
  name: string;
  defaultValue?: string;
  label?: string;
  /** Optional folder under assets/portfolio (e.g. project id) to save uploads into */
  folder?: string;
};

export function ThumbnailField({ name, defaultValue = '', label = 'Thumbnail', folder }: ThumbnailFieldProps) {
  const [value, setValue] = useState(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [libraryPaths, setLibraryPaths] = useState<string[]>([]);
  const [libraryLoading, setLibraryLoading] = useState(false);
  const [libraryFolder, setLibraryFolder] = useState<string>('');
  const [viewingPath, setViewingPath] = useState<string | null>(null);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [uploadFolderModalOpen, setUploadFolderModalOpen] = useState(false);
  const [uploadFolders, setUploadFolders] = useState<string[]>([]);
  const [uploadFolderChoice, setUploadFolderChoice] = useState<'existing' | 'new'>('existing');
  const [uploadFolderExisting, setUploadFolderExisting] = useState('');
  const [uploadFolderNew, setUploadFolderNew] = useState('');
  const [uploadFolderError, setUploadFolderError] = useState<string | null>(null);
  const [previewHovered, setPreviewHovered] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const libraryFolders = useMemo(() => {
    const set = new Set(libraryPaths.map(pathToFolder).filter(Boolean));
    return ['', ...Array.from(set).sort()];
  }, [libraryPaths]);

  const filteredLibraryPaths = useMemo(() => {
    if (!libraryFolder) return libraryPaths;
    return libraryPaths.filter((p) => pathToFolder(p) === libraryFolder);
  }, [libraryPaths, libraryFolder]);

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (fileInputRef.current) fileInputRef.current.value = '';
    setUploadError(null);
    setUploadFolderError(null);
    setPendingFile(file);
    setUploadFolderModalOpen(true);
    const { folders: list } = await getLocalPortfolioFolders();
    setUploadFolders(list);
    setUploadFolderExisting(folder && list.includes(folder) ? folder : list[0] ?? 'uploads');
    setUploadFolderNew('');
    setUploadFolderChoice(folder && list.includes(folder) ? 'existing' : 'new');
  }, [folder]);

  const doUploadToFolder = useCallback(
    async (targetFolder: string) => {
      if (!pendingFile) return;
      setUploadFolderError(null);
      setUploading(true);
      const formData = new FormData();
      formData.set('file', pendingFile);
      formData.set('folder', targetFolder);
      const result = await uploadThumbnailToLocal(formData);
      setUploading(false);
      setPendingFile(null);
      setUploadFolderModalOpen(false);
      if (result.error) {
        setUploadError(result.error);
        return;
      }
      if (result.path) setValue(result.path);
    },
    [pendingFile]
  );

  const handleUploadFolderConfirm = useCallback(() => {
    setUploadFolderError(null);
    if (uploadFolderChoice === 'existing') {
      const f = uploadFolderExisting.trim();
      if (!f) {
        setUploadFolderError('Select a folder.');
        return;
      }
      doUploadToFolder(f);
      return;
    }
    const newName = uploadFolderNew.trim();
    if (!newName) {
      setUploadFolderError('Enter a folder name.');
      return;
    }
    if (!VALID_FOLDER_REGEX.test(newName)) {
      setUploadFolderError('Folder name can only contain letters, numbers, underscore and hyphen.');
      return;
    }
    if (uploadFolders.includes(newName)) {
      setUploadFolderError('A folder with this name already exists.');
      return;
    }
    doUploadToFolder(newName);
  }, [uploadFolderChoice, uploadFolderExisting, uploadFolderNew, uploadFolders, doUploadToFolder]);

  const openLibrary = useCallback(async () => {
    setLibraryOpen(true);
    setLibraryLoading(true);
    setLibraryPaths([]);
    setLibraryFolder('');
    const { paths } = await getLocalPortfolioImages();
    setLibraryPaths(paths);
    setLibraryLoading(false);
  }, []);

  const pickFromLibrary = useCallback((path: string) => {
    setValue(path);
    setViewingPath(null);
    setLibraryOpen(false);
  }, []);

  const handleDeletePreview = useCallback(async () => {
    if (!value) return;
    setDeleteConfirmOpen(false);
    setDeleteError(null);
    if (!value.startsWith('/assets/portfolio/')) {
      setValue('');
      return;
    }
    setDeleting(true);
    const result = await deletePortfolioImage(value);
    setDeleting(false);
    if (result.error) {
      setDeleteError(result.error);
      return;
    }
    setValue('');
  }, [value]);

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input type="hidden" id={name} name={name} value={value} readOnly />
      <div className="flex flex-wrap items-start gap-3">
        <div
          className={`flex-shrink-0 w-24 h-24 rounded border overflow-hidden relative ${value ? 'border-gray-200 bg-gray-50' : 'border-gray-200 border-dashed bg-gray-100'}`}
          onMouseEnter={() => value && setPreviewHovered(true)}
          onMouseLeave={() => { setPreviewHovered(false); setDeleteError(null); }}
        >
          {value ? (
            <>
              <img src={value} alt="Thumbnail preview" className="w-full h-full object-cover pointer-events-none" />
              {previewHovered ? (
                <div className="absolute inset-0 z-10 bg-black/50 flex items-center justify-center gap-1">
                  <button
                    type="button"
                    onClick={() => setViewingPath(value)}
                    title="View"
                    className="p-1.5 rounded bg-white text-gray-800 hover:bg-gray-100 shadow"
                  >
                    <i className="bi bi-eye" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteConfirmOpen(true)}
                    disabled={deleting}
                    title="Delete"
                    className="p-1.5 rounded bg-red-600 text-white hover:bg-red-700 shadow disabled:opacity-50"
                  >
                    {deleting ? <span className="animate-pulse">…</span> : <i className="bi bi-trash" aria-hidden />}
                  </button>
                </div>
              ) : null}
            </>
          ) : (
            <span className="absolute inset-0 flex items-center justify-center text-gray-400" aria-hidden>
              <i className="bi bi-image" />
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-2 items-center">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
              onChange={handleFileSelect}
              disabled={uploading}
              className="hidden"
              id={`${name}-file`}
            />
            <label
              htmlFor={`${name}-file`}
              className="px-3 py-1.5 text-sm font-medium rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 cursor-pointer inline-block disabled:opacity-50"
            >
              {uploading ? 'Uploading…' : 'Upload (save to /assets/portfolio/)'}
            </label>
            <button
              type="button"
              onClick={openLibrary}
              className="px-3 py-1.5 text-sm font-medium rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            >
              Choose from library
            </button>
          </div>
          {uploadError ? <p className="text-sm text-red-600">{uploadError}</p> : null}
          {deleteError ? <p className="text-sm text-red-600">{deleteError}</p> : null}
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Or paste image URL/path"
            className="w-full max-w-md border border-gray-300 rounded px-2 py-1.5 text-sm"
          />
        </div>
      </div>

      {uploadFolderModalOpen && pendingFile ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => { setUploadFolderModalOpen(false); setPendingFile(null); setUploadFolderError(null); }}>
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-medium text-gray-800 mb-2">Upload to folder</h3>
            <p className="text-sm text-gray-600 mb-3 truncate" title={pendingFile.name}>
              File: {pendingFile.name}
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="folder-existing"
                  checked={uploadFolderChoice === 'existing'}
                  onChange={() => setUploadFolderChoice('existing')}
                  className="rounded"
                />
                <label htmlFor="folder-existing" className="text-sm">Existing folder</label>
              </div>
              {uploadFolderChoice === 'existing' ? (
                <select
                  value={uploadFolderExisting}
                  onChange={(e) => setUploadFolderExisting(e.target.value)}
                  className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm bg-white"
                >
                  {(uploadFolders.length ? uploadFolders : ['uploads']).map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              ) : null}
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="folder-new"
                  checked={uploadFolderChoice === 'new'}
                  onChange={() => setUploadFolderChoice('new')}
                  className="rounded"
                />
                <label htmlFor="folder-new" className="text-sm">Create new folder</label>
              </div>
              {uploadFolderChoice === 'new' ? (
                <input
                  type="text"
                  value={uploadFolderNew}
                  onChange={(e) => { setUploadFolderNew(e.target.value); setUploadFolderError(null); }}
                  placeholder="Folder name (letters, numbers, _ -)"
                  className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
                />
              ) : null}
              {uploadFolderError ? <p className="text-sm text-red-600">{uploadFolderError}</p> : null}
            </div>
            <div className="flex gap-2 mt-4 justify-end">
              <button
                type="button"
                onClick={() => { setUploadFolderModalOpen(false); setPendingFile(null); setUploadFolderError(null); }}
                className="px-3 py-1.5 text-sm font-medium rounded border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUploadFolderConfirm}
                disabled={uploading}
                className="px-3 py-1.5 text-sm font-medium rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {uploading ? 'Uploading…' : 'Upload'}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {libraryOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setLibraryOpen(false)}>
          <div
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3 border-b flex justify-between items-center gap-3">
              <span className="font-medium">Choose from library</span>
              <div className="flex items-center gap-2">
                <select
                  value={libraryFolder}
                  onChange={(e) => setLibraryFolder(e.target.value)}
                  disabled={libraryLoading || libraryPaths.length === 0}
                  className="text-sm border border-gray-300 rounded px-2 py-1.5 bg-white text-gray-700 disabled:opacity-50"
                >
                  <option value="">All folders</option>
                  {libraryFolders.filter(Boolean).map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
                <button type="button" onClick={() => setLibraryOpen(false)} className="text-gray-500 hover:text-gray-700 p-1" title="Close">
                  ✕
                </button>
              </div>
            </div>
            <div className="p-3 overflow-auto flex-1">
              {libraryLoading ? (
                <p className="text-sm text-gray-500">Loading…</p>
              ) : filteredLibraryPaths.length === 0 ? (
                <p className="text-sm text-gray-500">
                  {libraryPaths.length === 0 ? 'No images in /assets/portfolio/' : `No images in folder "${libraryFolder || 'All folders'}"`}
                </p>
              ) : (
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                  {filteredLibraryPaths.map((p) => (
                    <div
                      key={p}
                      className="aspect-square rounded border border-gray-200 overflow-hidden relative"
                      onMouseEnter={() => setHoveredPath(p)}
                      onMouseLeave={() => setHoveredPath(null)}
                    >
                      <img src={p} alt="" className="w-full h-full object-cover pointer-events-none" />
                      {hoveredPath === p ? (
                        <div className="absolute inset-0 z-10 bg-black/50 flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => setViewingPath(p)}
                            title="View"
                            className="p-1.5 rounded bg-white text-gray-800 hover:bg-gray-100 shadow"
                          >
                            <i className="bi bi-eye" aria-hidden />
                          </button>
                          <button
                            type="button"
                            onClick={() => pickFromLibrary(p)}
                            title="Pick"
                            className="p-1.5 rounded bg-blue-600 text-white hover:bg-blue-700 shadow"
                          >
                            <i className="bi bi-check-lg" aria-hidden />
                          </button>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {viewingPath ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4"
          onClick={() => setViewingPath(null)}
        >
          <div className="relative max-w-[90vw] max-h-[90vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img src={viewingPath} alt="" className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded shadow-2xl" />
            <div className="flex gap-2 mt-3">
              <button
                type="button"
                onClick={() => setViewingPath(null)}
                className="px-4 py-2 text-sm font-medium rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => pickFromLibrary(viewingPath)}
                className="px-4 py-2 text-sm font-medium rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Pick this image
              </button>
            </div>
            <button
              type="button"
              onClick={() => setViewingPath(null)}
              className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center hover:bg-gray-700 text-lg leading-none"
              title="Close"
            >
              ✕
            </button>
          </div>
        </div>
      ) : null}

      {deleteConfirmOpen ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50" onClick={() => setDeleteConfirmOpen(false)}>
          <div className="bg-white rounded-lg shadow-xl p-4 max-w-xs w-full" onClick={(e) => e.stopPropagation()}>
            <p className="text-gray-800 mb-4">Are you sure to delete?</p>
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setDeleteConfirmOpen(false)}
                className="px-3 py-1.5 text-sm font-medium rounded border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                No
              </button>
              <button
                type="button"
                onClick={handleDeletePreview}
                disabled={deleting}
                className="px-3 py-1.5 text-sm font-medium rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
