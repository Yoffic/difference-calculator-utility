export default (files) => (
  files
    .sort((file1, file2) => {
      if (file1 > file2) return -1;
      if (file1 < file2) return 1;
      return 0;
    })
    .sort((file1, file2) => {
      if (getExt(file1) > getExt(file2)) return 1;
      if (getExt(file1) < getExt(file2)) return -1;
      return 0;
    })
);
