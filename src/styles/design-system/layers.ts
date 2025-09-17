/**
 * Layer System (z-index)
 * Consistent layering and stacking contexts
 */

// Z-index scale
export const layers = {
  behind: -1,
  base: 0,
  content: 1,
  raised: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  toast: 1600,
  tooltip: 1700,
  debug: 9999,
} as const;

// Component-specific layers
export const componentLayers = {
  // Navigation
  header: layers.sticky,
  mobileNav: layers.modal,
  navDropdown: layers.dropdown,

  // Overlays
  backdrop: layers.overlay,
  drawer: layers.modal,
  dialog: layers.modal,

  // Feedback
  notification: layers.toast,
  alert: layers.banner,

  // Interactive
  select: layers.dropdown,
  autocomplete: layers.dropdown,
  datepicker: layers.popover,

  // Content
  badge: layers.raised + 5,
  floatingAction: layers.sticky,
  stickyElement: layers.sticky,

  // Development
  devTools: layers.debug,
} as const;

// Stacking context manager
export const stackingContext = {
  create: () => ({
    position: 'relative' as const,
    zIndex: 0,
  }),

  isolate: () => ({
    isolation: 'isolate' as const,
  }),

  fixed: (layer: keyof typeof layers) => ({
    position: 'fixed' as const,
    zIndex: layers[layer],
  }),

  absolute: (layer: keyof typeof layers) => ({
    position: 'absolute' as const,
    zIndex: layers[layer],
  }),

  sticky: (layer: keyof typeof layers = 'sticky') => ({
    position: 'sticky' as const,
    zIndex: layers[layer],
  }),
};

// Helper to manage layering in nested contexts
export const createLayerContext = (baseLayer: number) => {
  return {
    base: baseLayer,
    raised: baseLayer + 1,
    overlay: baseLayer + 2,
    modal: baseLayer + 3,
    top: baseLayer + 4,
  };
};

// Common layer patterns
export const layerPatterns = {
  modalWithBackdrop: {
    backdrop: layers.overlay,
    content: layers.modal,
  },

  dropdownMenu: {
    trigger: layers.raised,
    menu: layers.dropdown,
  },

  tooltip: {
    trigger: layers.base,
    content: layers.tooltip,
  },

  notification: {
    container: layers.toast,
    item: layers.toast + 1,
  },

  floatingActionButton: {
    button: layers.sticky,
    menu: layers.sticky + 1,
  },
};

// Helper function to ensure proper stacking
export const ensureAbove = (element: keyof typeof layers, reference: keyof typeof layers) => {
  const elementZ = layers[element];
  const referenceZ = layers[reference];

  if (elementZ <= referenceZ) {
    console.warn(`Layer "${element}" (${elementZ}) should be above "${reference}" (${referenceZ})`);
    return referenceZ + 1;
  }

  return elementZ;
};

// Helper function to get layer value
export const getLayer = (layer: keyof typeof layers | number): number => {
  if (typeof layer === 'number') return layer;
  return layers[layer];
};

export type Layer = keyof typeof layers;
export type ComponentLayer = keyof typeof componentLayers;