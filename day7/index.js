const rootDirectory = {
  path: '/',
  name: '/',
  size: 0,
  sub: [],
  files: []
};

module.exports = {
  part1(input) {
    const lines = [...input.split('\n'), '$ calcsizes', '$ df -h'];

    let answer = 0;
    let workingDir = '/';
    let isListing = false;
    let list = '';
    for (const line of lines) {
      if (line.startsWith('$')) {
        if (isListing) {
          isListing = false;
          this.handleListResponse(workingDir, list);
          list = '';
        }

        const commandInput = line.replace('$', '').trim();
        const [command, ...arg] = commandInput.split(' ');

        switch (command.trim()) {
          case 'cd':
            if (arg[0].startsWith('/')) {
              workingDir = arg[0];
              if (workingDir === '') {
                workingDir = '/';
              }
            } else if (arg[0] === '..') {
              const components = workingDir.split('/');
              components.pop();
              workingDir = components.join('/');
              if (workingDir === '') {
                workingDir = '/';
              }
            } else {
              workingDir = `${workingDir}/${arg[0]}`.replace('//', '/');
            }

            this.assertWorkingDir(workingDir);
            break;

          case 'ls':
            isListing = true;
            break;

          case 'calcsizes':
            this.calculateSize(rootDirectory);
            break;

          case 'df':
            answer = this.listTotalSpace();
            break;
        }
      }

      if (isListing) {
        list += `${line}\n`;
      }
    }

    return answer;
  },

  part2(input, part1Solution) {
    const lines = [...input.split('\n'), '$ calcsizes', '$ findspace'];

    let answer = 0;
    let workingDir = '/';
    let isListing = false;
    let list = '';
    for (const line of lines) {
      if (line.startsWith('$')) {
        if (isListing) {
          isListing = false;
          this.handleListResponse(workingDir, list);
          list = '';
        }

        const commandInput = line.replace('$', '').trim();
        const [command, ...arg] = commandInput.split(' ');

        switch (command.trim()) {
          case 'cd':
            if (arg[0].startsWith('/')) {
              workingDir = arg[0];
              if (workingDir === '') {
                workingDir = '/';
              }
            } else if (arg[0] === '..') {
              const components = workingDir.split('/');
              components.pop();
              workingDir = components.join('/');
              if (workingDir === '') {
                workingDir = '/';
              }
            } else {
              workingDir = `${workingDir}/${arg[0]}`.replace('//', '/');
            }

            this.assertWorkingDir(workingDir);
            break;

          case 'ls':
            isListing = true;
            break;

          case 'calcsizes':
            this.calculateSize(rootDirectory);
            break;

          case 'df':
            answer = this.listTotalSpace();
            break;

          case 'findspace':
            answer = this.part2helper();
        }
      }

      if (isListing) {
        list += `${line}\n`;
      }
    }

    return answer;
  },

  part2helper() {
    const need = 30000000;
    const totalSize = 70000000;
    const avail = totalSize - rootDirectory.size;
    const delta = need - avail;

    let directories = this.directoriesLargerThan(delta);
    directories = directories.sort((a, b) => {
      return a.size < b.size ? -1 : 1;
    });

    return directories[0].size;
  },

  directoriesLargerThan(size, directory = null) {
    const target = directory || rootDirectory;

    let eligible = [];
    if (target.size >= size) {
      eligible.push(target);
    }

    for (const subDir of target.sub) {
      let subEligible = this.directoriesLargerThan(size, subDir);
      eligible = [...eligible, ...subEligible];
    }

    return eligible;
  },

  listTotalSpace() {
    //this.logDir(rootDirectory);

    console.log(`Filesystem\t\tSize\t\tUsed\t\tAvail`);
    const total = this.listSpace(rootDirectory, false);
    console.log(`\n\nTotal size of red directories: ${total}`);
    return total;
  },

  listSpace(dir, logSubdirectories = true) {
    let sizeString = dir.size.toString();
    if (sizeString.length < 6) {
      sizeString = `${sizeString}\t`;
    }

    let returnValue = 0;
    let decorator = '\x1b[0m';
    if (dir.size < 100000) {
      decorator = '\x1b[41m';
      returnValue = dir.size;
    }

    const totalSize = 70000000;
    const avail = totalSize - dir.size;

    if (dir.path === '/' || logSubdirectories) {
      console.log(`${decorator}${dir.path}\t\t\t${totalSize}\t${sizeString}\t${avail}\x1b[0m`);
    }
    for (const subDir of dir.sub) {
      returnValue += this.listSpace(subDir, logSubdirectories);
    }

    return returnValue;
  },

  calculateSize(dir) {
    let size = dir.size;
    for (const subDir of dir.sub) {
      size += this.calculateSize(subDir);
    }

    dir.size = size;
    return size;
  },

  assertWorkingDir(workingDir) {
    const paths = workingDir.split('/').filter((path) => path.length > 0);

    let directory = '';
    let lastDirectory = null;
    for (const path of paths) {
      directory = `${directory}/${path}`.replace('//', '/');
      const result = this.getDirectory(directory);
      if (!result) {
        if (!lastDirectory) {
          lastDirectory = rootDirectory;
        }

        lastDirectory.sub.push({
          path: directory,
          name: path,
          size: 0,
          files: [],
          sub: []
        });
      } else {
        lastDirectory = result || rootDirectory;
      }
    }
  },

  getDirectory(path, subdirectory = null) {
    const target = subdirectory || rootDirectory;

    if (target.path === path) {
      return target;
    }

    for (const sub of target.sub) {
      const result = this.getDirectory(path, sub);
      if (result) {
        return result;
      }
    }

    return null;
  },

  handleListResponse(workingDir, response) {
    const files = response
      .split('\n')
      .filter((line) => {
        return line.length > 0 && !line.startsWith('$') && !line.startsWith('dir');
      })
      .map((file) => {
        const [size, name] = file.split(' ');
        return {
          size: Number(size),
          name
        };
      });

    const dir = this.getDirectory(workingDir);
    if (dir) {
      dir.files = files;
      dir.size = files.reduce((total, file) => {
        return total + Number(file.size);
      }, 0);
    }
  },

  logDir(directory, depth = 0) {
    if (depth === 0) {
      console.log('!! DIRECTORY STRUCTURE !!');
    }

    let depthSpacer = '';
    for (let i = 0; i < depth; i++) {
      depthSpacer += '-';
    }

    console.log(`${depthSpacer}${directory.name} | (${directory.sub.length} subdirs, ${directory.files.length} files)`);
    for (const file of directory.files) {
      console.log(`${depthSpacer}  | ${file.name} (${file.size})`);
    }
    for (const sub of directory.sub) {
      this.logDir(sub, depth + 1);
    }
  }
};
