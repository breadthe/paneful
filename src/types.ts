export enum AlertTypes {
  Error = "error",
  Info = "info",
  Success = "success",
  Warning = "warning",
  Neutral = "neutral",
}

// mirrors Rust's SystemTime
export interface SystemTime {
    secs_since_epoch: number;
    nanos_since_epoch: number;
}

// mirrors the Rust struct
export interface FileEntry {
    name: string;
    path: string;
    extension: string;
    parent_dir: string;
    is_dir: boolean;
    is_file: boolean;
    is_symlink: boolean;
    size: number;
    size_pretty: string;
    modified: SystemTime;
}

export interface DirectoryListing {
    Array: FileEntry[]
}

export enum Panes {
    Left = "left",
    Right = "right",
}

// the currently highlighted file in the active pane
export interface HighlightedFile {
    pane: Panes;
    name: string | null;
    path: string | null;
}

// tracks the highlighted file for each pane
export interface PaneHighlightedFile {
    left: {
        name: string | null;
        path: string | null;
    },
    right: {
        name: string | null;
        path: string | null;
    },
}
