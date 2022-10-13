#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::{env, fs::{self, FileType}, fs::Metadata, path::Path, process::{Command, Stdio}, time::SystemTime};
use tauri::{Manager, Menu, MenuItem, Submenu};

mod structs;
use structs::FileEntry;

fn main() {
    // here `"quit".to_string()` defines the menu item id, and the second parameter is the menu item label.

    let about_menu = Submenu::new(
        "App",
        Menu::new()
            .add_native_item(MenuItem::Hide)
            .add_native_item(MenuItem::HideOthers)
            .add_native_item(MenuItem::ShowAll)
            .add_native_item(MenuItem::Separator)
            .add_native_item(MenuItem::Quit),
    );

    let edit_menu = Submenu::new(
        "Edit",
        Menu::new()
            .add_native_item(MenuItem::Undo)
            .add_native_item(MenuItem::Redo)
            .add_native_item(MenuItem::Separator)
            .add_native_item(MenuItem::Cut)
            .add_native_item(MenuItem::Copy)
            .add_native_item(MenuItem::Paste)
            .add_native_item(MenuItem::SelectAll),
    );

    let view_menu = Submenu::new(
        "View",
        Menu::new().add_native_item(MenuItem::EnterFullScreen),
    );

    let window_menu = Submenu::new(
        "Window",
        Menu::new()
          .add_native_item(MenuItem::Minimize)
            .add_native_item(MenuItem::Zoom),
    );

    let menu = Menu::new()
        .add_submenu(about_menu)
        .add_submenu(edit_menu)
        .add_submenu(view_menu)
        .add_submenu(window_menu);

    tauri::Builder::default()
        // This is where you pass in your commands
        .invoke_handler(tauri::generate_handler![
            close_splashscreen,
            get_home_dir,
            get_files_in_dir
        ])
        .menu(menu)
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}


// This command must be async so that it doesn't run on the main thread.
#[tauri::command]
async fn close_splashscreen(window: tauri::Window) {
    // Close splashscreen
    if let Some(splashscreen) = window.get_window("splashscreen") {
        splashscreen.close().unwrap();
    }
    // Show main window
    window.get_window("main").unwrap().show().unwrap();
}

// gets /Users/<my-username>
#[tauri::command]
async fn get_home_dir() -> String {
    std::env::var("HOME").unwrap()
}

// returns a list of files in a directory in JSON format
#[tauri::command]
async fn get_files_in_dir(dir_path: String) -> String {
    let mut files: Vec<FileEntry> = Vec::new();

    for entry in fs::read_dir(dir_path).unwrap() {
        let entry = entry.unwrap();
        let path = entry.path();

        let file_name: String = path.file_name().unwrap_or_default().to_str().unwrap().to_string();
        let extension: String = path.extension().unwrap_or_default().to_str().unwrap_or_default().to_string();
        let parent_dir: String = path.parent().unwrap().to_str().unwrap().to_string();

        let metadata: Metadata = fs::metadata(&path).unwrap();

        // get the modified date
        let modified: SystemTime = metadata.modified().unwrap();

        // get the created date
        let _created: SystemTime = metadata.created().unwrap();

        let _file_type: FileType = metadata.file_type();

        files.push(
            FileEntry {
                name: file_name,
                extension,
                path: path.to_str().unwrap().to_string(),
                parent_dir,
                is_dir: metadata.is_dir(),
                is_file: metadata.is_file(),
                is_symlink: metadata.is_symlink(),
                size: metadata.len(),
                modified,
            }
        );
    }

    // sort the files by the modified date
    // files.sort_by(|a, b| a.metadata.1.cmp(&b.1));

    serde_json::to_string(&files).unwrap()
}
