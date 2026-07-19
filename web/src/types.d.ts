interface Window {
  navigate: (path: string) => void;
  swapMainImage: (thumb: HTMLElement) => void;
  tryAdminLogin: () => void;
  adminSave: () => void;
  adminEdit: (id: string) => void;
  adminCancelEdit: () => void;
  adminDelete: (id: string) => void;
  adminReset: () => void;
  adminLogout: () => void;
}
