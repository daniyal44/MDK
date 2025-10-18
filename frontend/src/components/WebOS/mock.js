// Mock file system
export const initialFileSystem = {
  name: 'root',
  type: 'folder',
  children: [
    {
      name: 'Documents',
      type: 'folder',
      children: [
        { name: 'welcome.txt', type: 'file', content: 'Welcome to Web OS!\n\nThis is a fully functional operating system in your browser.\nExplore all the features and applications.' },
        { name: 'todo.txt', type: 'file', content: 'Todo List:\n1. Try the code editor\n2. Play the snake game\n3. Create a drawing in Paint\n4. Use the terminal' },
      ],
    },
    {
      name: 'Pictures',
      type: 'folder',
      children: [],
    },
    {
      name: 'Music',
      type: 'folder',
      children: [],
    },
    {
      name: 'Videos',
      type: 'folder',
      children: [],
    },
    {
      name: 'Projects',
      type: 'folder',
      children: [
        {
          name: 'hello.py',
          type: 'file',
          content: 'print("Hello, Web OS!")\n\nfor i in range(5):\n    print(f"Count: {i}")\n\nprint("Done!")'
        },
        {
          name: 'app.js',
          type: 'file',
          content: 'function greet(name) {\n  console.log(`Hello, ${name}!`);\n}\n\ngreet("World");'
        },
      ],
    },
  ],
};

// Mock terminal commands
export const mockTerminalCommands = {
  help: 'Available commands:\n  help - Show this help\n  clear - Clear terminal\n  ls - List files\n  pwd - Print working directory\n  echo [text] - Echo text\n  date - Show current date\n  python [file] - Execute Python file (coming soon)',
  ls: 'Documents\nPictures\nMusic\nVideos\nProjects',
  pwd: '/home/user',
  date: () => new Date().toString(),
};

// Mock settings
export const mockSettings = {
  theme: 'light',
  wallpaper: 'default',
  sound: true,
  notifications: true,
};