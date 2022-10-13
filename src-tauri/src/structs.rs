use std::time::SystemTime;
use serde::ser::{Serialize, Serializer, SerializeStruct};

#[derive(Debug)]
pub struct FileEntry {
    pub name: String,
    pub extension: String,
    pub path: String,
    pub parent_dir: String,
    pub is_dir: bool,
    pub is_file: bool,
    pub is_symlink: bool,
    pub size: u64,
    pub size_pretty: String,
    pub modified: SystemTime,
}

impl Serialize for FileEntry {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        let mut file_entry = serializer.serialize_struct("FileEntry", 9)?;
        file_entry.serialize_field("name", &self.name)?;
        file_entry.serialize_field("extension", &self.extension)?;
        file_entry.serialize_field("path", &self.path)?;
        file_entry.serialize_field("parent_dir", &self.parent_dir)?;
        file_entry.serialize_field("is_dir", &self.is_dir)?;
        file_entry.serialize_field("is_file", &self.is_file)?;
        file_entry.serialize_field("is_symlink", &self.is_symlink)?;
        file_entry.serialize_field("size", &self.size)?;
        file_entry.serialize_field("size_pretty", &self.size_pretty)?;
        file_entry.serialize_field("modified", &self.modified)?;
        file_entry.end()
    }
}
